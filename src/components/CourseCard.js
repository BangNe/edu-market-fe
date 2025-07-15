
import { useState, useEffect } from 'react'

import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { Link } from 'react-router-dom'

dayjs.extend(duration)

const CoursesCard = ({course}) => {

  const [isFav, setIsFav] = useState(false)

  const FAVORITES_KEY = 'favoriteCourses'

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || []
    setIsFav(favorites.includes(course.id))
  }, [course.id])


  //formart time from second to hours
  const formatTimeLesson = (seconds) => {
    const timeObj = dayjs.duration(seconds, 'seconds')

    const day = timeObj.days()
    const hours = timeObj.hours()
    const minutes = timeObj.minutes()
    const second = timeObj.seconds()

    if (day > 0) return `${day}d ${hours}h ${minutes}m`
    if (hours > 0) return `${hours}h ${minutes}m`
    if (minutes > 0) return `${minutes}m ${second}s`
    if (second > 0) return `${second}s`
  }

  //format to style vnd
  const formatToVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount)
  }
  //

  //handle Click Favious
  const handleClickFavious = (e) => {
    e.preventDefault()
    let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || []

    if (favorites.includes(course.id)) {
      favorites = favorites.filter(id => id !== course.id)
      setIsFav(false)
    } else {
      favorites.push(course.id)
      setIsFav(true)
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }
  //

  return (
    <Link className='course-card-wrapper'
      to={'/'}
    >
      <div className="left-rip"></div>
      <div className="right-rip"></div>
      <div className={`course-card-favious ${isFav ? 'active' : ''}`}
        onClick={(e) => handleClickFavious(e)}
      > 
        {isFav 
        ? <i className="fa-solid fa-heart"></i>
        : <i className="fa-regular fa-heart"></i>
        }
      </div>
      <div className='course-card-inner'>
        <div className='course-card-box'>
          <div className='course-card-img'>
            <img src={course?.image}/>
          </div>
          <div className='course-card-info-wrapper'>
            <h1 className='course-card-name'>
              {course?.name}
            </h1>
            <div className='course-card-info'>
              <div className='course-card-info-item'>
                <span>
                  <i className="fa-regular fa-file-lines"></i>
                </span>
                <p>
                  {course.category}
                </p>
              </div>
              <div className='course-card-info-item'>
                <span>
                  <i className="fa-solid fa-graduation-cap"></i>
                </span>
                <p>
                  {`lớp ${course.grade}`}
                </p>
              </div>
            </div>
            <div className='course-card-info-item'>
              <span>
                <i className="fa-regular fa-user"></i>
              </span>
              <p>
                {course.teacher}
              </p>
            </div>
            <div className='course-card-info-item'>
              <span>
                <i className="fa-regular fa-clock"></i>
              </span>
              <p>
                {`${course.lessonsCount} bài học - ${formatTimeLesson(course.durationTime)}`}
              </p>
            </div>
            <div className='course-card-info'>
              <div className='course-card-info-item'>
                <span>
                  <i className="fa-regular fa-star"></i>
                </span>
                <p>
                  {`${course.rating.toFixed(1)}/5.0`}
                </p>
              </div>
              <div className='course-card-info-item'>
                <span>
                  <i className="fa-solid fa-cart-shopping"></i>
                </span>
                <p>
                  {`${course.enrollment} lượt mua`}
                </p>
              </div>
            </div>
            <p className='course-card-decs'>
              {course?.description}
            </p>
          </div>
        </div>
        <div className='course-card-price-wrapper'>
          <div className='course-card-price'>
            <span>
              {formatToVND(course.price)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CoursesCard
