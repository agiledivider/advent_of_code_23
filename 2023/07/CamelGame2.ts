let cardMap: { [key: string]: number } = {
    "A": 14,
    "K": 13,
    "Q": 12,
    "T": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
    "J": 1,
};


function compareStrongerFirstCard(a: string, b: string): number {
    for (let i = 0; i < 5; i++) {
        if (cardMap[a[i]] > cardMap[b[i]]) {
            return 1
        }
        if (cardMap[a[i]] < cardMap[b[i]]) {
            return -1
        }
    }
    return 0
}

function cardCount(input: string) {
    let map: Map<string, number> = new Map<string, number>()

    for (let i = 0; i < input.length; i++) {
        if (map.has(input[i])) {
            // @ts-ignore
            map.set(input[i], map.get(input[i]) + 1)
        } else {
            map.set(input[i], 1)
        }
    }

    let joker = 0
    if (map.has("J")) {
        joker = map.get("J")
        map.delete("J")
        if (joker == 5) {
            return [5]
        }
    }
    let cardCount = Array.from(map.values()).sort().reverse()
    cardCount[0] = cardCount[0] + joker
    return cardCount
}

function isTwoPairs(input: string) {
    let count = cardCount(input);
    return count.indexOf(2) > -1 && count.length == 3
}

function isPair(input: string) {
    let count = cardCount(input);
    return count.indexOf(2) > -1 && count.length == 4
}

function isHighCard(input: string) {
    let count = cardCount(input);
    return count.length == 5
}


function isThreeOfAKind(a: string) {
    let count = cardCount(a);
    return count.indexOf(3) > -1
}

function isFourOfAKind(a: string) {
    let count = cardCount(a);
    return count.indexOf(4) > -1
}
function isFiveOfAKind(a: string) {
    let count = cardCount(a);
    return count.indexOf(5) > -1
}

function isFullHouse(input: string) {
    let count = cardCount(input);
    return count.indexOf(2) > -1 && count.indexOf(3) > -1
}

function has(a: string, b: string, hasFunction: (a: string) => Boolean) {
    let result = undefined
    let hasA = hasFunction(a)
    let hasB = hasFunction(b)
    if (hasA && !hasB) {
        result = 1
    } else if (!hasA && hasB) {
        result = -1
    } else if (hasA && hasB) {
        result = compareStrongerFirstCard(a, b)
    }
    return result;
}



export function sort(hands: string[]) {
    hands = hands.sort((a, b) => {
        let result
        let x = [
            isFiveOfAKind,
            isFourOfAKind,
            isFullHouse,
            isThreeOfAKind,
            isTwoPairs,
            isPair,
            isHighCard
        ]
        for (const hasFn of x) {
            result = has(a, b, hasFn);
            if (result !== undefined) {
                return result
            }
        }
        return result
    })
    return hands;
}


export class CamelGame2 {
    private hands: Map<string, number> = new Map<string, number>();

    constructor(gameData: string) {
        let lines = gameData.split("\n")
        lines.forEach(line => {
            let [hand, bet] = line.split(" ")
            if (this.hands.has(hand)) {
                console.log("Duplicate hand: " + hand, bet)
            }
            this.hands.set(hand, Number(bet))
        })

    }

    value() {
        let hands = sort(Array.from(this.hands.keys()))
        let sum: number = 0
        hands.forEach((hand, index) => {
            let multiplier = index + 1
            let bet = this.hands.get(hand) || 0
            sum += (multiplier * bet)
        });
        return sum;
    }
}