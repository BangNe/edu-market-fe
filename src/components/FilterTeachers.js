import { useEffect, useState } from 'react'

import { getTeachers } from '../services/TeachersSevices'
import { getCoursesFilter } from '../services/CoursesSevices'
import { useCourses } from '../context/CourseContext'

import FilterBox from './FilterBox'
import InputCheck from './InputCheck'

const FilterTeachers = () => {
  const {
    setDataCourses,
    coursesFilter,
    setCoursesFilter,
    setIsLoadingCourses,
    setLengthCourses,
  } = useCourses()

  const [teachersRes, setTeachersRes] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const visibleTeachers = isExpanded
    ? teachersRes?.data || []
    : (teachersRes?.data || []).slice(0, 4)

  // Fetch teacher
  useEffect(() => {
    const fetchTeachers = async () => {
      setIsLoading(true)
      try {
        const res = await getTeachers()
        setTeachersRes(res)
      } catch (error) {
        setTeachersRes(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeachers()
  }, [])
  
  // Handle select teacher
  const handleCheckInput = async (id) => {
    if (id === coursesFilter.teacherId) return

    const updatedFilter = { ...coursesFilter, teacherId: id }

    setCoursesFilter(updatedFilter)
    setIsLoadingCourses(true)

    try {
      const res = await getCoursesFilter(updatedFilter)
      setDataCourses(res)
      setLengthCourses(res?.data?.length || 0)
    } catch (error) {
      setDataCourses(error)
      setLengthCourses(0)
    } finally {
      setIsLoadingCourses(false)
    }
  }

  return (
    <FilterBox
      title="Giáo viên"
      isExpanded={isExpanded}
      isVisibleData={teachersRes?.data?.length > 4}
      onSetIsExpanded={setIsExpanded}
      isLoading={isLoading}
    >
      {teachersRes?.isSuccess && visibleTeachers.length > 0 && (
        <div className="filter-courses-box-list">
          {visibleTeachers?.map((teacher) => (
            <div
              className="filter-courses-box-item"
              key={teacher.id}
              onClick={() => handleCheckInput(teacher.id)}
            >
              <InputCheck
                type="radio"
                isChecked={teacher.id === coursesFilter.teacherId}
                text={teacher.name}
              />
            </div>
          ))}
        </div>
      )}
    </FilterBox>
  )
}

export default FilterTeachers
