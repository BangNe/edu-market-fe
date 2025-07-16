import { useEffect, useState } from 'react'

import { getGrades } from '../services/GradesSevices'
import { getCoursesFilter } from '../services/CoursesSevices'
import { useCourses } from '../context/CourseContext'

import FilterBox from './FilterBox'
import InputCheck from './InputCheck'

const FilterGrade = () => {
  const {
    setDataCourses,
    coursesFilter,
    setCoursesFilter,
    setIsLoadingCourses,
    setLengthCourses,
  } = useCourses()

  const [gradesRes, setGradesRes] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const visibleData = isExpanded
    ? gradesRes?.data || []
    : (gradesRes?.data || []).slice(0, 4)

  // fetch all grades
  useEffect(() => {
    const fetchGrades = async () => {
      setIsLoading(true)
      try {
        const res = await getGrades()
        setGradesRes(res)
      } catch (error) {
        setGradesRes(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGrades()
  }, [])

  // handle select grade (radio)
  const handleCheckInput = async (id) => {
    if (coursesFilter.grade === id) return

    const updatedFilter = { ...coursesFilter, grade: id }
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
      title="Lớp"
      isExpanded={isExpanded}
      isVisibleData={gradesRes?.data?.length > 4}
      onSetIsExpanded={setIsExpanded}
      isLoading={isLoading}
    >
      {gradesRes?.isSuccess && visibleData.length > 0 && (
        <div className="filter-courses-box-list">
          {visibleData.map((grade) => (
            <div
              className="filter-courses-box-item"
              key={grade.id}
              onClick={() => handleCheckInput(grade.id)}
            >
              <InputCheck
                type="radio"
                isChecked={coursesFilter.grade === grade.id}
                text={grade.name}
              />
            </div>
          ))}
        </div>
      )}
    </FilterBox>
  )
}

export default FilterGrade
