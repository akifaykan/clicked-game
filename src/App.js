import React from "react"
import Game from "./Game"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.game = new Game()
    }

    componentDidMount() {
        setInterval(()=>{
            this.game.update()
            this.setState({})
        }, 100)
    }

    update = () => {
        this.game.update()
    }

    render () {
        return (
            <>
                <header>
                    <h1>Maden Ocağı</h1>
                </header>
                <main>
                    <div className="action">
                        <div>Maden : {this.game.manufacturedMaden}</div>
                        <button
                            disabled={!this.game.canMiningMaden()}
                            onClick={() => this.game.miningMaden()}>Maden Kaz</button>
                    </div>

                    <div className="business">
                        <h3>İşletme</h3>
                        <table>
                            <tbody>
                            <tr>
                                <td>Kasadaki Para</td>
                                <td>{this.game.money}₺</td>
                            </tr>
                            <tr>
                                <td>Depodaki Maden</td>
                                <td>{this.game.currentMaden}</td>
                            </tr>
                            <tr>
                                <td>Maden Fiyatı</td>
                                <td className="flexible">
                                    <div>{this.game.madenPrice}₺</div>
                                    <div>
                                        <button
                                            disabled={!this.game.canDecreasePrice()}
                                            onClick={this.game.decreasePrice}>-</button>
                                        <button
                                            style={{marginLeft:10}}
                                            onClick={this.game.increasePrice}>+</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Halkın Talebi</td>
                                <td>%{this.game.demandRate}</td>
                            </tr>
                            </tbody>
                        </table>

                        <h3>Üretim</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Maden / Sn</td>
                                    <td>{this.game.lastManufacturedRate}</td>
                                </tr>
                                <tr>
                                    <td>Kazma</td>
                                    <td className="flexible">
                                        <div>{this.game.material} adet</div>
                                        <div style={{textAlign:"right"}}>
                                            <p>({this.game.materialUnitPrice}₺ / {this.game.buyMadenPrice} adet)</p>
                                            <button
                                                disabled={!this.game.canBuyMaterial()}
                                                onClick={this.game.buyMaterial}>Al</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Satın alımcı</td>
                                    <td className="flexible">
                                        <div>{this.game.hasAutoBuyer ? "Aktif" : "Pasif"}</div>
                                        {this.game.unlockBuyAutoBuyer() && !this.game.hasAutoBuyer && (
                                            <div>
                                                <button
                                                    disabled={!this.game.canBuyAutoBuyer()}
                                                    onClick={this.game.buyAutoBuyer}>
                                                    Al ({this.game.autoBuyerCost}₺)
                                                </button>
                                            </div>
                                        )}
                                        {this.game.hasAutoBuyer && (
                                            <div style={{display:"flex", alignItems: "center"}}>
                                                <p style={{marginBottom:0, marginRight:10}}>Limit:</p>
                                                <input
                                                    type="number"
                                                    value={this.game.autoBuyerLimit}
                                                    onChange={this.game.autoBuyerInputPriceChange}
                                                />
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>Çalışanlar</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Seviye</th>
                                    <th>Çalışan sayısı</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Çırak</td>
                                    <td className="flexible">
                                        <div>{this.game.autoGenerators.errand}</div>
                                        <div>
                                            <button
                                                disabled={!this.game.canBuyAutoGenerator('ERRAND')}
                                                onClick={() => this.game.buyAutoGenerator('ERRAND')}>
                                                Al ({this.game.autoGenerators.errandCost}₺)
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Kalfa</td>
                                    <td className="flexible">
                                        <div>{this.game.autoGenerators.journey}</div>
                                        <div>
                                            <button
                                                disabled={!this.game.canBuyAutoGenerator('JOURNEY')}
                                                onClick={() => this.game.buyAutoGenerator('JOURNEY')}>
                                                Al ({this.game.autoGenerators.journeyCost}₺)
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Usta</td>
                                    <td className="flexible">
                                        <div>{this.game.autoGenerators.master}</div>
                                        <div>
                                            <button
                                                disabled={!this.game.canBuyAutoGenerator('MASTER')}
                                                onClick={() => this.game.buyAutoGenerator('MASTER')}>
                                                Al ({this.game.autoGenerators.masterCost}₺)
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </>
        )
    }
}

export default App
