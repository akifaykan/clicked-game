class Game {
    money = 0
    currentMaden = 0
    soldMaden = 0
    material = 1000
    materialUnit = 100
    materialUnitPrice = 10

    miningMaden = () => {
        this.currentMaden++
        this.material -= this.materialUnit
    }

    update = () => {

    }

    canBuyMaden = () => {
        return this.money >= this.materialUnitPrice
    }

    canMiningMaden = () => {
        return this.material >= this.materialUnit
    }

    buyMaden = () => {
        this.material += 1000
        this.money -= this.materialUnitPrice
    }
}

export default Game
