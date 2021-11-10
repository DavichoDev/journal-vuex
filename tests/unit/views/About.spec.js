import { shallowMount } from '@vue/test-utils'
import AboutPage from '@/views/About.vue'

describe('About.vue tests', () => {

    let wrapper

    beforeEach(() => {
      wrapper = shallowMount( AboutPage )

      jest.clearAllMocks()
    })

    test('Debe de renderizar el componente correctamente', () => {
        expect( wrapper.html() ).toMatchSnapshot()
    })

})