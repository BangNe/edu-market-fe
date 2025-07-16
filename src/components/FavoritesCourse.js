import { useEffect, useState } from 'react'

import { getFavoritesCourses } from '../services/CoursesSevices'

import CourseCartLoad from './CourseCardLoad'
import CoursesCard from './CourseCard'
import Pagination from './Pagination'

const FavoritesCourse = () => {
  const [coursesId, setCoursesId] = useState([])
  const [courses, setCourses] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const FAVORITES_KEY = 'favoriteCourses'

  // Get ID courses from localStorage
  useEffect(() => {
    const handleGetFavorites = () => {
      const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || []
      setCoursesId(favorites)
    }

    handleGetFavorites()

    window.addEventListener('favoritesChanged', handleGetFavorites)
    window.addEventListener('storage', handleGetFavorites)

    return () => {
      window.removeEventListener('favoritesChanged', handleGetFavorites)
      window.removeEventListener('storage', handleGetFavorites)
    }
  }, [])

  // Fetch favorite courses
  useEffect(() => {
    if (!Array.isArray(coursesId)) return

    const fetchCourses = async () => {
      setIsLoading(true)
      try {
        const data = await getFavoritesCourses(coursesId)
        setCourses(data)
      } catch (error) {
        setCourses(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [coursesId])

  return (
    <div className='favorites-course-wrapper'>
        {isLoading ? (
        <div className='favorites-course-inner-wrapper'>
            <div className='favorites-course-inner-cart'>
            <CourseCartLoad />
            </div>
        </div>
        ) : !courses?.isSuccess || !courses?.data?.length ? (
        <div className='favorites-course-no-data'>
            <span>
            <i className='fa-solid fa-inbox'></i>
            </span>
            <p>{courses?.message || 'Không có sản phẩm yêu thích'}</p>
        </div>
        ) : (
        <div className='favorites-course-inner-wrapper'>
            <Pagination data={courses?.data} quantity={8}>
            {(currentData) => (
                <div className='favorites-course-inner'>
                {currentData.map((course) => (
                    <div className='favorites-course-inner-cart' key={course.id}>
                    <CoursesCard course={course} />
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

export default FavoritesCourse
