class Game {
    money = 0
    madenPrice = 40
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
        errandCost: 300,
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
        if ( Date.now() - this.autoGeneratorsLastGeneratedAt > 1500 ){
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
            this.canBuyMaterial() &&
            this.materialUnitPrice <= this.autoBuyerLimit
        ){
            this.buyMaterial()
        }

        // Update material cost
        if ( Date.now() - this.materialLastUpdated > 5000 ){
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
        if (this.currentMaden > 0 && Math.random() * 500 < this.demandRate){
            this.purchaseMaden()
        }
    }

    updateDemand = () => {
        let rate

        if ( this.madenPrice <= 29 ){
            rate = (2 / Math.sqrt(this.madenPrice)) * 140
        } else {
            const maxRate = (2 / Math.sqrt(30)) * 100

            rate = (maxRate * (40 - this.madenPrice)) / 30
        }

        this.demandRate = Math.floor(Math.max(0, rate))

        //const rate = 100 - (this.madenPrice / 40) * 100
        //this.demandRate = Math.floor(Math.min( Math.max(0, rate), 100 ))
    }

    purchaseMaden = () => {
        this.currentMaden -= 1
        this.money += this.madenPrice
    }

    canMiningMaden = (count = 1) => {
        return this.material >= this.materialUnit * count
    }

    canBuyMaterial = () => {
        return this.money >= this.materialUnitPrice
    }

    buyMaterial = () => {
        if (!this.canBuyMaterial()){
            return
        }

        this.materialUnitPrice += Math.floor(Math.random() * 3 + 3)
        this.materialLastUpdated = Date.now()

        this.material += this.buyMadenPrice
        this.money -= this.materialUnitPrice
    }

    increasePrice = () => {
        this.madenPrice += 1
    }

    decreasePrice = () => {
        if (this.madenPrice === 1){
            return
        }

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
        if (!this.canBuyAutoGenerator(type)){
            return
        }

        switch (type) {
            case "ERRAND" :
                this.autoGenerators.errand++
                this.money -= this.autoGenerators.errandCost
                this.autoGenerators.errandCost += Math.floor(
                    (this.autoGenerators.errandCost / 100) * 70 // %50
                )
                return
            case "JOURNEY" :
                this.autoGenerators.journey++
                this.money -= this.autoGenerators.journeyCost
                this.autoGenerators.journeyCost += Math.floor(
                    (this.autoGenerators.journeyCost / 100) * 70
                )
                return
            case "MASTER" :
                this.autoGenerators.master++
                this.money -= this.autoGenerators.masterCost
                this.autoGenerators.masterCost += Math.floor(
                    (this.autoGenerators.masterCost / 100) * 70
                )
                return
            default:
                return false
        }
    }

    unlockBuyAutoBuyer = () => {
        return this.manufacturedMaden >= 1000
    }

    canBuyAutoBuyer = () => {
        return this.unlockBuyAutoBuyer() && this.money >= this.autoBuyerCost
    }

    buyAutoBuyer = () => {
        if (!this.canBuyAutoBuyer()){
            return
        }

        this.money -= this.autoBuyerCost
        this.hasAutoBuyer = true
    }

    autoBuyerInputPriceChange = e => {
        this.autoBuyerLimit = e.target.value
    }
}

export default Game
