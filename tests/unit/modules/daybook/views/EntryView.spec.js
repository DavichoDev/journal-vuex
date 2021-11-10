import { createStore } from "vuex";
import { shallowMount } from "@vue/test-utils";
import EntryView from '@/modules/daybook/views/EntryView.vue';
import journal from '@/modules/daybook/store/journal';
import { journalState } from "../../../mock-data/test-state";
import Swal from "sweetalert2";

const createVuexStore = ( initialState ) => 
createStore({
    modules: {
        journal: {
            ...journal,
            state: {...initialState}
        }
    }
})

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn(),
}))

describe('EntryView.vue Tests', () => {

    const store = createVuexStore( journalState )
    store.dispatch = jest.fn()
    const $router = { push: jest.fn() }

    let wrapper
    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount( EntryView, {
            props: {
                id: '-MnwodvOg-vnNI7zQ3aK'
            },
            global: {
                mocks: {
                    $router 
                },
                plugins: [ store ]
            }
        })
    })


    test('Debe de sacar al usuario porque el ID no existe', () => {
        shallowMount( EntryView, {
            props: {
                id: 'Este id no existe en el Store'
            },
            global: {
                mocks: { $router },
                plugins: [ store ]
            }
        })
        expect( $router.push ).toHaveBeenCalledWith({name: 'no-entry'})
    })

    test('Debe de mostrar la entrada correctamente', () => {
        expect(wrapper.html()).toMatchSnapshot()
        expect( $router.push ).not.toHaveBeenCalled()
    })

    test('Debe de borrar la entrada y salir', (done) => {
        
        Swal.fire.mockReturnValueOnce(Promise.resolve({isConfirmed: true}))
        wrapper.find('.btn-danger').trigger('click')
        expect( Swal.fire ).toHaveBeenCalledWith({
            title: '¿Estás seguro?',
            text: 'Una vez borrado, no se podrá recuperar.',
            showDenyButton: true,
            confirmButtonText: 'Si, estoy seguro'
        })
        setTimeout(() => {
            expect( store.dispatch ).toHaveBeenCalledWith('journal/deleteEntry', '-MnwodvOg-vnNI7zQ3aK')
            expect( $router.push ).toHaveBeenCalled()
            done()
        }, 1);
    })
})