import { createContext, useContext, useRef, useState } from 'react'

const CourseContext = createContext()

export const CourseProvider = ({ children }) => {
    const [isLoadingCourses, setIsLoadingCourses] = useState(false)
    const [dataCourses, setDataCourses] = useState({})
    const [lengthCourses, setLengthCourses] = useState(null)
    const [coursesFilter, setCoursesFilter] = useState ({
        name: '',
        teacherId: null,
        grade: null,
        categoryId: [],
        minPrice: null,
        maxPrice: null,
        sort: {
            type : 0,
            name : 'Mới nhất'
        }
    })

    const skipFetchPriceRange = useRef(false)

    return (
        <CourseContext.Provider value={{ 
            dataCourses, 
            setDataCourses,
            coursesFilter,
            setCoursesFilter,
            isLoadingCourses,
            setIsLoadingCourses,
            lengthCourses,
            setLengthCourses,
            skipFetchPriceRange
            }}>
        {children}
        </CourseContext.Provider>
    )
}

// Custom hook
export const useCourses = () => useContext(CourseContext)