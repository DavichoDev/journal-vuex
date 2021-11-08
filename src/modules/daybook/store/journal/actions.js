import journalApi from '@/api/journalApi';

export const loadEntries = async ({ commit }) => {
    const entries = []
    const { data } = await journalApi.get('/entries.json')
    data ? Object.keys(data).forEach( id => entries.push({id, ...data[id]})) : []
    commit('setEntries', entries)
}

export const updateEntries = async ({ commit }, entry ) => {
    const {id, ...body} = entry
    const { data } = await journalApi.put(`/entries/${id}.json`, body)
    commit('updateEntry', {id, ...data})
}

export const createEntry = async ({ commit }, entry) => {
    const { data } = await journalApi.post('/entries.json', entry)
    const { name: id } = data
    commit('addEntry', {id, ...entry})
    return id
}

export const deleteEntry = async ({ commit }, id) => {
    await journalApi.delete(`/entries/${ id }.json`)
    commit('deleteEntry', id)
    return id
}