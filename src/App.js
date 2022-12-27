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
                        <div>Maden : {this.game.currentMaden}</div>
                        <button
                            disabled={!this.game.canMiningMaden()}
                            onClick={this.game.miningMaden}>Maden Kaz</button>
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
                                            onClick={this.game.increasePrice}>+</button>
                                        <button
                                            style={{marginLeft:10}}
                                            disabled={!this.game.canDecreasePrice()}
                                            onClick={this.game.decreasePrice}>-</button>
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
                                    <div>
                                        <button
                                            disabled={!this.game.canBuyMaden()}
                                            onClick={this.game.buyMaden}>Al</button>
                                        <p>({this.game.materialUnitPrice}₺ / {this.game.buyMadenPrice} adet)</p>
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
