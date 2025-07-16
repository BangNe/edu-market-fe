import { useEffect, useState } from 'react'

import { getCategories } from '../services/CategoriesSevices'
import { getCoursesFilter } from '../services/CoursesSevices'
import { useCourses } from '../context/CourseContext'

import FilterBox from './FilterBox'
import InputCheck from './InputCheck'

const FilterCategories = () => {
  const {
    setDataCourses,
    coursesFilter,
    setCoursesFilter,
    setIsLoadingCourses,
    setLengthCourses
  } = useCourses()

  const [categoriesRes, setCategoriesRes] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const visibleData = isExpanded
    ? categoriesRes?.data || []
    : (categoriesRes?.data || []).slice(0, 9)

  // get all categories
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true)
      try {
        const res = await getCategories()
        setCategoriesRes(res)
      } catch (error) {
        setCategoriesRes(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // handle category checkbox
  const handleCheckCategory = async (id) => {
    const checked = coursesFilter?.categoryId?.includes(id)
    const filtered = checked
      ? coursesFilter.categoryId.filter(item => item !== id)
      : [...coursesFilter.categoryId, id]

    const updatedFilter = { ...coursesFilter, categoryId: filtered }

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
      title="Môn học"
      isExpanded={isExpanded}
      isVisibleData={categoriesRes?.data?.length > 9}
      onSetIsExpanded={setIsExpanded}
      isLoading={isLoading}
    >
      {categoriesRes?.isSuccess && visibleData.length > 0 && (
        <div className="filter-courses-box-list-category">
          {visibleData.map((category) => (
            <div
              className="filter-courses-box-item"
              key={category.id}
              onClick={() => handleCheckCategory(category.id)}
            >
              <InputCheck
                type="checkbox"
                isChecked={coursesFilter.categoryId.includes(category.id)}
                text={category.name}
              />
            </div>
          ))}
        </div>
      )}
    </FilterBox>
  )
}

export default FilterCategories
