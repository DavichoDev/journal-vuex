import { shallowMount } from '@vue/test-utils';
import Entry from '@/modules/daybook/components/Entry.vue';
import { journalState } from '../../../mock-data/test-state';

describe('Entry.js Tests', () => {

    const mockRouter = {
        push: jest.fn()
    }

    let wrapper

    beforeEach(() => {
      wrapper = shallowMount( Entry, {
        props: {
            entry: journalState.entries[0]
        },
        global: {
            mocks: {
                $router: mockRouter
            } 
        }
      })
      jest.clearAllMocks()
    })

    test('Debe de pasar el snapshot', () => {
        expect( wrapper.html ).toMatchSnapshot()
    })

    test('Debe de redireccionar al hacer click con el entry-container', () => {
        const container = wrapper.find('.entry-container')
        const idEntry = wrapper.props().entry.id
        container.trigger('click')

        expect( mockRouter.push ).toHaveBeenCalled()
        expect( mockRouter.push ).toHaveBeenCalledWith({name: 'entry', params: {id: idEntry}})
    })

    test('pruebas en las propiedades computadas', () => {

        const day = wrapper.vm.day
        const month = wrapper.vm.month
        const yearDay = wrapper.vm.yearDay

        // TypeAssertions
        expect( typeof day ).toBe('number')
        expect( typeof month ).toBe('string')
        expect( typeof yearDay ).toBe('string')
        
        // ValueAssertions
        expect( day ).toBe(7)
        expect( month ).toBe('Noviembre')
        expect( yearDay ).toBe('2021, Domingo')
    })
})