// Counter: advanced custom hooks
import React, {useState, useEffect} from 'react'

function useLocalStorageState({key, initialValue = 0, deserialize = id => id}) {
  const [value, setValue] = useState(() =>
    deserialize(window.localStorage.getItem(key) || initialValue),
  )

  useEffect(() => {
    window.localStorage.setItem(key, value)
  }, [value, key])

  return [value, setValue]
}

function useLocalStorageCounter({step = 1, initialCount = 0, key = 'count'}) {
  const [count, setCount] = useLocalStorageState({
    key,
    initialValue: initialCount,
    deserialize: v => Number(v),
  })

  const increment = () => setCount(c => c + step)

  return [count, increment]
}

function Counter({step, initialCount}) {
  const [count, increment] = useLocalStorageCounter({
    step,
    initialCount,
  })

  return <button onClick={increment}>{count}</button>
}

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  return <Counter />
}
Usage.title = 'Counter: advanced custom hooks'

export default Usage
