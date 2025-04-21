// import axios from "axios";
import {useEffect, useState } from 'react'
import Notification from "./Notification";
import Person from "./Person";
import PersonForm from "./PersonForm";
import service from '../service'

const App = () => {
  const [persons, setPersons] = useState([
    {}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    service
      .getAll()
      .then(response => {
        setPersons(response.data)
      }).catch(() => {

    })
  //   axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`).then(response => {
  //     console.log(response.data, 'all');
  //   }).catch((e) => {
  //     console.log(e, 'cho vo');
  //   })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    if(newName && newNumber) {
      service
        .create({name: newName, number: newNumber})
        .then(response => {
          if(response.data) {
            setMessage(`Added ${newName}`)
            setPersons([...persons, { name: newName, number: newNumber }]);
            setNewName('');
            setNewNumber('');
          } else {
            alert(`Error adding new note: ${response.data}`);
          }
        }).catch((err) => {
        alert(`Error adding new note: ${err}`);
      })
    } else {
      alert(`You must complete the required input`);
    }
  }

  const onChangeName = (e) => {
    setNewName(e.target.value);
    message && setMessage('');
    // axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${e.target.value}`).then(response => {
    //   console.log(response.data, 've');
    // }).catch((e) => {
    //   console.log(e, 'cho vo');
    // })
  }

  const onChangeNumber = (e) => {
    setNewNumber(e.target.value);
    message && setMessage('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <PersonForm addNote={addNote} newName={newName} onChangeName={onChangeName} onChangeNumber={onChangeNumber} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Person persons={persons} />
    </div>
  )
}

export default App
