/* global describe, it, context */
const assert = require('power-assert');
const Question = require('../lib/question');

describe ('Question', () => {
    describe('#createQuestion()', () => {
        context('addition', () => {
            context('when level1', () => {
                it('繰り上がりがないこと', () => {
                    for (let i = 0; i < 100; i++) {
                        const q = Question.createQuestion(1);
                        assert(q.answer <= 10);
                    }
                });
            });
            context('when level2', () => {
                it('1桁の足し算（繰り上がりあり）', () => {
                    for (let i = 0; i < 100; i++) {
                        const q = Question.createQuestion(2);
                        assert(q.x < 10);
                        assert(q.y < 10);
                        assert(q.answer > 10);
                        assert(q.answer < 20);
                    }
                });
            });
            context('when level3', () => {
                it('2桁の足し算（答えが30以下）', () => {
                    for (let i = 0; i < 100; i++) {
                        const q = Question.createQuestion(3);
                        assert(q.x >= 10);
                        assert(q.y >= 10);
                        assert(q.answer <= 30);
                    }
                });
            });
            context('when level4', () => {
                it('2桁の足し算（答えが50以下）', () => {
                    for (let i = 0; i < 100; i++) {
                        const q = Question.createQuestion(4);
                        assert(q.x >= 10);
                        assert(q.y >= 10);
                        assert(q.answer <= 50);
                    }
                });
            });
            context('when level5', () => {
                it('2桁の足し算（制限なし）', () => {
                    for (let i = 0; i < 100; i++) {
                        const q = Question.createQuestion(5);
                        assert(q.x >= 10);
                        assert(q.x < 100);
                        assert(q.y >= 10);
                        assert(q.y < 100);
                    }
                });
            });
        });
        context('subtraction', () => {
            context('when level1', () => {
                it('繰り下がりがないこと', () => {
                    for (let i = 0; i < 100; i++) {
                        const q = Question.createQuestion(1, "subtraction");
                        assert(q.x <= 10);
                        assert(q.y <= 10);
                        assert(q.answer >= 0);
                        assert(q.answer < 10);
                    }
                });
            });
            context('when level2', () => {
                it('2桁と1桁の引き算であること(x < 20)', () => {
                    for (let i = 0; i < 100; i++) {
                        const q = Question.createQuestion(2, "subtraction");
                        assert(q.x >= 10);
                        assert(q.x < 20);
                        assert(q.y < 10);
                        assert(q.answer >= 0);
                    }
                });
            });
            context('when level3', () => {
                it('2桁同士の引き算であること（x < 30）', () => {
                    for (let i = 0; i < 100; i++) {
                        const q = Question.createQuestion(3, "subtraction");
                        assert(q.x > 10);
                        assert(q.x < 30);
                        assert(q.y > 10);
                        assert(q.y < 30);
                        assert(q.answer >= 0);
                    }
                });
            });
            context('when level4', () => {
                it('2桁同士の引き算であること（x < 50）', () => {
                    for (let i = 0; i < 100; i++) {
                        const q = Question.createQuestion(4, "subtraction");
                        assert(q.x > 10);
                        assert(q.x < 50);
                        assert(q.y > 10);
                        assert(q.y < 50);
                        assert(q.answer >= 0);
                        console.log(q);
                    }
                });
            });
            context('when level5', () => {
                it('3桁と2桁の引き算であること（x > 200）', () => {
                    for (let i = 0; i < 100; i++) {
                        const q = Question.createQuestion(5, "subtraction");
                        assert(q.x >= 100);
                        assert(q.x < 200);
                        assert(q.y > 10);
                        assert(q.y < 100);
                        assert(q.answer >= 0);
                        console.log(q);
                    }
                });
            });
        });
        context('multiplication', () => {
        });
        context('division', () => {
        });
    });
});
