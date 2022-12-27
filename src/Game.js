class Game {
    money = 0
    madenPrice = 15
    currentMaden = 0
    material = 1000
    materialUnit = 100
    materialUnitPrice = 50
    soldMaden = 0
    demandRate = 0
    buyMadenPrice = 500

    manufacturedMaden = 0
    lastManufacturedCount = 0
    lastManufacturedRate = 0
    lastManufacturedTime = Date.now()

    miningMaden = () => {
        this.currentMaden++
        this.manufacturedMaden++
        this.material -= this.materialUnit
    }

    update = () => {
        // Update manufactured rate
        if ( Date.now() - this.lastManufacturedTime > 5000){
            this.lastManufacturedTime = Date.now()
            this.lastManufacturedRate = Math.floor(
                (this.manufacturedMaden - this.lastManufacturedCount) / 5
            )
            this.lastManufacturedCount = this.manufacturedMaden
        }

        // Update demand
        this.updateDemand()

        // Consumers purchase Madens
        if (this.currentMaden > 0 && Math.random() * 400 < this.demandRate){
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
