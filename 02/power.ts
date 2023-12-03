export function power(gameData: string): number {
    const games = gameData.split("\n");
    let sum = 0;
    games.forEach(game => {
        let minDiceCount = { red: 0, green: 0, blue: 0 }
        let matches = game.match(/^Game (\d+):(.*)/)
        if (matches) {
            let validGame = true;
            let draws = matches[2].split(";");
            draws.forEach(draw => {
                minDiceCount = {
                    red: Math.max(minDice(draw, "red"), minDiceCount.red),
                    green: Math.max(minDice(draw, "green"), minDiceCount.green),
                    blue: Math.max(minDice(draw, "blue"), minDiceCount.blue)
                }
            })
        }
        sum = sum + minDiceCount.red * minDiceCount.green * minDiceCount.blue
    })
    return sum;
}

function minDice(draw: string, color: string) {
    let minDiceCount = 0;
    let regex = new RegExp("(\\d+) +"+color)
    let matches = draw.match(regex)
    if (matches) {
        minDiceCount = Math.max(minDiceCount, Number(matches[1]))
    }
    return minDiceCount;
}