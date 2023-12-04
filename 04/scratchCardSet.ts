export class ScratchCardSet {
    private cards: string[];

    constructor(scratchcardData: string) {
        this.cards = scratchcardData.split("\n");
    }

    points(): number {
        let points = 0
        this.cards.forEach(card => {
            points += this.getPointsForCard(card)
        })
        return points
    }

    private getPointsForCard(card: string): number {
        let winningNumbers: number[]
        let playedNumbers: number[]
        {
            let x = card.split(":")
            let [win, nums] = x[1].split("|")
            winningNumbers = win.split(" ").flatMap(this.numberfilter)
            playedNumbers = nums.split(" ").flatMap(this.numberfilter)
        }
        console.log(winningNumbers, playedNumbers)

        let winCount = 0
        playedNumbers.forEach(num => {
            if (winningNumbers.indexOf(num) > 0) {
                console.log(num)
                winCount++;
            }
        })
        console.log("wincount", winCount)
        return winCount ? 2 ** (winCount - 1) : 0
    }

    private numberfilter(item) {
        return Number(item)
    }
}