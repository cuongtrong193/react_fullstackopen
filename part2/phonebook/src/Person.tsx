import React from "react";
import service from "../service";

const Person = ({persons}) => {
  const onClick = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      service
        .delete(person.id)
        .then(response => {
          console.log('deleted ', response);
          location.reload();
        })
    } else {
      alert('Error deleting the person');
    }
  }
  return (
    <>
      {
        persons.map((person, index) => <div style={{display: 'flex', flexDirection: 'row'}}>
            <p key={person.name}>{person.name} {person.number}</p>
            <button type={'button'} onClick={() => onClick(person)}>Delete</button>
          </div>)
      }
    </>
  )
}

export default Person
