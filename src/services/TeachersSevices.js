import teachers from '../data/mockTeachers.json'

//get all teacher
export const getTeachers = () => {

    return new Promise((resolve) => {

        // Simulate network latency
        setTimeout(() => {

            //return mock all teacher
            resolve(teachers)
        },500)
    })
}
