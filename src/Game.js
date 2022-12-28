class Game {
    money = 0
    madenPrice = 25
    currentMaden = 0
    buyMadenPrice = 400

    // Demand rate
    demandRate = 0

    // Manufacture rate
    manufacturedMaden = 0
    lastManufacturedCount = 0
    lastManufacturedRate = 0
    lastManufacturedTime = Date.now()

    // Price of the meterial
    material = 1000
    materialUnit = 100
    materialUnitPrice = 60
    materialLastUpdated = Date.now()

    // Auto Generators
    autoGeneratorsLastGeneratedAt = Date.now()
    autoGenerators = {
        errand: 0,
        errandCost: 100,
        errandManufactureRate: 1,
        journey: 0,
        journeyCost: 1000,
        journeyManufactureRate: 4,
        master: 0,
        masterCost: 2000,
        masterManufactureRate: 8,
    }

    // Auto buyer
    hasAutoBuyer = false
    autoBuyerCost = 1000
    autoBuyerLimit = 60

    miningMaden = (count = 1) => {
        if ( this.canMiningMaden(count) ){
            this.currentMaden += count
            this.manufacturedMaden += count
            this.material -= this.materialUnit * count
        }
    }

    update = () => {
        // Auto Generators new goods
        if ( Date.now() - this.autoGeneratorsLastGeneratedAt > 1000 ){
            this.miningMaden(
                this.autoGenerators.errand * this.autoGenerators.errandManufactureRate
            )
            this.miningMaden(
                this.autoGenerators.journey * this.autoGenerators.journeyManufactureRate
            )
            this.miningMaden(
                this.autoGenerators.master * this.autoGenerators.masterManufactureRate
            )
            this.autoGeneratorsLastGeneratedAt = Date.now()
        }

        // Auto buyer
        if ( this.hasAutoBuyer &&
            //this.material < 1000 &&
            this.canBuyMaden() &&
            this.materialUnitPrice <= this.autoBuyerLimit
        ){
            this.buyMaden()
        }

        // Update material cost
        if ( Date.now() - this.materialLastUpdated > 10000 ){
            this.materialUnitPrice = Math.floor(Math.random() * 20 + 60) // 60 -> 80
            this.materialLastUpdated = Date.now()
        }

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
        if (this.currentMaden > 0 && Math.random() * 300 < this.demandRate){
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

    canMiningMaden = (count = 1) => {
        return this.material >= this.materialUnit * count
    }

    buyMaden = () => {
        this.materialUnitPrice += Math.floor(Math.random() * 3 + 3)
        this.materialLastUpdated = Date.now()

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

    canBuyAutoGenerator = type => {
        switch (type) {
            case "ERRAND" :
                return this.money >= this.autoGenerators.errandCost
            case "JOURNEY" :
                return this.money >= this.autoGenerators.journeyCost
            case "MASTER" :
                return this.money >= this.autoGenerators.masterCost
            default:
                return false
        }
    }

    buyAutoGenerator = type => {
        switch (type) {
            case "ERRAND" :
                this.autoGenerators.errand++
                this.money -= this.autoGenerators.errandCost
                this.autoGenerators.errandCost += Math.floor(
                    (this.autoGenerators.errandCost / 100) * 50 // %50
                )
                return
            case "JOURNEY" :
                this.autoGenerators.journey++
                this.money -= this.autoGenerators.journeyCost
                this.autoGenerators.journeyCost += Math.floor(
                    (this.autoGenerators.journeyCost / 100) * 50
                )
                return
            case "MASTER" :
                this.autoGenerators.master++
                this.money -= this.autoGenerators.masterCost
                this.autoGenerators.masterCost += Math.floor(
                    (this.autoGenerators.masterCost / 100) * 50
                )
                return
            default:
                return false
        }
    }

    canBuyAutoBuyer = () => {
        return this.manufacturedMaden >= 1000
    }

    buyAutoBuyer = () => {
        this.money -= this.autoBuyerCost
        this.hasAutoBuyer = true
    }

    autoBuyerInputPriceChange = e => {
        this.autoBuyerLimit = e.target.value
    }
}

export default Game
