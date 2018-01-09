exports.createQuestion = function (level = 1) {
    const question = levels[level]();
    question.speech = `${question.x}たす、${question.y}は？`;
    return question;
};

const levels = {};

// レベル1 … 1桁の足し算（繰り上がりなし）
levels[1] = function () {
    const r = {};
    r.x = createRandomNumber(1, 9);
    r.y = createRandomNumber(1, 10 - r.x);
    r.answer = r.x + r.y;
    return r;
};

// レベル2 … 1桁の足し算（繰り上がりあり）
levels[2] = function () {
    const r = {};
    r.x = createRandomNumber(1, 9);
    r.y = createRandomNumber(1, 9);
    r.answer = r.x + r.y;
    return r;
};

// レベル3 … 2桁の足し算（答えが30以下）
levels[3] = function () {
    const r = {};
    r.x = createRandomNumber(1, 30);
    r.answer = createRandomNumber(r.x, 30);
    r.y = r.answer - r.x;
    return r;
};

function createRandomNumber (min = 0, max = 100) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}
