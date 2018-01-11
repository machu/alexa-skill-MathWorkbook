exports.createQuestion = (level = 1) => {
    const question = levels[level]();
    question.speech = `${question.x}たす、${question.y}は？`;
    return question;
};

const levels = {};

// レベル1 … 1桁の足し算（繰り上がりなし）
levels[1] = () => {
    const r = {};
    r.x = createRandomNumber(1, 9);
    r.y = createRandomNumber(1, 10 - r.x);
    r.answer = r.x + r.y;
    return r;
};

// レベル2 … 1桁の足し算（繰り上がりあり）
levels[2] = () => {
    const r = {};
    r.x = createRandomNumber(1, 9);
    r.y = createRandomNumber(10 - r.x, 9);
    r.answer = r.x + r.y;
    return r;
};

// レベル3 … 2桁の足し算（答えが30以下）
levels[3] = () => {
    const r = {};
    r.x = createRandomNumber(10, 20);
    r.y = createRandomNumber(10, 30 - r.x);
    r.answer = r.x + r.y;
    return r;
};

// レベル4 … 2桁の足し算（答えが50以下）
levels[4] = () => {
    const r = {};
    r.x = createRandomNumber(10, 40);
    r.y = createRandomNumber(10, 50 - r.x);
    r.answer = r.x + r.y;
    return r;
};

// レベル5 … 2桁の足し算
levels[5] = () => {
    const r = {};
    r.x = createRandomNumber(10, 99);
    r.y = createRandomNumber(10, 99);
    r.answer = r.x + r.y;
    return r;
};

const createRandomNumber = (min = 0, max = 100) => {
    return Math.floor(Math.random() * (max + 1 - min) + min);
};
