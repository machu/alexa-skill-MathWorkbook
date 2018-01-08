exports.createQuestion = function () {
    const min = 0;
    const max = 9;
    const x = Math.floor(Math.random() * (max - min) + min);
    const y = Math.floor(Math.random() * (max - min) + min);
    // const speech = `<emphasis level="strong">${x}</emphasis>たす、<emphasis level="strong">${y}</emphasis>は？`;
    const speech = `${x}たす、${y}は？`;
    const answer = x + y;
    const question = {
        "min": min,
        "max": max,
        "speech": speech,
        "answer": answer
    };
    return question;
};
