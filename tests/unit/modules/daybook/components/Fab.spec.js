import { shallowMount } from "@vue/test-utils";
import Fab from '@/modules/daybook/components/Fab.vue';

describe('Fab.vue Tests', () => {

    let wrapper
    beforeEach(() => {
      wrapper = shallowMount( Fab )
      jest.clearAllMocks()
    })
    
    test('Debe de pasar el snapshot', () => {
        expect( wrapper.html ).toMatchSnapshot()
    })
    test('Debe de mostrar el icono por defecto', () => {
        const fabIcon = wrapper.find('i')
        expect(fabIcon.classes()).toEqual(['fa', 'fa-2x'])
    })
    test('Debe de mostrar el icono por argumento: fa-plus', () => {
        wrapper = shallowMount( Fab, {
            props: {
                icon: 'fa-plus'
            }
        })
        const fabIcon = wrapper.find('i')
        expect(fabIcon.classes()).toEqual(['fa', 'fa-2x', 'fa-plus'])
    })

    test('Debe de emitir el event on:click cuando se hace click', () => {
        const fabButton = wrapper.find('button')
        fabButton.trigger('click')
        expect( wrapper.emitted('on:click') ).toHaveLength(1)
    })
})