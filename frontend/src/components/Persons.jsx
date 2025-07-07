const Persons = ({ filteredPersons, removePerson }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{' '}
          <button
            onClick={() => {
              removePerson(person);
            }}
          >
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
