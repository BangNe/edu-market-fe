import { useEffect, useState } from 'react'

import { getCoursesFilter } from '../services/CoursesSevices'
import { useCourses } from '../context/CourseContext'

import Pagination from './Pagination'
import SearchCourses from './SearchCourses'
import CourseCard from './CourseCard'
import CourseCartLoad from './CourseCardLoad'

const CoursesList = () => {
  const {dataCourses, setDataCourses, coursesFilter, isLoadingCourses, setIsLoadingCourses,setLengthCourses} = useCourses()

  //get all courses
  useEffect(() => {
    const fetchCourses = async () => {

      setIsLoadingCourses(true)

      try {
        const data = await getCoursesFilter(coursesFilter)

        setDataCourses(data)
        setLengthCourses(data?.length)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoadingCourses(false)
      }
    }

    fetchCourses()
  }, [])

  return (
    <div className='courses-list-wrapper'>
        <div className='courses-list-search'>
            <SearchCourses/>
        </div>

        {isLoadingCourses ? (
          <div className='courses-list-inner'>
            <CourseCartLoad />
          </div>
        ) : dataCourses.length > 0 ? (
          <Pagination data={dataCourses} quantity={6}>
            {(currentData) => (
              <div className='courses-list-inner'>
                {currentData.map((course) => (
                  <div className='courses-list-inner-cart' key={course.id}>
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>
            )}
          </Pagination>
        ) : (
          <div className='courses-list-no-data-wrapper'>
            <span><i className="fa-solid fa-inbox"></i></span>
            <p>Không tìm thấy kết quả ...</p>
          </div>
        )}
    </div>
  )
}

export default CoursesList
