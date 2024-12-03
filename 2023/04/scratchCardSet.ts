export class ScratchCardSet {
    private cards: string[];

    constructor(scratchcardData: string) {
        this.cards = scratchcardData.split("\n");
    }

    points(): number {
        let points = 0
        this.cards.forEach(card => {
            let winCount = this.getPointsForCard(card)
            points += winCount ? 2 ** (winCount - 1) : 0
        })
        return points
    }

    crazyWinningCardCount() : number {
        let instances = new Array(this.cards.length).fill(1);
        this.cards.forEach((card, index) => {
            let winCount = this.getPointsForCard(card)
            for (let i = 1; i <= winCount; i++) {
                if (instances[index+i]) { instances[index+i] += instances[index] }
            }
        })
        return instances.reduce((sum, current) =>  sum + current , 0)
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

        let winCount = 0
        playedNumbers.forEach(num => {
            if (winningNumbers.indexOf(num) > 0) {
                winCount++;
            }
        })
        return winCount;
    }

    private numberfilter(item) {
        return Number(item)
    }
}