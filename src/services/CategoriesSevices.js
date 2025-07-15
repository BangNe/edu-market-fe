import categories from '../data/mockCategories.json'

//get all categories
export const getCategories = () => {

    return new Promise((resolve) => {

        //Simulate network latecy
        setTimeout(() => {
            //return mock all categories
            resolve(categories)
        },500)
    })
}