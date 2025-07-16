import { useEffect } from 'react'

import { getCoursesFilter } from '../services/CoursesSevices'
import { useCourses } from '../context/CourseContext'

import Pagination from './Pagination'
import SearchCourses from './SearchCourses'
import CourseCard from './CourseCard'
import CourseCartLoad from './CourseCardLoad'

const CoursesList = () => {
  const {
    dataCourses,
    setDataCourses,
    coursesFilter,
    isLoadingCourses,
    setIsLoadingCourses,
    setLengthCourses,
  } = useCourses()

  //get courses
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoadingCourses(true)
      try {
        const res = await getCoursesFilter(coursesFilter)
        setDataCourses(res)
        setLengthCourses(res?.data?.length || 0)
      } catch (error) {
        setDataCourses(error)
        setLengthCourses(0)
      } finally {
        setIsLoadingCourses(false)
      }
    }

    fetchCourses()
  }, [])

  return (
    <div className='courses-list-wrapper'>
      <div className='courses-list-search'>
        <SearchCourses />
      </div>

      {isLoadingCourses ? (
        <div className='courses-list-inner'>
          <CourseCartLoad />
        </div>
      ) : !dataCourses?.isSuccess || !dataCourses?.data?.length ? (
        <div className='courses-list-no-data-wrapper'>
          <span><i className="fa-solid fa-inbox"></i></span>
          <p>{dataCourses?.message || 'Không tìm thấy kết quả ...'}</p>
        </div>
      ) : (
        <div className='courses-list-inner-wrapper'>
          <Pagination data={dataCourses?.data} quantity={6}>
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
        </div>
      )}
    </div>
  )
}

export default CoursesList
