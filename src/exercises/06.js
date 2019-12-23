// Counter: useEffect
import React, {useState, useEffect} from 'react'

function Counter({step = 1, initialCount = 0}) {
  const storedCount = Number(
    window.localStorage.getItem('count1') || initialCount,
  )
  const [count, setCount] = useState(storedCount || initialCount)

  // setCount(storedCount);

  const increment = () => setCount(c => c + step)

  useEffect(() => {
    window.localStorage.setItem('count1', count)
  }, [count])

  return <button onClick={increment}>{count}</button>
}

function Usage() {
  return <Counter />
}
Usage.title = 'Counter: useEffect'

export default Usage
