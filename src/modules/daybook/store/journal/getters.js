export const getEntriesByTerm = ( { entries } ) => ( term = '' ) => {
    
    if ( term.length === 0 ) { return entries } 
    return entries.filter( entry => entry.text.toLowerCase().includes( term.toLowerCase() ))
    
}

export const getEntryById = ({ entries }) => ( id = '' ) => {
    const entry = entries.find( entry => entry.id === id )
    if(!entry) return
    return {...entry}
}