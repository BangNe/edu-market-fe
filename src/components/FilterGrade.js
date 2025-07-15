import { useEffect, useState } from 'react'

import {getGrades} from '../services/GradesSevices'
import { getCoursesFilter } from '../services/CoursesSevices'
import { useCourses } from '../context/CourseContext'

import FilterBox from './FilterBox'
import InputCheck from './InputCheck'

const FilterGrade = () => {
    
  const {setDataCourses, coursesFilter, setCoursesFilter, setIsLoadingCourses,setLengthCourses} = useCourses()

  const [dataGrades, setDataGrades] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded,setIsExpanded] = useState(false)

  const visibleData = isExpanded ? dataGrades : dataGrades.slice(0, 4)

  //get all grades data
  useEffect(() => {
    const fetchGrades =  async () => {

        setIsLoading(true)
        try {
            const data = await getGrades()
            setDataGrades(data)

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    fetchGrades()
  },[])
  //

  //handle check input radio
  const handleCheckInput = async (id) => {
    if (coursesFilter.grade === id) return

    setCoursesFilter(prev => ({
        ...prev,
        grade : id
    }))

    setIsLoadingCourses(true)

    try {
        const filtered = {...coursesFilter, grade : id}
        const data = await getCoursesFilter(filtered)
        setDataCourses(data)
        setLengthCourses(data.length)
    } catch (error) {
        console.log(error)
    } finally {
        setIsLoadingCourses(false)
    }
  }
  //

  return (
    <FilterBox
        title={'Lớp'}
        isExpanded ={isExpanded}
        isVisibleData = {dataGrades?.length > 4}
        onSetIsExpanded = {setIsExpanded}
        isLoading = {isLoading}
    >
      <div className='filter-courses-box-list'>
        {visibleData?.map(grade => {
            return (
                <div className='filter-courses-box-item'
                    key={grade.id}
                    onClick={() => handleCheckInput(grade.id)}
                >
                    <InputCheck
                        type={'radio'}
                        isChecked={coursesFilter.grade === grade.id}
                        text={grade.name}
                    />
                </div>
            )
        })}
      </div>
    </FilterBox>
  )
}

export default FilterGrade
