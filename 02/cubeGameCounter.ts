export function cubeGameCounter(gameData: string, cubeCount: { red: number; green: number; blue: number }) : Number {
    let sum : number = 0;
    const games = gameData.split("\n");

    function checkColor(draw: string, validGame: boolean, color: string) {
        let regex = new RegExp("(\\d+) +"+color)
        let matches = draw.match(regex)
        if (matches) {
            if (Number(matches[1]) > cubeCount[color]) {
                validGame = false
            }
        }
        return validGame;
    }

    function checkDraws(draw: string, validGame: boolean) {
        validGame = checkColor(draw, validGame, "red");
        validGame = checkColor(draw, validGame, "blue");
        validGame = checkColor(draw, validGame, "green");
        return validGame;
    }

    games.forEach(game => {

        console.log(game)
        let matches = game.match(/^Game (\d+):(.*)/)
        if (matches) {
            let validGame = true;
            let draws = matches[2].split(";");
            draws.forEach(draw => {
                validGame = checkDraws(draw, validGame);
            })
            if (validGame) {
                sum += Number(matches[1])
            }
        }
    })
    return sum;
}