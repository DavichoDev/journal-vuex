import daybookRouter from '@/modules/daybook/router';
describe('Router index.js Test', () => {
    
    test('El router debe tener esta configuracion', async() => {
        
        // Esperar que se haga Match con la siguiente configuracion
        expect( daybookRouter ).toMatchObject({
            name: 'daybook',
            component: expect.any( Function ),
            children: [
                {
                    path: '',
                    name: 'no-entry',
                    component: expect.any( Function ),
                },
                {
                    path: ':id',
                    name: 'entry',
                    component: expect.any( Function ),
                    props: expect.any( Function )
                },
            ]
        })

        const promiseRoutes = daybookRouter.children.map( child => child.component() )
        const routes = (await Promise.all(promiseRoutes)).map( child => child.default.name )
        
        //Esperar que se contengan al menos estos dos componentes. 
        expect( routes ).toContain('NoEntrySelected')
        expect( routes ).toContain('EntryView')

    })

    test('Debe de retornar el ID de la ruta ', () => {

        const route = {
            params: {
                id: 'ABC-123'
            }
        }

        const entryRoute = daybookRouter.children.find(route => route.name === 'entry')

        expect( entryRoute.props( route ) ).toEqual( {id: 'ABC-123'} )

    })

})