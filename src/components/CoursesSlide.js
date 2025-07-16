import React, { useRef, useState, useEffect } from 'react'
import CourseCard from './CourseCard'

const CoursesSlide = ({ title, data = [] }) => {
    const trackRef = useRef(null)
    const itemRef = useRef(null)

    const [scrollPosition, setScrollPosition] = useState('middle')

    // set scrollPosition
    useEffect(() => {
        const track = trackRef.current
        if (!track) return

        const handleScroll = () => {
            const { scrollLeft, clientWidth, scrollWidth } = track

            if (scrollLeft <= 5) {
              setScrollPosition('first')
            } else if (scrollLeft + clientWidth >= scrollWidth - 5) {
              setScrollPosition('end')
            } else {
              setScrollPosition('middle')
            }
        }

        handleScroll()

        track.addEventListener('scroll', handleScroll)

        return () => {
            track.removeEventListener('scroll', handleScroll)
        }
    }, [data])

    //handle scroll
    const handleScroll = (direction) => {
        const track = trackRef.current
        const item = itemRef.current

        if (!track || !item) return

        const itemWidth = item.offsetWidth

        const scrollAmount = itemWidth + 20

        if (direction === 'next' && scrollPosition !== 'end') {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        }

        if (direction === 'prev' && scrollPosition !== 'first') {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
        }
    }

  return (
    <div className="courses-slide-wrapper">
      <div className="courses-slide-top">
        <h1 className="courses-slide-top-title">{title}</h1>

        <div className="courses-slide-top-btn">
          <div
            className={`courses-slide-top-btn-item ${scrollPosition === 'first' ? 'disabled' : ''}`}
            onClick={() => handleScroll('prev')}
          >
            <span><i className="fa-solid fa-angle-left" /></span>
          </div>
          <div
            className={`courses-slide-top-btn-item ${scrollPosition === 'end' ? 'disabled' : ''}`}
            onClick={() => handleScroll('next')}
          >
            <span><i className="fa-solid fa-angle-right" /></span>
          </div>
        </div>
      </div>

      <div className="courses-slide-box" ref={trackRef}>
        <div className="courses-slide-track">
          {data?.map((course, index) => (
            <div
              className="courses-slide-box-item"
              key={course.id}
              ref={index === 0 ? itemRef : null}
            >
              <CourseCard course={course} 
                style={'norow'}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CoursesSlide
