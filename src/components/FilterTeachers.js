import { useEffect, useState } from 'react'

import { getTeachers } from '../services/TeachersSevices'
import { useCourses } from '../context/CourseContext'
import { getCoursesFilter } from '../services/CoursesSevices'

import FilterBox from './FilterBox'
import InputCheck from './InputCheck'

const FilterTeachers = () => {
    const {setDataCourses, coursesFilter, setCoursesFilter, setIsLoadingCourses,setLengthCourses} = useCourses()

    const [teachersData, setTeachersData] = useState([])
    const [isExpanded, setIsExpanded] = useState(false)
    const [isLoading,setIsLoading] = useState(false)

    //limit teachers data 
    const visibleTeachers = isExpanded ? teachersData : teachersData.slice(0, 4)

    //get all teacher
    useEffect(() => {
        const fetchTeachers = async () => {

            setIsLoading(true)
            try {
                
                const data = await getTeachers()

                setTeachersData(data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchTeachers()
    },[])
    //

    //handle check input radio
    const handleCheckInput = async (id) => {
        if (id === coursesFilter.teacherId) return

        setCoursesFilter(prev => ({
            ...prev,
            teacherId: id
        }))

        setIsLoadingCourses(true)

        try {
            const filter = {...coursesFilter, teacherId: id}
            const data = await getCoursesFilter(filter)
            setDataCourses(data)
            setLengthCourses(data.length)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoadingCourses(false)
        }
    }

  return (
    <FilterBox
        title={'Giáo viên'}
        isExpanded = {isExpanded}
        isVisibleData={teachersData?.length > 4}
        onSetIsExpanded={setIsExpanded}
        isLoading={isLoading}
    >
        <div className='filter-courses-box-list'>
            {visibleTeachers?.map(teacher => {
                return (
                    <div className='filter-courses-box-item'
                        key={teacher.id}
                        onClick={() => handleCheckInput(teacher.id)}
                    >
                        <InputCheck
                            type={'radio'}
                            isChecked ={teacher.id === coursesFilter.teacherId}
                            text={teacher.name}                       
                        />
                    </div>
                )
            })}
        </div>
    </FilterBox>
  )
}

export default FilterTeachers
