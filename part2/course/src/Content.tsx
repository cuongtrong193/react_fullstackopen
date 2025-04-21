import Part from "./Part";

const Content = ({parts}) => {
  const total = parts.reduce((total, part) => total+part.exercises, 0);
  return <div>{
    parts.map((obj) => <Part title={`${obj.name} ${obj.exercises}`} key={obj.id} />)
  }
    <b>{`total of ${total} exercises`}</b>
  </div>
}

export default Content
