import Person from './Person'

const Persons = ({ persons, searchName, setPersons }) => {
    return (
        <div>
            <table>
                <tbody>
                    {
                        persons.map(person => {
                            if (searchName.length === 0 || person.name.search(searchName) !== -1) {
                                return (
                                    <Person key={person.id} person={person} setPersons={setPersons} />
                                )
                            } else {
                                return null
                            }
                        })
                    }
                </tbody>
            </table>
        </div>  
    )
}

export default Persons