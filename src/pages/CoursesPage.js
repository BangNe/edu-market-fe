import { useEffect, useRef, useState } from 'react'

import { useCourses } from '../context/CourseContext'
import useClickOutside from '../hooks/useClickOutside'
import { getMinMaxCoursePrice, getCoursesFilter } from '../services/CoursesSevices'

import MainLayout from '../layout/MainLayout'
import FilterCourses from '../components/FilterCourses'
import CoursesList from '../components/CoursesList'

const CoursesPage = () => {
  const {
    setDataCourses,
    coursesFilter,
    setCoursesFilter,
    setIsLoadingCourses,
    lengthCourses,
    setLengthCourses,
    skipFetchPriceRange,
  } = useCourses()

  const [priceRangeRes, setPriceRangeRes] = useState(null)
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [isShowFilter, setIsShowFilter] = useState(false)
  const sortMenuRef = useRef()

  const listSort = [
    { id: 0, type: 0, text: 'Mới nhất' },
    { id: 1, type: 1, text: 'Đánh giá' },
    { id: 2, type: 2, text: 'Lượt mua' },
  ]

  const priceRange = priceRangeRes?.data || {}

  // Fetch price range
  useEffect(() => {
    const fetchPriceRange = async () => {
      try {
        const res = await getMinMaxCoursePrice()
        setPriceRangeRes(res)
      } catch (error) {
        setPriceRangeRes(error)
      }
    }

    fetchPriceRange()
  }, [])

  // No scroll on mobile/tablet when filter opened
  useEffect(() => {
    const isTablet = window.innerWidth <= 1023
    if (isShowFilter && isTablet) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }

    return () => document.body.classList.remove('no-scroll')
  }, [isShowFilter])

  // Close sort menu on outside click
  useClickOutside(sortMenuRef, () => setIsShowMenu(false))

  // Handle clear all filters
  const handleClearFilter = async () => {
    if (
      coursesFilter.teacherId === null &&
      coursesFilter.grade === null &&
      coursesFilter.categoryId.length === 0 &&
      coursesFilter.minPrice === priceRange.minPrice &&
      coursesFilter.maxPrice === priceRange.maxPrice
    )
      return

    skipFetchPriceRange.current = true

    const clearedFilter = {
      ...coursesFilter,
      teacherId: null,
      grade: null,
      categoryId: [],
      minPrice: priceRange.minPrice,
      maxPrice: priceRange.maxPrice,
    }

    setCoursesFilter(clearedFilter)
    setIsLoadingCourses(true)

    try {
      const res = await getCoursesFilter(clearedFilter)
      setDataCourses(res)
      setLengthCourses(res?.data?.length || 0)
    } catch (error) {
      setDataCourses(error)
      setLengthCourses(0)
    } finally {
      setIsLoadingCourses(false)
    }
  }

  // Handle sort selection
  const handleClickSort = async (item) => {
    if (item.type === coursesFilter.sort.type) {
      setIsShowMenu(false)
      return
    }

    const newFilter = {
      ...coursesFilter,
      sort: { type: item.type, name: item.text },
    }

    setCoursesFilter(newFilter)
    setIsLoadingCourses(true)
    setIsShowMenu(false)

    try {
      const res = await getCoursesFilter(newFilter)
      setDataCourses(res)
      setLengthCourses(res?.data?.length || 0)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoadingCourses(false)
    }
  }

  const shouldShowClearFilter =
    coursesFilter.teacherId !== null ||
    coursesFilter.grade !== null ||
    coursesFilter.categoryId.length > 0 ||
    coursesFilter.minPrice !== priceRange.minPrice ||
    coursesFilter.maxPrice !== priceRange.maxPrice

  return (
    <MainLayout>
      <div className='courses-page-wrapper'>
        <div className='courses-page-inner'>
          <div className='courses-page-top'>
            <div className='courses-page-top-filter'>
              <div
                className='courses-page-top-filter-btn'
                onClick={() => setIsShowFilter(true)}
              >
                <span>
                  <i className='fa-solid fa-filter'></i>
                </span>
                <h5>Filter</h5>
              </div>

              <div className='courses-page-top-filter-sort' ref={sortMenuRef}>
                <div
                  className='courses-page-top-filter-sort-box'
                  onClick={() => setIsShowMenu((prev) => !prev)}
                >
                  <p className='courses-page-top-filter-sort-text'>
                    Sort by : <span>{coursesFilter?.sort?.name}</span>
                  </p>
                  <span className='courses-page-top-filter-sort-icon'>
                    <i className='fa-solid fa-angle-down'></i>
                  </span>
                </div>
                {isShowMenu && (
                  <div className='courses-page-top-filter-sort-menu'>
                    {listSort.map((item) => (
                      <div
                        key={item.id}
                        className={`courses-page-top-filter-sort-item ${
                          coursesFilter.sort.type === item.type ? 'active' : ''
                        }`}
                        onClick={() => handleClickSort(item)}
                      >
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {shouldShowClearFilter && (
                <div
                  className='courses-page-top-filter-clear'
                  onClick={handleClearFilter}
                >
                  <span>
                    <i className='fa-solid fa-xmark'></i>
                  </span>
                  <p>Clear Filter</p>
                </div>
              )}
            </div>

            {lengthCourses > 0 && (
              <p className='courses-page-top-results'>
                {`${new Intl.NumberFormat('vi-VN').format(lengthCourses)} kết quả`}
              </p>
            )}
          </div>

          <div className='courses-page-content'>
            <div
              className={`courses-page-content-filter ${
                isShowFilter ? 'show' : ''
              }`}
            >
              <FilterCourses
                onSetIsShowFilter={setIsShowFilter}
                isShowFilter={isShowFilter}
              />
            </div>
            <CoursesList />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default CoursesPage
