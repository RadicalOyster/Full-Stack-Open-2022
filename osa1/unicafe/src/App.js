import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const HandleClick = (vote) => {
    if (vote === "Good") {
      setGood(good + 1)
    }
    else if (vote === "Neutral") {
      setNeutral(neutral + 1)
    }
    else if (vote === "Bad") {
      setBad(bad + 1)
    }
  }

  return (
    <div>
      <Header />
      <Votes clickHandler={HandleClick} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={() => props.clickHandler(props.text)}>{props.text}</button>
  )
}

const Header = () => {
  return (
    <h1>Give Feedback</h1>
  )
}

const Votes = (props) => {
  return (
    <div>
      <Button text="Good" clickHandler={props.clickHandler} />
      <Button text="Neutral" clickHandler={props.clickHandler} />
      <Button text="Bad" clickHandler={props.clickHandler} />
    </div>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td><td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad === 0) {
    return <h1>No feedback given.</h1>
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="Good" value={props.good} />
          <StatisticsLine text="Neutral" value={props.neutral} />
          <StatisticsLine text="Bad" value={props.bad} />
          <StatisticsLine text="Total" value={CalculateTotal(props.good, props.neutral, props.bad)} />
          <StatisticsLine text="Average" value={CalculateAverage(props.good, props.neutral, props.bad)} />
          <StatisticsLine text="Positive" value={CalculatePositive(props.good, props.neutral, props.bad)} />
        </tbody>
      </table>
    </div>
  )
}

const CalculateTotal = (good, neutral, bad) => {
  return good + neutral + bad
}

const CalculateAverage = (good, neutral, bad) => {
  let total = CalculateTotal(good, neutral, bad)
  let score = good - bad
  let average = score / total
  if (total === 0) {
    return ""
  }
  return average
}

const CalculatePositive = (good, neutral, bad) => {
  if (good === 0) {
    return
  }
  let nonPositive = neutral + bad
  if (nonPositive === 0) {
    return (
      <span>100%</span>
    )
  }
  let total = CalculateTotal(good, neutral, bad)
  let positive = good / total * 100
  return (
    <span>{positive}%</span>
  )
}

export default App