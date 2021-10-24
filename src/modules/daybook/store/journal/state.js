
export default () => ({
    isLoading: true,
    entries: [
        {
            id: new Date().getTime(),
            date: new Date().toDateString(),
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, dolorem veritatis explicabo, voluptatem, est corrupti possimus eligendi illum suscipit.',
            picture: null
        },
        {
            id: new Date().getTime() + 1000,
            date: new Date().toDateString(),
            text: 'Error, dolorem veritatis explicabo, voluptatem, est corrupti possimus eligendi illum suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            picture: null
        },
        {
            id: new Date().getTime() + 2000,
            date: new Date().toDateString(),
            text: 'Est corrupti possimus eligendi illum suscipit. Ipsum dolor sit amet consectetur adipisicing elit lorem. Error, dolorem veritatis explicabo, voluptatem.',
            picture: null
        }
    ]
})
