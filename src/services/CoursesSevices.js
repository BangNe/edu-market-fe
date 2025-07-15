import courses from '../data/mockCourses.json'

//get all courses
export const getCourses = () => {


    return new Promise((resolve) => {

        // Simulate network latency
        setTimeout(() => {

            //return mock all courses
            resolve(courses)
        },500)
    })
}

//get filter courses
export const getCoursesFilter = (filterCourses) => {

    return new Promise((resolve) => {
        
        // Simulate network latency
        setTimeout(() => {

            //filter courses
            const filtered = courses.filter(course => {

                //filter match name
                const matchName = course.name.toLowerCase().includes(filterCourses.name?.toLowerCase() || '')

                //filter match teacher
                const matchTeacher = filterCourses.teacherId 
                ? course.teacherId === filterCourses.teacherId 
                : true

                //filter match grade
                const matchGrade = filterCourses.grade 
                ? filterCourses.grade === course.grade
                : true

                //filter match category
                const matchCategory = filterCourses.categoryId?.length 
                ? filterCourses.categoryId.includes(course.categoryId) 
                : true

                //filter match price range
                const matchPrice =
                (filterCourses.minPrice === null ||
                    course.price >= Number(filterCourses.minPrice)) &&
                (filterCourses.maxPrice === null ||
                    course.price <= Number(filterCourses.maxPrice))

                return matchName && matchTeacher && matchGrade && matchCategory && matchPrice 
            })

            const sorted = [...filtered]

            //sort courses
            switch (filterCourses.sort.type) {
                //sort rating
                case 1:
                sorted.sort((a, b) => b.rating - a.rating)
                break
                //sort bought
                case 2:
                sorted.sort((a, b) => b.enrollment - a.enrollment)
                break
                //sort new
                case 0:
                default:
                sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                break
            }

            resolve(sorted)
        },500)
    })
}

//get min & max price from all courses
export const getMinMaxCoursePrice = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const prices = courses.map(course => course.price)

            const minPrice = Math.min(...prices)
            const maxPrice = Math.max(...prices)

            resolve({ minPrice, maxPrice })
        }, 500)
    })
}
