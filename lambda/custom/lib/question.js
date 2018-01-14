exports.createQuestion = (level = 1, operation = "addition") => {
    const question = levels[operation][level]();
    const operater_table = {
        "addition": "たす",
        "subtraction": "ひく",
        "multiplication": "掛ける",
        "division": "割る"
    };
    // 1たす、2は？
    question.speech = `${question.x}${operater_table[operation]}、${question.y}は？`;
    return question;
};

exports.getLevelFromSlots = (slots) => {
    const operation_table = {
        "足し算": "addition",
        "引き算": "subtraction",
        "掛け算": "multiplication",
        "割り算": "division"
    };
    const level = (!slots["LEVEL"] || isNaN(slots["LEVEL"].value))
        ? 1
        : Number(slots["LEVEL"].value);
    return {
        operation: operation_table[slots["OPERATER"].value],
        level: level,
        count: 0,
        correct: 0
    };
};

const levels = {
    "addition": {
        // レベル1 … 1桁の足し算（繰り上がりなし）
        "1": () => {
            const r = {};
            while (!(r.answer <= 10)) {
                r.x = createRandomNumber(1, 9);
                r.y = createRandomNumber(1, 9);
                r.answer = r.x + r.y;
            }
            return r;
        },
        // レベル2 … 1桁の足し算（繰り上がりあり）
        "2": () => {
            const r = {};
            while (!(r.answer > 10)) {
                r.x = createRandomNumber(1, 9);
                r.y = createRandomNumber(1, 9);
                r.answer = r.x + r.y;
            }
            return r;
        },
        // レベル3 … 2桁の足し算（答えが30以下）
        "3": () => {
            const r = {};
            while (!(r.answer < 30)) {
                r.x = createRandomNumber(10, 20);
                r.y = createRandomNumber(10, 20);
                r.answer = r.x + r.y;
            }
            return r;
        },
        // レベル4 … 2桁の足し算（答えが50以下）
        "4": () => {
            const r = {};
            while (!(r.answer < 50)) {
                r.x = createRandomNumber(10, 40);
                r.y = createRandomNumber(10, 40);
                r.answer = r.x + r.y;
            }
            return r;
        },
        // レベル5 … 2桁の足し算
        "5": () => {
            const r = {};
            r.x = createRandomNumber(10, 99);
            r.y = createRandomNumber(10, 99);
            r.answer = r.x + r.y;
            return r;
        }
    },
    "subtraction": {
        // レベル1 … 1桁の引き算（繰り下がりなし）
        "1": () => {
            const r = {};
            nums = [createRandomNumber(1, 10), createRandomNumber(1, 10)];
            r.x = Math.max(...nums);
            r.y = Math.min(...nums);
            r.answer = r.x - r.y;
            return r;
        },
        // レベル2 … 2桁 - 1桁
        "2": () => {
            const r = {};
            r.x = createRandomNumber(10, 19);
            r.y = createRandomNumber(1, 9);
            r.answer = r.x - r.y;
            return r;
        },
        // レベル3 … 2桁 - 2桁（x < 30）
        "3": () => {
            const r = {};
            nums = [createRandomNumber(11, 29), createRandomNumber(11, 29)];
            r.x = Math.max(...nums);
            r.y = Math.min(...nums);
            r.answer = r.x - r.y;
            return r;
        },
        // レベル4 … 2桁 - 2桁（x < 50）
        "4": () => {
            const r = {};
            nums = [createRandomNumber(11, 49), createRandomNumber(11, 49)];
            r.x = Math.max(...nums);
            r.y = Math.min(...nums);
            r.answer = r.x - r.y;
            return r;
        },
        // レベル5 … 3桁 - 2桁
        "5": () => {
            const r = {};
            r.x = createRandomNumber(100, 199);
            r.y = createRandomNumber(11, 99);
            r.answer = r.x - r.y;
            return r;
        }
    },
    "multiplication": {
        // レベル1 … 1の段, 2の段, 5の段
        "1": () => {
            const r = {};
            r.x = [1,2,5][createRandomNumber(0, 2)];
            r.y = createRandomNumber(1, 9);
            r.answer = r.x * r.y;
            return r;
        },
        // レベル2 … 1の段から5の段まで
        "2": () => {
            const r = {};
            r.x = createRandomNumber(1, 5);
            r.y = createRandomNumber(1, 9);
            r.answer = r.x * r.y;
            return r;
        },
        // レベル3 … 6の段, 7の段
        "3": () => {
            const r = {};
            r.x = [6,7][createRandomNumber(0, 1)];
            r.y = createRandomNumber(1, 9);
            r.answer = r.x * r.y;
            return r;
        },
        // レベル4 … 8の段, 9の段
        "4": () => {
            const r = {};
            r.x = [8,9][createRandomNumber(0, 1)];
            r.y = createRandomNumber(1, 9);
            r.answer = r.x * r.y;
            return r;
        },
        // レベル5 … すべての九九
        "5": () => {
            const r = {};
            r.x = createRandomNumber(1, 9);
            r.y = createRandomNumber(1, 9);
            r.answer = r.x * r.y;
            return r;
        }
    },
    "division": {
        "1": () => {
        },
        "2": () => {
        },
        "3": () => {
        },
        "4": () => {
        },
        "5": () => {
        }
    }
};






const createRandomNumber = (min = 0, max = 100) => {
    return Math.floor(Math.random() * (max + 1 - min) + min);
};
