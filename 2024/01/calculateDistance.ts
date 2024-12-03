

export function calculateDistance(textBlob: string) : number {
    const [left, right] = splitLinesIntoArrays(textBlob);

    let distance = 0;
    for (let i = 0; i < left.length; i++) {
        distance += Math.abs(left[i] - right[i]);
    }
    return distance;
}

function splitLinesIntoArrays(textBlob: string) {
    let left: number[] = [];
    let right: number[] = [];

    const textLines = textBlob.split("\n");
    textLines.forEach((line: string) => {
        const [leftValue, rightValue] = line.split(/ +/);
        left.push(parseInt(leftValue));
        right.push(parseInt(rightValue));
    })

    left = left.sort((n1,n2) => n1 - n2);
    right = right.sort((n1,n2) => n1 - n2);


    return[left, right];
}