import Part from './Part.js';

export default function Content({parts}) {
	return (<>
		{
			parts.map((item) => <Part part={item.name} exercises={item.exercises} />)
		}
		</>)
}
