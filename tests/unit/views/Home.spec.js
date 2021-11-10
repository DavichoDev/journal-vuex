import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue tests', () => {

    let wrapper

    beforeEach(() => {
      wrapper = shallowMount( Home )

      jest.clearAllMocks()
    })

    test('Debe de renderizar el componente correctamente', () => {
        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('Hacer click en un boton debe de redirecciona a no-entry', () => {
        
        const mockRouter = {
            push: jest.fn()
        }

        wrapper = shallowMount(Home,{
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        })

        wrapper.find('button').trigger('click')

        expect( mockRouter.push ).toHaveBeenCalled()
        expect( mockRouter.push ).toHaveBeenCalledWith({name: 'no-entry'})

    })

})