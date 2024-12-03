function isReportSafe(line: string):boolean {
    let numbers = line.split(/ +/).map(n => parseInt(n));
    let lastNumber;
    let lastDirection = 0;
    for (const number of numbers) {
        if (!lastNumber) {
            lastNumber = number;
            continue;
        }
        //console.log(lastNumber, number, lastDirection);
        let difference = lastNumber - number;
        if (Math.abs(difference) > 3 || difference === 0) {
            return false;
        }
        if (lastDirection === 0) {
            lastDirection = difference;
        } else {
            if ((lastDirection * difference) < 0) {
                return false;
            }
        }
        lastNumber = number;
    }
    return true;
}

export function calculateReportSafetyCount(data: string) : number {
    let lines = data.split("\n");
    let safeReportCount = 0;
    for (const line of lines) {
        if (isReportSafe(line)) {
            safeReportCount++;
        };
    }
    return safeReportCount;
}

function isDampenedReportSafe(line: string) {
    let numbers = line.split(/ +/).map(n => parseInt(n));
    console.log(numbers);
    for (let i = 0; i < numbers.length; i++) {
        let newNumbers = [...numbers]
        newNumbers.splice(i, 1);
        let dampened : string = newNumbers.map(n => n.toString()).join(" ");
        if (isReportSafe(dampened)) {
            console.log(dampened)
            return true;
        }
    }
    return false;
}

export function calculateDampenedReportSafetyCount(data: string) : number{
    let lines = data.split("\n");
    let safeReportCount = 0;
    for (const line of lines) {
        if (isReportSafe(line)) {
            safeReportCount++;
        } else if (isDampenedReportSafe(line)) {
            safeReportCount++;
        };
    }
    return safeReportCount;

}