import uploadImage from '@/modules/daybook/helpers/uploadImage';
import cloudinary from 'cloudinary';
import axios from 'axios';

cloudinary.config({
    cloud_name: 'davicho',
    api_key: '763654217829523',
    api_secret: 'G2ELHE2cLOjUM01KitkPojVwdag'
})

describe('uploadImage.js Helper Test', () => {

    test('Debe de cargar un archivo y retornar el URL', async( done ) => {

        const { data } = await axios.get('https://res.cloudinary.com/davicho/image/upload/v1611216171/damir-bosnjak_gkyf6p.jpg',{
            responseType: 'arraybuffer'
        })
        const file = new File([data], 'foto.jpg')
        const url = await uploadImage(file)

        expect( typeof url ).toBe('string')

        // Tomar el ID
        const segments = url.split('/')
        const imageId = segments[ segments.length - 1].replace('.jpg', '')
        cloudinary.v2.api.delete_resources(imageId, {}, () => {
            done()
        })
    })

})