import {useState, useMemo, useEffect, useCallback} from 'react'

export enum DiagType {
  NONE,
  DOWN,
  UP,
}

export const useCalculateWinner = () => {
  const [[gridWidth, gridHeight], setGridSize] = useState([0, 0])
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [successData, setSuccessData] = useState<null | {
    maxLenType: string
    lineSquares: string[]
  }>(null)
  const [[x, y], setSelectedSquare] = useState([-1, -1])
  const [cols, setCols] = useState(new Map([]))
  const [rows, setRows] = useState(new Map([]))
  const [backDiags, setBackDiags] = useState(new Map([]))
  const [diags, setDiags] = useState(new Map([]))

  const resetMaps = () => {
    setSelectedSquare([-1, -1])
    setCols(new Map([]))
    setRows(new Map([]))
    setBackDiags(new Map([]))
    setDiags(new Map([]))
    setSuccessData(null)
  }

  const getLineKey = useCallback(
    (x, y, a): number | null => {
      if (a === 0) return y
      else if (a === -2) return x
      // y = ax + b when a=1
      const b = y - a * x
      const topY = 0
      const topX = (topY - b) / a
      console.log('isValidDiag: topX', topX)

      if (gridWidth - 1 < topX || topX < 0) return null // not a valid X value

      const bottomY = gridHeight - 1
      const bottomX = (bottomY - b) / a

      console.log('isValidDiag: bottomX', bottomX)

      if (0 > bottomX || bottomX > gridWidth - 1) return null

      console.log('isValidDiag', b)
      return b
    },
    [gridHeight, gridWidth],
  )

  const updateLinesData = useCallback(
    (x, y, a, maxLenType, setter) => {
      let newSuccess = null

      const maxLength = maxLenType === 'height' ? gridHeight : gridWidth
      console.log('updateDiags : ', x, y, a, maxLength)
      // debugger;
      const key = getLineKey(x, y, a)

      const index = Number.isInteger(key) ? key : null

      if (Number.isInteger(index)) {
        console.log(' index 1: ', index)

        setter(prevMap => {
          let retMap = prevMap

          const [player, prevSquares] = prevMap.get(index) || [currentPlayer, []]

          if (player !== 'blocked') {
            if (player === currentPlayer) {
              const newMap = new Map(prevMap)
              const lineSquares = [...prevSquares, `${x}-${y}`]
              newMap.set(index, [player, lineSquares])

              if (lineSquares.length === maxLength) {
                console.log('************isSuccess!!!')
                newSuccess = [maxLenType, lineSquares]
              }
              console.log(
                `Line is counted: index : ${index} : x,y: ${x},${y}, newMap: `,
                newMap,
              )
              retMap = newMap
            } else {
              const newMap = new Map(prevMap)
              newMap.set(index, ['blocked', []])
              console.log(
                `Line is dead: index : ${index} : x,y: ${x},${y}, newMap: `,
                newMap,
              )

              retMap = newMap
            }
          }
          console.log('***isSuccess=', newSuccess)
          setSuccessData(success => success || newSuccess)

          return retMap
        })
      }
    },
    [getLineKey, currentPlayer, gridWidth, gridHeight],
  )

  useEffect(() => {
    if (x === -1) return
    updateLinesData(x, y, 1, 'height', setBackDiags)
    updateLinesData(x, y, -1, 'height', setDiags)
    updateLinesData(x, y, -2, 'height', setCols)
    updateLinesData(x, y, 0, 'width', setRows)
  }, [x, y, updateLinesData])

  useEffect(() => {
    console.log('*******useEffect - success=', successData)
  }, [successData])

  useEffect(() => {
    console.log('******useffect grid width -> false')
    setSuccessData(prev => (prev && prev[0] === 'width' ? null : prev))
  }, [gridWidth])

  useEffect(() => {
    console.log('******useffect grid height -> false')
    setSuccessData(prev => (prev && prev[0] === 'height' ? null : prev))
  }, [gridHeight])

  return [
    setGridSize,
    [gridWidth, gridHeight],
    successData,
    setSelectedSquare,
    setCurrentPlayer,
    resetMaps,
  ]
}
