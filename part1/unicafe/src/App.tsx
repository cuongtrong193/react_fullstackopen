import { useState } from 'react'
import Button from "./Button";
import Header from "./Header";
import Statistics from "./Statistics";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title={'Give feedback'} />
      <Button label={'Good'} onClick={() => setGood(good+1)} />
      <Button label={'Neutral'} onClick={() => setNeutral(neutral+1)} />
      <Button label={'Bad'} onClick={() => setBad(bad+1)} />
      {
        good !== 0 || neutral !== 0 || bad !== 0 ? <Statistics good={good} neutral={neutral} bad={bad} /> : <p>No feedback given</p>
      }
    </div>
  )
}

export default App
