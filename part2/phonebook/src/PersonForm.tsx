const PersonForm = ({addNote, newName, newNumber, onChangeName, onChangeNumber}) => {
  return (
    <form onSubmit={addNote}>
      <div>
        name: <input value={newName} onChange={onChangeName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default PersonForm

