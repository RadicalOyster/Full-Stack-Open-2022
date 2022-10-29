import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  let initialIndex = Math.floor(Math.random() * anecdotes.length)
  const points = []

  for (var i = 0; i < anecdotes.length; i++) {
    points.push(0)
  }

  const [anecdoteStats, setAnecdoteStats] = useState({
    index: initialIndex, points: points, highestRated: -1
  })

  const RandomizeSelection = (list, selected) => {
    let max_value = list.length
    let new_index = Math.floor(Math.random() * max_value)
    while (new_index === selected) {
      new_index = Math.floor(Math.random() * max_value)
    }
    const new_state = {
      index: new_index, points: anecdoteStats.points, highestRated: anecdoteStats.highestRated
    }
    setAnecdoteStats(new_state)
  }

  const AddVote = (list, index) => {
    const new_points = [...anecdoteStats.points]
    new_points[index] += 1
    var highestRated
    if (anecdoteStats.highestRated === - 1 || new_points[index] > new_points[anecdoteStats.highestRated]) {
      highestRated = index
    }
    else {
      highestRated = anecdoteStats.highestRated
    }
    const new_state = {
      index: index, points: new_points, highestRated: highestRated
    }
    console.log(new_state)
    setAnecdoteStats(new_state)
  }

  return (
    <div>
      <Header text="Anecdote of the Day" />
      <AnecdoteDisplay anecdotes={anecdotes} index={anecdoteStats.index} points={anecdoteStats.points} />
      <p>
        <Button function={AddVote} list={anecdotes} index={anecdoteStats.index} text="Vote" />
        <Button function={RandomizeSelection} list={anecdotes} index={anecdoteStats.index} text="Next anecdote" />
      </p>
      <Header text="Highest rated anecdote" />
      <AnecdoteDisplay anecdotes={anecdotes} index={anecdoteStats.highestRated} points={anecdoteStats.points} />
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={() => props.function(props.list, props.index)}>{props.text}</button>
  )
}

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const AnecdoteDisplay = (props) => {
  var index = 0
  if (props.index !== -1) {
    index = props.index
  }

  return (
    <div>
      <p>{props.anecdotes[index]}</p>
      <p>{props.points[index]} votes</p>
    </div>
  )
}

export default App