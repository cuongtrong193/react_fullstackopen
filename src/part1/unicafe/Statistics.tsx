import Header from "./Header";
import StatisticLine from "./StatisticLine";

const Statistics = ({good,neutral,bad}) => {

  return (
    <div>
      <Header title={'Statistics'} />
      <StatisticLine text={'Good'} value={good} />
      <StatisticLine text={'Neutral'} value={neutral} />
      <StatisticLine text={'Bad'} value={bad} />
      <p>All {bad+good+neutral}</p>
      <p>Average {(good-bad)/(bad+good+neutral)}</p>
      <p>Positive {100*good/(bad+good+neutral)}%</p>
    </div>
  )
}

export default Statistics
