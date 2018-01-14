/* global console */
'use strict';

const Alexa = require("alexa-sdk");
const APP_ID = "amzn1.ask.skill.b3e2f344-00a1-4693-a153-71a2f2c39f1a";
const STATES = {
    WORK: '_WORKMODE',
    SELECT: '_SELECTMODE',
};
const MAX_WORKS = 10;

const Question = require("./lib/question");

const languageString = {
    'ja-JP': {
        'translation': {
            'OPERATIONS': {
                'addition': '足し算',
                'subtraction': '引き算',
                'multiplication': '掛け算',
                'division': '割り算'
            }
        }
    }
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(newSessionHandlers, selectStateHandlers, workStateHandlers);
    alexa.resources = languageString;
    alexa.execute();
};

const newSessionHandlers = {
    // 特定のUtteanceに該当しなかった場合 -> AskWorkLevelへ
    // アレクサ、計算ドリルを開いて
    'LaunchRequest': function () {
        console.log('LaunchRequest');
        console.log("THIS.EVENT = " + JSON.stringify(this.event));
        this.handler.state = STATES.SELECT;
        this.emitWithState('AskWorkLevel');
    },
    // アレクサ、計算ドリルで足し算のレベル2をはじめて
    'SelectLevelIntent': function () {
        console.log('SelectLevelIntent');
        console.log("THIS.EVENT = " + JSON.stringify(this.event));
        this.handler.state = STATES.SELECT;
        this.emitWithState('SelectLevelIntent');
    },
    // それ以外のIntentに該当した場合 -> LaunchRequestへ飛ばす
    'Unhandled' : function () {
        console.log('Unhandled');
        this.emit('LaunchRequest');
    }
};

const selectStateHandlers = Alexa.CreateStateHandler(STATES.SELECT, {
    'AskWorkLevel': function () {
        const speechOutput = "私が出す10問の問題に答えてください。まず、";
        const repromptText = "計算の種類を足し算、引き算、掛け算、割り算から選んでください。足し算のレベル2、のようにレベルも選べます。";
        this.emit(':ask', speechOutput + repromptText, repromptText);
    },
    // 足し算のレベル2
    'SelectLevelIntent': function () {
        console.log('SelectLevelIntent');
        console.log("THIS.EVENT = " + JSON.stringify(this.event));
        const level = Question.getLevelFromSlots(this.event.request.intent.slots);
        if (!level["operation"]) {
            this.emit('Unhandled');
        }
        // 初期化処理
        this.attributes['level'] = level;
        this.handler.state = STATES.WORK;
        const speechOutput = `${this.t('OPERATIONS')[level.operation]}のレベル${level.level}を始めます。`;

        // 問題を出す
        const question = Question.createQuestion(level.level, level.operation);
        const repromptText = question.speech;
        this.attributes['question'] = question;
        this.emit(':ask', speechOutput + repromptText, repromptText);
    },
    'Unhandled': function () {
        const speechOutput = "すみません、聞き取れませんでした。";
        const repromptText = "計算の種類を、足し算、引き算、掛け算、割り算から選んでください。足し算のレベル2、のようにレベルも選べます。";
        this.emit(':ask', speechOutput + repromptText, repromptText);
    }
});

const workStateHandlers = Alexa.CreateStateHandler(STATES.WORK, {
    'AnswerIntent': function () {
        console.log("THIS.EVENT = " + JSON.stringify(this.event));
        const question = this.attributes['question'];
        const level = this.attributes['level'];
        const answer = Number(this.event.request.intent.slots.Answer.value);
        if (isNaN(answer)) {
            this.emit(':ask', 'すみません、聞き取れませんでした。' + question.speech);
        }
        let speechOutput;
        if (answer == question.answer) {
            speechOutput = "正解。";
            level.correct++;
        } else {
            speechOutput = "惜しい。";
        }
        level.count++;
        if (level.count > MAX_WORKS) {
            this.emit(':tell', `10問中${level.correct}回、正解しました`);
        } else {
            // 次の問題を出す
            const newQuestion = Question.createQuestion(level.level);
            const repromptText = newQuestion.speech;
            this.attributes['question'] = newQuestion;
            this.emit(':ask', speechOutput + repromptText, repromptText);
        }
    },
    // 最初からやり直して
    'AMAZON.StartOverIntent': function () {
        console.log("AMAZON.StartOverIntent");
        console.log("THIS.EVENT = " + JSON.stringify(this.event));
        this.handler.state = STATES.SELECT;
        this.emitWithState("AskWorkLevel");
    },
    'AMAZON.StopIntent': function () {
        console.log("THIS.EVENT = " + JSON.stringify(this.event));
        this.emit(':tell', 'またね');
    },
    'AMAZON.CancelIntent': function () {
        console.log("THIS.EVENT = " + JSON.stringify(this.event));
        this.emit(':tell', 'またね');
    },
    'SessionEndedRequest': function () {
        console.log("THIS.EVENT = " + JSON.stringify(this.event));
        this.emit(':tell', 'またね');
    },
    'Unhandled' : function () {
        console.log("THIS.EVENT = " + JSON.stringify(this.event));
        this.emit(':ask', '聞き取れませんでした。もう一度、答えを言ってください');
    }
});
