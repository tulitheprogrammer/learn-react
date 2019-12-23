// Tic Tac Toe: Advanced State
import React, {useState, useEffect, useCallback} from 'react'
import {useCalculateWinner} from './calculateWinner'

function Board({startWithX = true, width = 3, height = 3}) {
  const [xIsNext, setXisNext] = useState(startWithX)
  const [status, setStatus] = useState(`Next player: ${xIsNext ? 'X' : 'O'}`)
  const [
    setGridSize,
    [gridWidth, gridHeight],
    success,
    setSelectedSquare,
    setCurrentPlayer,
    resetMaps,
  ] = useCalculateWinner(null)
  const [totalMoves, setTotalMoves] = useState(0)
  const [squares, setSquares] = useState([])

  const addRow = () => {
    
    (([x, y]) => [x, y + 1])
  }
  const addColumn = () => {
    setGridSize(([x, y]) => [x + 1, y])
  }
  // eslint-disable-next-line no-unused-vars
  function selectSquare(x, y) {
    if (squares[x] && squares[x][y]) return

    const currentPlayer = xIsNext ? 'X' : 'O'
    console.log('selectSquare', x, y)
    setTotalMoves(moves => moves + 1)
    const newSquares = [...squares]
    newSquares[x] = [...(newSquares[x] || [])]
    newSquares[x][y] = currentPlayer
    setSquares(newSquares)
    setCurrentPlayer(currentPlayer)
    setSelectedSquare([x, y])
    setXisNext(v => !v)
  }

  const getStatusLabel = useCallback(() => {
    if (success) return `Winner: ${xIsNext ? 'O' : 'X'}`
    if (totalMoves === gridWidth * gridHeight)
      return `${totalMoves} Scratch: Cat's game`

    return `Next player: ${xIsNext ? 'X' : 'O'}`
  }, [xIsNext, gridWidth, gridHeight, success, totalMoves])

  useEffect(() => {
    setStatus(getStatusLabel)
  }, [xIsNext, getStatusLabel])

  useEffect(() => {
    setGridSize([width, height])
  }, [width, height, setGridSize])

  const resetGrid = () => {
    setSquares([])
    setXisNext(startWithX)
    resetMaps()
  }

  return (
    <div>
      <button onClick={resetGrid}>Reset Grid</button>
      <button onClick={addRow}>Add Row</button>
      <button onClick={addColumn}>Add Column</button>
      <div className="status">{status}</div>
      {[...Array(gridHeight)].map((_, rowIndex) => (
        <div className="board-row" key={'row' + rowIndex}>
          {[...Array(gridWidth)].map((_, colIndex) => {
            return (
              <button
                key={[colIndex, rowIndex]}
                className={`square${
                  success && success[1].includes(`${colIndex}-${rowIndex}`)
                    ? ' highlight'
                    : ''
                }`}
                onClick={() => selectSquare(colIndex, rowIndex)}
              >
                {squares[colIndex] ? squares[colIndex][rowIndex] : ''}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

// 💯 See if you can figure out a nice way to avoid all the repetition in the square buttons

// 💯 Open /isolated/exercises-final/09-extra-0 and see that the extra version
//    supports keeping a history of the game and allows you to go backward and
//    forward in time. See if you can implement that! (Tip, in the final
//    example, we separate the state management from the board and that helps).

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  return <Game />
}
Usage.title = 'Tic Tac Toe: Advanced State'

export default Usage
