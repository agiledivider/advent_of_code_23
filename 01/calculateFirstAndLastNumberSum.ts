const MAXLENGTH = Number.MAX_SAFE_INTEGER

export function calculateFirstAndLastNumberSum(textBlob: string) {
    let sum = 0

    const textLines = splitLines(textBlob);
    sum = calculateSumOverAllLines(textLines, sum);
    return sum;
}

let digitMap = new Map<string, number>([
    ["one", 1],
    ["two", 2],
    ["three", 3],
    ["four", 4],
    ["five", 5],
    ["six", 6],
    ["seven", 7],
    ["eight", 8],
    ["nine", 9],
    ["1", 1],
    ["2", 2],
    ["3", 3],
    ["4", 4],
    ["5", 5],
    ["6", 6],
    ["7", 7],
    ["8", 8],
    ["9", 9],
])


function splitLines(textBlob: string) {
    return textBlob.split("\n");
}

function calculateSumOverAllLines(textLines: string[], sum: number) {
    textLines.forEach((line: string) => {
        sum += lineValue(line);
    })
    return sum;
}

function lineValue(line: string) {
    return firstDigit(line) * 10 + lastDigit(line);
}

function lastDigit(line: string) {
    let position = -1;
    let lastValue = 0;
    for (let [key, value] of digitMap.entries()) {
        let currentPosition = line.lastIndexOf(key);
        if (currentPosition > position) {
            position = currentPosition;
            lastValue = value
        }
    }
    return lastValue;
}

function firstDigit(line: string) {
    let bestPosition = MAXLENGTH;
    let digitValue = 0;
    for (let [key, value] of digitMap.entries()) {
        let currentPosition = line.indexOf(key);
        if (currentPosition != -1 && currentPosition < bestPosition) {
            bestPosition = currentPosition;
            digitValue = value
        }
    }
    return digitValue;
}