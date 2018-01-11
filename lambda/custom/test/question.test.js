/* global describe, it, context */
const assert = require('power-assert');
const Question = require('../lib/question');

describe ('Question', () => {
    describe('#createQuestion()', () => {
        context('when level1', () => {
            it('繰り上がりがないこと', () => {
                for (let i = 0; i < 100; i++) {
                    const q = Question.createQuestion(1);
                    assert(q.answer <= 10);
                }
            });
        });
        context('when level2', () => {
            it('xが10未満であること', () => {
                for (let i = 0; i < 100; i++) {
                    const q = Question.createQuestion(2);
                    assert(q.x < 10);
                }
            });
            it('yが10未満であること', () => {
                for (let i = 0; i < 100; i++) {
                    const q = Question.createQuestion(2);
                    assert(q.y < 10);
                }
            });
            it('繰り上がりの足し算であること', () => {
                for (let i = 0; i < 100; i++) {
                    const q = Question.createQuestion(2);
                    assert(q.answer >= 10);
                    assert(q.answer < 20);
                }
            });
        });
        context('when level3', () => {
            it('xが10以上であること', () => {
                for (let i = 0; i < 100; i++) {
                    const q = Question.createQuestion(3);
                    assert(q.x >= 10);
                }
            });
            it('yが10以上であること', () => {
                for (let i = 0; i < 100; i++) {
                    const q = Question.createQuestion(3);
                    assert(q.y >= 10);
                }
            });
            it('答えが30以下であること', () => {
                for (let i = 0; i < 100; i++) {
                    const q = Question.createQuestion(3);
                    assert(q.answer <= 30);
                }
            });
        });
        context('when level4', () => {
            it('xが10以上であること', () => {
                for (let i = 0; i < 100; i++) {
                    const q = Question.createQuestion(4);
                    assert(q.x >= 10);
                }
            });
            it('yが10以上であること', () => {
                for (let i = 0; i < 100; i++) {
                    const q = Question.createQuestion(4);
                    assert(q.y >= 10);
                }
            });
            it('答えが50以下であること', () => {
                for (let i = 0; i < 100; i++) {
                    const q = Question.createQuestion(4);
                    assert(q.answer <= 50);
                }
            });
        });
        context('when level5', () => {
            it('xが10以上100未満であること', () => {
                for (let i = 0; i < 100; i++) {
                    const q = Question.createQuestion(5);
                    assert(q.x >= 10);
                    assert(q.x < 100);
                }
            });
            it('yが10以上100未満であること', () => {
                for (let i = 0; i < 100; i++) {
                    const q = Question.createQuestion(5);
                    assert(q.y >= 10);
                    assert(q.y < 100);
                }
            });
        });
    });
});
