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
        }, 40)
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
                                <td>{this.game.money}₺</td>
                            </tr>
                            <tr>
                                <td>Halkın Talebi</td>
                                <td>%{this.game.money}</td>
                            </tr>
                            </tbody>
                        </table>

                        <h3>Üretim</h3>
                        <table>
                            <tbody>
                            <tr>
                                <td>Maden / Sn</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>Kazma</td>
                                <td className="flexible">{this.game.material} adet
                                    <button
                                        disabled={!this.game.canBuyMaden()}
                                        onClick={this.game.buyMaden}>Al</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Maden Fiyatı</td>
                                <td>{this.game.money}₺</td>
                            </tr>
                            <tr>
                                <td>Halkın Talebi</td>
                                <td>%{this.game.money}</td>
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
