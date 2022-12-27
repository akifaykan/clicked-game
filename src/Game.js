class Game {
    money = 0
    madenPrice = 15
    currentMaden = 0
    material = 1000
    materialUnit = 100
    materialUnitPrice = 60
    soldMaden = 0
    demandRate = 0
    buyMadenPrice = 500

    miningMaden = () => {
        this.currentMaden++
        this.material -= this.materialUnit
    }

    update = () => {
        this.updateDemand()
        if (this.currentMaden > 0 && Math.random() * 500 < this.demandRate){
            this.purchaseMaden()
        }
    }

    updateDemand = () => {
        const rate = 100 - (this.madenPrice / 30) * 100
        this.demandRate = Math.floor(Math.min( Math.max(0, rate), 100 ))
    }

    purchaseMaden = () => {
        this.currentMaden -= 1
        this.money += this.madenPrice
    }

    canBuyMaden = () => {
        return this.money >= this.materialUnitPrice
    }

    canMiningMaden = () => {
        return this.material >= this.materialUnit
    }

    buyMaden = () => {
        this.material += this.buyMadenPrice
        this.money -= this.materialUnitPrice
    }

    increasePrice = () => {
        this.madenPrice += 1
    }
    decreasePrice = () => {
        this.madenPrice -= 1
    }

    canDecreasePrice = () => {
        return this.madenPrice > 1
    }
}

export default Game
