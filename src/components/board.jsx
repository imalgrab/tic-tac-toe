import React from 'react';
import Square from './square'

class Board extends React.Component {
    renderSquare(i) {
        const winLine = this.props.winLine;
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                highlight={winLine && winLine.includes(i)}
            />
        );
    }
    render() {
        let board = [];
        for (let i = 0; i < 3; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                row.push(this.renderSquare(i * 3 + j));
            }
            board.push(<div key={i} className="board-row">{row}</div>);
        }
        return (
            <div>{board}</div>
        );
    }
}

export default Board;
