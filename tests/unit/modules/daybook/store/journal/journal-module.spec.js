const { createStore } = require("vuex");
import journal from '@/modules/daybook/store/journal';
import { journalState } from '../../../../mock-data/test-state';


const createVuexStore = ( initialState ) => 
    createStore({
        modules: {
            journal: {
                ...journal,
                state: {...initialState}
            }
        }
    })

describe('Vuex- Pruebas en el Journal Module', () => {

    // Module
    test('Este es el estado inivial, debe de tener este state', () => {

        const store = createVuexStore( journalState )
        const { isLoading ,entries } =  store.state.journal
        
        expect( isLoading ).toBeFalsy()
        expect( entries ).toEqual( journalState.entries )

    })

    // Mutations
    test('mutation: setEntries', () => {
        const store = createVuexStore({isLoading : true, entries: []})
        
        store.commit('journal/setEntries', journalState.entries)
        expect( store.state.journal.entries ).toHaveLength(3)
        store.commit('journal/setEntries', journalState.entries)
        expect( store.state.journal.entries ).toHaveLength(6)
        
        expect( store.state.journal.isLoading ).toBeFalsy()
    })
    test('mutation: updateEntrie', () => {
        const store = createVuexStore({isLoading : true, entries: []})
        
        store.commit('journal/setEntries', journalState.entries)
        expect( store.state.journal.entries ).toHaveLength(3)
        store.commit('journal/setEntries', journalState.entries)
        expect( store.state.journal.entries ).toHaveLength(6)
        
        expect( store.state.journal.isLoading ).toBeFalsy()
    })
    test('mutation: updateEntry', () => {
        
        const store = createVuexStore( journalState )
        
        const updatedEntry = {
            id : "-MnwodvOg-vnNI7zQ3aK", 
            date : 1636329218115,
            picture : "https://res.cloudinary.com/davicho/image/upload/v1636332235/h5cs9xvw8xzjniwdiqbz.jpg",
            text : "Hola mundo desde pruebas."
        }

        store.commit('journal/updateEntry', updatedEntry)

        const storeEntries = store.state.journal.entries 

        expect( storeEntries ).toHaveLength(3)
        expect( storeEntries ).toContainEqual(updatedEntry)
    })
    test('mutation: addEntry', () => {
        
        const store = createVuexStore( journalState )
        const addedEntry = {
            id : "-MnwodvOg-vnNI7zQ3aK", 
            date : 1636329218115,
            picture : "https://res.cloudinary.com/davicho/image/upload/v1636332235/h5cs9xvw8xzjniwdiqbz.jpg",
            text : "Hola soy un objeto que se quiere unir a la fiesta :3."
        }

        store.commit('journal/addEntry', addedEntry)

        const storeEntries = store.state.journal.entries 

        expect( storeEntries ).toHaveLength(4)
        expect( storeEntries ).toContainEqual(addedEntry)
    })
    test('mutation: deleteEntry', () => {
        
        const store = createVuexStore( journalState )
        const idDeletedEntry = '-MnwodvOg-vnNI7zQ3aK'

        store.commit('journal/deleteEntry', idDeletedEntry)

        const storeEntries = store.state.journal.entries 

        expect( storeEntries ).toHaveLength(2)
        expect( storeEntries.some(entry => entry.id ===  idDeletedEntry)).toBeFalsy()
    })

    // Getters
    test('getters: getEntriesByTerm', () => {
        
        const store = createVuexStore( journalState )
        const getterResult = store.getters['journal/getEntriesByTerm']('')
        const getterResultWithTerm = store.getters['journal/getEntriesByTerm']('mundillo')

        expect( getterResult ).toHaveLength(3)
        expect( getterResultWithTerm ).toHaveLength(1)
    })
    test('getters: getEntryById', () => {
        
        const store = createVuexStore( journalState )
        const firstEntry = store.getters['journal/getEntryById']('-MnwodvOg-vnNI7zQ3aK')
        
        expect( firstEntry ).toEqual( store.state.journal.entries[0] )
    })

    // Actions
    test('actions: loadEntries', async() => {

        const store = createVuexStore({isLoading : true, entries: []})

        await store.dispatch('journal/loadEntries')

        expect( store.state.journal.entries ).toHaveLength(3)

    })
    test('actions: updateEntry', async () => {

        const store = createVuexStore( journalState )
        const updatedEntry = {
            id : "-MnwodvOg-vnNI7zQ3aK", 
            date : 1636329218115,
            picture : "https://res.cloudinary.com/davicho/image/upload/v1636332235/h5cs9xvw8xzjniwdiqbz.jpg",
            text : "Hoy pasó algo chingón en VUEX testing :3333"
        }

        await store.dispatch('journal/updateEntries', updatedEntry)

        const entries = store.state.journal.entries
        expect( entries ).toHaveLength(3)
        expect( 
            entries.find( e => e.id === updatedEntry.id )
         ).toEqual( {
            id : "-MnwodvOg-vnNI7zQ3aK", 
            date : 1636329218115,
            picture : "https://res.cloudinary.com/davicho/image/upload/v1636332235/h5cs9xvw8xzjniwdiqbz.jpg",
            text : "Hoy pasó algo chingón en VUEX testing :3333"
        } )

    })
    test('actions: createEntry & deleteEntry', async() => {

        const store = createVuexStore( journalState )
        const newEntry = { date : 1636329218115, text : "Nueva entrada desde las pruebas :3" }

        const newId = await store.dispatch('journal/createEntry', newEntry)
        expect( typeof newId  ).toBe('string')
        expect( store.state.journal.entries ).toHaveLength(4)
        expect( store.state.journal.entries.some( e => e.id === newId ) ).toBeTruthy()
        
        // DeleteEntry
        await store.dispatch('journal/deleteEntry', newId)
        expect( store.state.journal.entries.some( e => e.id === newId ) ).toBeFalsy()
    })
})