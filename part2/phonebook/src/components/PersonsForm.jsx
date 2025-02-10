const PersonsForm = (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
      <div>name: <input value={props.newName} onChange={props.handleChange(props.setNewName)}/></div>
      <div>number: <input value={props.newNumber} onChange={props.handleChange(props.setNewNumber)} /></div>
      <div><button type="submit">add</button></div>
    </form>
    )
}

export default PersonsForm