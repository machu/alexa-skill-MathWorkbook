/* global describe, it, context */
const assert = require('power-assert');
const Question = require('../lib/question');

describe ('Question', () => {
    describe('#createQuestion()', () => {
        context('when level1', () => {
            it('繰り上がりがないこと', () => {
                for (let i = 0; i < 100; i++) {
                    const q = Question.createQuestion();
                    assert(q.answer <= 10);
                }
            });
        });
    });
});
