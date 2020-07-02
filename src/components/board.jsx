import React from 'react';
import Square from './square'

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            player: 1,
        };
    }
     // znalezc indeks
    moveAvailable() {
        const squares = this.state.squares.slice();
        return squares.find((x) => x === null) !== undefined;
    }

    handleClick(i) {
        if (!this.moveAvailable()) {
            alert('Game is finished!');
        } else {
            if (this.state.player === 1) {
                const squares = this.state.squares.slice();
                squares[i] = 'X';
                this.setState({ squares: squares });
            } else if (this.state.player === 0) {
                const squares = this.state.squares.slice();
                squares[i] = 'O';
                this.setState({ squares: squares });
            }
            const p = this.state.player;
            this.setState({ player: 1 - p });
        }
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }
    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;

