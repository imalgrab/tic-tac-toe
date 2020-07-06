import React from 'react';
import Board from './board'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                latestMoved: null,
            }],
            player: 1,
            stepNumber: 0,
            isAscending: true,
        };
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            player: (step % 2) === 0,
        });
    }
    handleSortToggle() {
        const isAscending = this.state.isAscending;
        this.setState({
            isAscending: !isAscending,
        });
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const player = this.state.player;
        if (findWinner(squares).winner || squares[i]) {
            return;
        }
        squares[i] = player ? 'X' : 'O';
        this.setState({
            history: history.concat([{ squares: squares, latestMoved: i }]),
            stepNumber: history.length,
            player: 1 - player,
        });
    }
    render() {
        const stepNumber = this.state.stepNumber;
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winInfo = findWinner(current.squares);
        const winner = winInfo.winner;
        let moves = history.map((step, move) => {
            const latestMoved = step.latestMoved;
            const col = 1 + latestMoved % 3;
            const row = 1 + Math.floor(latestMoved / 3);
            const desc = move ?
                `Go to ${move} (${col}, ${row})` :
                'Go to game start';
            return (
                <li key={move}>
                    <button
                        className={move === stepNumber ? 'move-list-current' : ''}
                        onClick={() => this.jumpTo(move)}>{desc}</button>
                </li >
            );
        });
        const isAscending = this.state.isAscending;
        if (!isAscending) {
            moves.reverse();
        }
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else if (!current.squares.includes(null)) {
            status = 'Draw';
        }
        else {
            status = 'Next player: ' + (this.state.player ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winLine={winInfo.line}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={() => this.handleSortToggle()}>{isAscending ? 'descending' : 'ascending'}</button>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}
export default Game;

function findWinner(board) {
    const winPos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < winPos.length; i++) {
        const [a, b, c] = winPos[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return {
                winner: board[a],
                line: winPos[i],
            };
        }
    }
    return { winner: null };
}
