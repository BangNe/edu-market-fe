import grades from '../data/mockGrades.json'

//get all grades
export const getGrades = () => {

    return new Promise((resolve) => {

        //Simulate network latecy
        setTimeout(() => {
            //return mock all grades
            resolve(grades)
        },500)
    })
}
