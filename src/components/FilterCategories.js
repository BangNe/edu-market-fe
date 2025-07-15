import { useEffect, useState } from 'react'

import {getCategories} from '../services/CategoriesSevices'
import { getCoursesFilter } from '../services/CoursesSevices'
import { useCourses } from '../context/CourseContext'

import FilterBox from './FilterBox'
import InputCheck from './InputCheck'

const FilterCategories = () => {

  const {setDataCourses, coursesFilter, setCoursesFilter, setIsLoadingCourses,setLengthCourses} = useCourses()

  const [dataCategories, setDataCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded,setIsExpanded] = useState(false)

  const visibleData = isExpanded ? dataCategories : dataCategories.slice(0, 9)

  //get all categories data
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true)

      try {
        const data = await getCategories()

        setDataCategories(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  },[])
  //

  //handle check input checkkbox category
  const handleCheckCategory = async (id) => {
    const checked = coursesFilter?.categoryId?.includes(id)
    
    const filtered = checked 
    ? coursesFilter?.categoryId?.filter(item => item !== id)
    : [...coursesFilter?.categoryId, id]

    setCoursesFilter(prev => ({
      ...prev,
      categoryId : filtered
    }))

    setIsLoadingCourses(true) 

    try {
      const filterObj = {...coursesFilter,categoryId : filtered}
      const data = await getCoursesFilter(filterObj)
      setDataCourses(data)
      setLengthCourses(data.length)
    } catch (error) {
      
    } finally {
      setIsLoadingCourses(false)
    }
  }
  //

  return (
    <FilterBox
      title={'Môn học'}
      isExpanded={isExpanded}
      isVisibleData={dataCategories.length > 9}
      onSetIsExpanded={setIsExpanded}
      isLoading={isLoading}
    >
      <div className='filter-courses-box-list-category'>
        {visibleData?.map(category => {
          return (
            <div className='filter-courses-box-item'
              key={category.id}
              onClick={() => handleCheckCategory(category.id)}
            >
              <InputCheck
                type={'checkbox'}
                isChecked={coursesFilter?.categoryId.includes(category.id)}
                text={category.name}
              />
            </div>
          )
        })}
        
      </div>
    </FilterBox>
  )
}

export default FilterCategories
