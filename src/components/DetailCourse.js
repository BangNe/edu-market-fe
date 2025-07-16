import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { getDetailCourse, getCoursesByTags } from '../services/CoursesSevices'
import { getLessonsDetailCourse } from '../services/LessonsSevices'

import CoursesSlide from './CoursesSlide'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('vi')

const DetailCourse = () => {
  const [course, setCourse] = useState(null)
  const [lessons, setLessons] = useState([])
  const [coursesByTags, setCourseByTags] = useState(null)

  const [isLoadingCourse, setIsLoadingCourse] = useState(false)
  const [isLoadingLessons, setIsLoadingLessons] = useState(false)
  const [isShowMoreDecs, setIsShowMoreDecs] = useState(false)

  const { slug } = useParams()

  // Fetch course detail
  useEffect(() => {
    if (!slug) return

    const fetchDetailCourse = async () => {
      setIsLoadingCourse(true)
      try {
        const data = await getDetailCourse(slug)
        setCourse(data)
      } catch (error) {
        setCourse(error)
      } finally {
        setIsLoadingCourse(false)
      }
    }

    fetchDetailCourse()
  }, [slug])

  // Fetch lessons
  useEffect(() => {
    if (!course || !Array.isArray(course.data.lessons) || course.data.lessons.length === 0) return

    const fetchLessons = async () => {
      setIsLoadingLessons(true)
      try {
        const data = await getLessonsDetailCourse(course.data.lessons)
        setLessons(data)
      } catch (error) {
        setLessons(error)
      } finally {
        setIsLoadingLessons(false)
      }
    }

    fetchLessons()
  }, [course])

  // Fetch courses by tags
  useEffect(() => {
    if (!course || !Array.isArray(course.data.tags) || course.data.tags.length === 0) return

    const fetchRelated = async () => {
      try {
        const data = await getCoursesByTags(course.data.tags)
        setCourseByTags(data)
      } catch (error) {
        setCourseByTags(error)
      }
    }

    fetchRelated()
  }, [course])


  // Format time (seconds to readable)
  const formatTimeLesson = (seconds, type = 'default') => {
    const timeObj = dayjs.duration(seconds, 'seconds')
    const day = timeObj.days()
    const hours = timeObj.hours()
    const minutes = timeObj.minutes()
    const second = timeObj.seconds()

    if (type === 'time') {
      if (day > 0) return `${day}d ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
      if (hours > 0) return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
      return `${minutes.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
    }

    if (day > 0) return `${day}d ${hours}h ${minutes}m`
    if (hours > 0) return `${hours}h ${minutes}m`
    if (minutes > 0) return `${minutes}m ${second}s`
    return `${second}s`
  }

  // Format currency VND
  const formatToVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount)
  }

  // Loading course
  if (isLoadingCourse) {
    return (
      <div className='detail-course-wrapper'>
        <div className='detail-course-top-wrapper'>
          <div className='detail-course-top'>
            <div className='detail-course-top-loading'>
              <div className='detail-course-top-loading-name'></div>
              <div className='detail-course-top-loading-decs'></div>
              <div className='detail-course-top-loading-info'></div>
            </div>
            <div className='detail-course-top-box-loading'></div>
          </div>
        </div>
      </div>
    )
  }

  // Course not found
  if (course?.isSuccess === false) {
    return (
      <div className='detail-course-wrapper'>
        <div className='detail-course-inner-no-data'>
          <span>
            <i className='fa-solid fa-inbox'></i>
          </span>
          <p>{course?.message}</p>
        </div>
      </div>
    )
  }

  // Main render
  return (
    <div className='detail-course-wrapper'>
      <div className='detail-course-inner'>
        <div className='detail-course-top-wrapper'>
          <div className='detail-course-top'>
            <div className='detail-course-top-info'>
              <h1 className='detail-course-top-info-name'>{course?.data?.name}</h1>
              <div className='detail-course-top-info-decs'>
                <p className={`detail-course-top-info-decs-text ${isShowMoreDecs ? 'more' : ''}`}>
                  {course?.data?.fullDescription}
                </p>
                <span
                  className='detail-course-top-info-decs-btn'
                  onClick={() => setIsShowMoreDecs((prev) => !prev)}
                >
                  {isShowMoreDecs ? 'Ẩn bớt' : 'Xem thêm'}
                </span>
              </div>
              <div className='detail-course-top-info-bottom'>
                <div className='detail-course-top-info-bottom-item'>
                  <span>
                    <i className='fa-regular fa-user'></i>
                  </span>
                  <h5>{course?.data?.teacher}</h5>
                </div>
                <div className='detail-course-top-info-bottom-item'>
                  <span>
                    <i className='fa-regular fa-star'></i>
                  </span>
                  <h5>{`${course?.data?.rating?.toFixed(1)}/5.0 (${course?.data?.reviewCount} Reviews)`}</h5>
                </div>
                <div className='detail-course-top-info-bottom-item'>
                  <span>
                    <i className='fa-regular fa-clock'></i>
                  </span>
                  <h5>
                    {`Cập nhật lần cuối: ${dayjs(course?.data?.updatedAt).tz(dayjs.tz.guess()).format('DD MMMM, YYYY')}`}
                  </h5>
                </div>
              </div>
            </div>

            <div className='detail-course-top-box'>
              <div className='detail-course-top-box-img'>
                <img src={course?.data?.image} alt='course' />
              </div>
              <div className='detail-course-top-box-bottom'>
                <div className='detail-course-top-box-info-wrapper'>
                  <p className='detail-course-top-box-info-price'>{formatToVND(course?.data?.price)}</p>
                  <div className='detail-course-top-box-info'>
                    <div className='detail-course-top-box-info-item'>
                      <span>
                        <i className='fa-regular fa-file-lines'></i>
                      </span>
                      <p>{course?.data?.category}</p>
                    </div>
                    <div className='detail-course-top-box-info-item'>
                      <span>
                        <i className='fa-solid fa-graduation-cap'></i>
                      </span>
                      <p>{`Lớp ${course?.data?.grade}`}</p>
                    </div>
                  </div>
                  <div className='detail-course-top-box-info-item'>
                    <span>
                      <i className='fa-regular fa-clock'></i>
                    </span>
                    <p>
                      {`${course?.data?.lessons?.length || 0} bài học - ${formatTimeLesson(course?.data?.durationTime || 0)}`}
                    </p>
                  </div>
                  <div className='detail-course-top-box-info-item'>
                    <span>
                      <i className='fa-solid fa-cart-shopping'></i>
                    </span>
                    <p>{`${course?.data?.enrollment} lượt mua`}</p>
                  </div>
                </div>
                <div className='detail-course-top-box-btn'>
                  <span>Mua khóa học</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='detail-course-bottom-wrapper'>
          <div className='detail-course-bottom'>
            <div className='detail-course-bottom-lessons'>
              <h1 className='detail-course-bottom-title'>Danh sách bài học</h1>

              {isLoadingLessons ? (
                <div className='detail-course-bottom-lessons-item-loading'></div>
              ) : lessons?.isSuccess === false ? (
                <div className='detail-course-bottom-lessons-item-empty'>
                  <p>{lessons?.message || 'Không có bài học phù hợp'}</p>
                </div>
              ) : (
                lessons?.data?.map((lesson) => (
                  <div className='detail-course-bottom-lessons-item' key={lesson.id}>
                    <div className='detail-course-bottom-lessons-item-info'>
                      <span>
                        <i className='fa-regular fa-circle-play'></i>
                      </span>
                      <Link>{lesson.name}</Link>
                    </div>
                    <p className='detail-course-bottom-lessons-item-time'>
                      {formatTimeLesson(lesson.duration, 'time')}
                    </p>
                  </div>
                ))
              )}
            </div>
            {!(coursesByTags?.isSuccess === false) && Array.isArray(coursesByTags) && (
              <CoursesSlide
                title="Khóa học tương ứng"
                data={coursesByTags}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailCourse
