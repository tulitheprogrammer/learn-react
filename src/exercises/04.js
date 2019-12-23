// Counter: hooks and simple state
import React, {useState} from 'react'

// Normally an interactive application will need to hold state somewhere.
// In React, you use special functions called "hooks" to do this.
// Common built-in hooks include:
// - React.useState
// - React.useEffect
// - React.useContext
// - React.useRef
// - React.useReducer
//
// Each of these is a special function that you can call inside your custom
// React component function to store data (like state) or perform actions
// (or side-effects). There are a few more built-in hooks that have special
// use cases, but the ones above are what you'll be using most of the time.
//
// Each of the hooks each has a unique API. Some return a value
// (like React.useRef and React.useContext), others return a pair of values
// (like React.useState and React.useReducer), and others return nothing at
// all (like React.useEffect).
//
// Here's an example of a component that uses the `useState` hook and an
// onChange event handler to update that state:
//
// function NameInput() {
//   const [name, setName] = React.useState('')
//   const handleChange = event => setName(event.target.value)
//   return (
//     <>
//       <label>
//         Name: <input defaultValue={name} onChange={handleChange} />
//       </label>
//       <div>You Typed: {name}</div>
//     </>
//   )
// }
//
// React.useState is a function that accepts a single argument. That argument
// is the initial state for the NameInput instance of the component. In our
// case, the input will start as an empty string.
//
// React.useState returns a pair of values. It does this by returning an array
// with two elements (and we use destructuring syntax to assign each of those
// values to distinct variables). The first of the pair is the state value and
// the second is a function we can call to update the state. We can name these
// variables whatever we want. Common convention is to choose a name for the
// state variable, then prefix `set` in front of that for the updater function.
//
// State can be defined as: data that changes over time. So how does this work
// over time? When the input's value is changed, our handleChange function will
// be called with the change event object. Then we can use that event to access
// the input via `event.target` and we can access the input's value from that so
// we can update the `name` state in our component by calling the function to
// update the state.
//
// When we call `setName`, that tells React to re-render our component. When it
// does this, the entire NameInput function is re-run, so when React.useState
// is called this time, the value we get back is the value that we called
// `setName` with. And it continues like that until NameInput is unmounted
// (removed from the application), or the user closes the application.
//
// 🐨 Below, fill out the Counter component so that it manages the state of how
// many times the the button is clicked. The text of the button should be the
// number of times the button has been clicked.

function Counter({step, initialCount}) {
  const [count, setCount] = useState(initialCount)

  const increment = () => {
    setCount(count => count + step)
  }
  return <button onClick={increment}>{count}</button>
}

// 💯 You'll need to know the current count to increment it by one. State
// updater functions (like `setName` above) can accept a function which will be
// passed the current state and returns what you want the state to be set to:
//
// setCount(currentCount => {
//   // calculate newCount variable
//   return newCount
// })
//
// You can make things work without doing it this way, but as a bonus try to
// figure out how to make that work as well. We'll cover more about why this
// is important when we talk about asynchronously updating the state.

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  return <Counter initialCount={3} step={2} />
}
Usage.title = 'Counter: hooks and simple state'

export default Usage
