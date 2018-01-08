'use strict';

const Alexa = require("alexa-sdk");
const APP_ID = "amzn1.ask.skill.b3e2f344-00a1-4693-a153-71a2f2c39f1a";
const STATES = {
    WORK: '_WORKMODE', // Asking trivia questions.
    START: '_STARTMODE', // Entry point, start the game.
};

const Question = require("./lib/question");

exports.handler = function(event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(newSessionHandlers, startStateHandlers, workStateHandlers);
    alexa.execute();
};

const newSessionHandlers = {
    'LaunchRequest': function () {
        this.handler.state = STATES.START;
        this.emitWithState('StartWork');
    },
    'AnswerIntent': function () {
        this.handler.state = STATES.START;
        this.emitWithState('StartWork');
    },
    'AMAZON.StartOverIntent': function () {
        this.handler.state = STATES.START;
        this.emitWithState('StartWork');
    },
    'AMAZON.HelpIntent' : function () {
        this.response.speak("計算問題を10問だします");
        this.emit(':responseReady');
    },
    'Unhandled' : function () {
        this.response.speak("はじめ、と言うと問題を始めます");
    }
};

const startStateHandlers = Alexa.CreateStateHandler(STATES.START, {
    'StartWork': function () {
        // TODO: 初期化処理をここに書く
        const question = Question.createQuestion();
        this.attributes['question'] = question;
        this.handler.state = STATES.WORK;
        this.emit(':ask', question.speech);
    },
});

const workStateHandlers = Alexa.CreateStateHandler(STATES.WORK, {
    'AnswerIntent': function () {
        const question = this.attributes['question'];
        const answer = parseInt(this.event.request.intent.slots.Answer.value, 10);
        if (isNaN(answer)) {
            this.emit(':ask', 'すみません、聞き取れませんでした。' + question.speech);
        }
        const speechOutput = (answer == question.answer)
            ? "正解。"
            : "惜しい！";
        const newQuestion = Question.createQuestion();
        const repromptText = newQuestion.speech;
        this.attributes['question'] = newQuestion;
        this.response
            .speak(speechOutput + repromptText)
            .listen(repromptText);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'またね');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'またね');
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', 'またね');
    },
    'Unhandled' : function () {
        this.emit(':ask', '聞き取れませんでした。もう一度、答えを言ってください');
    }
});
