/* eslint indent:off */
const conversation = require('alexa-conversation');
const app = require('../index.js');

const opts = {
    name: 'Test Conversation',
    appId: 'amzn1.ask.skill.b3e2f344-00a1-4693-a153-71a2f2c39f1a',
    app: app,
    locale: 'ja-JP'
};

opts.name = "アレクサ、計算ドリルを開いて";
conversation(opts)
    .userSays('LaunchRequest')
        .plainResponse
        .shouldContain('計算の種類を、足し算、引き算、掛け算、割り算から選んでください')
    .userSays('SelectLevelIntent', {OPERATER: '足し算', LEVEL: undefined})
        .plainResponse
        .shouldContain('足し算のレベル1を始めます')
        .shouldContain('たす、')
    .userSays('AnswerIntent', {Answer: 2})
        .plainResponse
        .shouldMatch(/(正解)|(惜しい)/)
        .shouldMatch(/\d+たす、\d+は？/)
    .userSays('AMAZON.StartOverIntent')
        .plainResponse
        .shouldContain('計算の種類を、足し算、引き算、掛け算、割り算から選んでください')
    .end();

opts.name = "アレクサ、計算ドリルで足し算のレベル2を開いて";
conversation(opts)
    .userSays('SelectLevelIntent', {OPERATER: '足し算', LEVEL: 2})
        .plainResponse
        .shouldContain('足し算のレベル2を始めます')
        .shouldMatch(/\d+たす、\d+は？/)
    .end();

opts.name = "アレクサ、計算ドリルで引き算を開いて";
conversation(opts)
    .userSays('SelectLevelIntent', {OPERATER: '引き算'})
        .plainResponse
        .shouldContain('引き算のレベル1を始めます')
        .shouldMatch(/\d+ひく、\d+は？/)
    .end();

opts.name = "アレクサ、計算ドリルで掛け算のレベル3を開いて";
conversation(opts)
    .userSays('SelectLevelIntent', {OPERATER: '掛け算', LEVEL: 3})
        .plainResponse
        .shouldContain('掛け算のレベル3を始めます')
        .shouldMatch(/\d+掛ける、\d+は？/)
    .end();

opts.name = "アレクサ、計算ドリルで掛け算のレベル6を開いて";
conversation(opts)
    .userSays('SelectLevelIntent', {OPERATER: '掛け算', LEVEL: 6})
        .plainResponse
        .shouldContain('レベルは1から5までで選んでください')
        .shouldContain('計算の種類を、足し算、引き算、掛け算、割り算から選んでください')
    .end();

opts.name = "アレクサ、計算ドリルの使い方を教えて";
conversation(opts)
    .userSays('AMAZON.HelpIntent')
        .plainResponse
        .shouldContain('私が出す10問の問題に答えてください')
    .end();
