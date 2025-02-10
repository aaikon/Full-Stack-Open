import personsService from '../services/persons'

const Person = ({ person, setPersons }) => {

    const handleDelete = () => {
        const message = `Delete ${person.name}?`

        if (window.confirm(message)) {
            personsService.remove(person.id)
            personsService.getAll().then(data => setPersons(data))
        }
    }

    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button onClick={handleDelete}>Delete</button></td>
        </tr>
    )
}

export default Person