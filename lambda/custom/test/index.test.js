/* eslint indent:off */
const conversation = require('alexa-conversation');
const app = require('../index.js');

const opts = {
    name: 'Test Conversation',
    appId: 'amzn1.ask.skill.b3e2f344-00a1-4693-a153-71a2f2c39f1a',
    app: app
};

// initialize the conversation
conversation(opts)
    .userSays('LaunchRequest') // trigger the first Intent
        .plainResponse // this gives you access to the non-ssml response
        .shouldContain('たす')
    .end(); // this will actually run the conversation defined above
