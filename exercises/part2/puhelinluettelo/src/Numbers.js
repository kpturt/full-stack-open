import React from 'react'

const Numbers = (props) => {
    const persons = props.persons
    
    /*need to come up with a solution for a better search*/
    const numbersToShow = persons.filter(person => person.name.toLowerCase().indexOf(props.filterBar) === 0 
        || person.name.toUpperCase().indexOf(props.filterBar) === 0 
        || person.name.indexOf(props.filterBar) === 0
    )

    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {numbersToShow.map(person => 
                <li key={person.id}> {person?.name} {person.number} 
                    {<button type="delete" onClick={props.onClick} id={person.id} >delete</button>}
                </li>)}
            </ul>
        </div>
    )
}

export default Numbers