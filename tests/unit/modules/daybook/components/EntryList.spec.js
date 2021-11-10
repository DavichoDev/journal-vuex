import { createStore } from "vuex";
import { shallowMount } from "@vue/test-utils";

import EntryList from '@/modules/daybook/components/EntryList.vue';
import journal from '@/modules/daybook/store/journal';
import { journalState } from "../../../mock-data/test-state";

const createVuexStore = ( initialState ) => 
createStore({
    modules: {
        journal: {
            ...journal,
            state: {...initialState}
        }
    }
})

describe('EntryList.vue Test', () => {

    const store = createVuexStore( journalState )
    const $router = { push: jest.fn() }

    let wrapper
    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount( EntryList, {
            global: {
                mocks: {
                    $router 
                },
                plugins: [ store ]
            }
        })
    })

    test('Debe de llamar el getEntriesByTerm sin termino y mostrar 3 entradas', () => {
        expect( wrapper.findAll('entry-stub') ).toHaveLength( 3 )
    })

    test('Debe de llamar el getEntriesByTerm y filtrar las entradas', async () => {
        const input = wrapper.find('input')
        await input.setValue('mundillo')
        expect( wrapper.findAll('entry-stub') ).toHaveLength( 1 )
    })
    
    test('El boton de nuevo debe de redireccionar a new', () => {
        wrapper.find('button').trigger('click')
        expect( $router.push ).toHaveBeenCalledWith({name: 'entry', params: {id: 'new'}})
    })



})