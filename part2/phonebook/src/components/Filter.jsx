const Filter = ({ searchName, setSearchName, handleChange }) => {
    return (
      <div>
        Filter shown with: <input value={searchName} onChange={handleChange(setSearchName)} />
      </div>
    )
}

export default Filter