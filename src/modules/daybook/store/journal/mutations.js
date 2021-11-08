
export const setEntries = (state, entries) => {
    state.entries = [...state.entries, ...entries]
    state.isLoading = false;
}

export const updateEntry = ( state, entry ) => {
    const updatedEntries = [...state.entries]
        .map(ent => ent.id === entry.id ? entry : ent)
    state.entries = [...updatedEntries]
    state.isLoading = false;
}

export const addEntry = ( state, entry ) => {
    state.entries = [entry, ...state.entries]
}

export const deleteEntry = ( state, idEntry ) => {
    const newEntries = [...state.entries].filter(entry => entry.id !== idEntry )
    state.entries = [...newEntries]
}