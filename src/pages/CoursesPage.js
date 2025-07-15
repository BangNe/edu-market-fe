import { useEffect, useRef, useState } from 'react'

import { useCourses } from '../context/CourseContext'
import useClickOutside from '../hooks/useClickOutside'
import { getMinMaxCoursePrice,getCoursesFilter } from '../services/CoursesSevices'

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
    skipFetchPriceRange
  } = useCourses()

  const [priceRange, setPriceRange] = useState({})
  const [isShowMenu, setIsShowMenu] = useState(false)

  const [isShowFilter, setIsShowFilter] = useState(false)

  const sortMenuRef = useRef()

  const listSort = [
    {
      id : 0,
      type : 0,
      text : 'Mới nhất'
    },
        {
      id : 1,
      type : 1,
      text : 'Đánh giá'
    },
        {
      id : 2,
      type : 2,
      text : 'Lượt mua'
    }
  ]

  //get price range
  useEffect(() => {
    const fetchPriceRange = async () => {
      try {
        const data = await getMinMaxCoursePrice()

        setPriceRange(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPriceRange()
  },[])
  //

  // no scroll when show filter courses (tablet and mobile)
  useEffect(() => {
    const isTablet = window.innerWidth <= 1023

    if (isShowFilter && isTablet) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }

    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [isShowFilter])
  //

  //click out side sort
  useClickOutside(sortMenuRef, () => {
    setIsShowMenu(false)
  })
  //

  //handle clear filter
  const handleClearFilter = async () => {
    if (
      coursesFilter.teacherId === null
      && coursesFilter.grade === null
      && coursesFilter.categoryId.length === 0
      && coursesFilter.minPrice === priceRange.minPrice
      && coursesFilter.maxPrice === priceRange.maxPrice
    ) return

    skipFetchPriceRange.current = true

    setCoursesFilter(prev => ({
      ...prev,
      teacherId: null,
      grade: null,
      categoryId: [],
      minPrice: priceRange.minPrice,
      maxPrice: priceRange.maxPrice,
    }))

    setIsLoadingCourses(true)

    try {
      const filtered = {
        ...coursesFilter,
        teacherId: null,
        grade: null,
        categoryId: [],
        minPrice: priceRange.minPrice,
        maxPrice: priceRange.maxPrice,
      }

      const data = await getCoursesFilter(filtered)
      setDataCourses(data)
      setLengthCourses(data.length)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingCourses(false)
    }
  }
  //

  //handle click sort 
  const handleClickSort = async (item) => {
    if (item.type === coursesFilter.sort.type) {
      setIsShowMenu(false)
      return
    }

    setCoursesFilter(prev => ({
      ...prev,
      sort : {
        type : item.type,
        name : item.text
      }
    }))

    setIsLoadingCourses(true)
    setIsShowMenu(false)

    try {
      const filtered = {
        ...coursesFilter,
        sort : {
          type : item.type,
          name : item.text
        }
      }
      
      const data = await getCoursesFilter(filtered)
      setDataCourses(data)
      setLengthCourses(data.length)

    } catch (error) {
      console.log('')
    } finally {
      setIsLoadingCourses(false)
    }
  }

  return (
    <MainLayout>
        <div className='courses-page-wrapper'>
          <div className='courses-page-inner'>
            <div className='courses-page-top'>
              <div className='courses-page-top-filter'>
                <div className='courses-page-top-filter-btn'
                  onClick={() => setIsShowFilter(true)}
                >
                  <span>
                    <i className="fa-solid fa-filter"></i>
                  </span>
                  <h5>Filter</h5>
                </div>
                <div className='courses-page-top-filter-sort'
                  ref={sortMenuRef}
                >
                  <div className='courses-page-top-filter-sort-box'
                    onClick={() => setIsShowMenu(prev => !prev)}
                  >
                    <p className='courses-page-top-filter-sort-text'>
                      Sort by : <span>{coursesFilter?.sort?.name}</span>
                    </p>
                    <span className='courses-page-top-filter-sort-icon'>
                      <i className="fa-solid fa-angle-down"></i>
                    </span>
                  </div>
                  {isShowMenu &&
                    <div className='courses-page-top-filter-sort-menu'>
                      {listSort?.map(item => {
                        return(
                          <div className={`courses-page-top-filter-sort-item 
                            ${coursesFilter?.sort?.type === item.type ? 'active' : ''}`}
                            key={item.id}
                            onClick={() => handleClickSort(item)}
                          >
                            <span>{item.text}</span>
                          </div>
                        )
                      })
                      }
                    </div>
                  }
                </div>
                { (coursesFilter.teacherId !== null
                  || coursesFilter.grade !== null
                  || coursesFilter.categoryId.length !== 0
                  || coursesFilter.minPrice !== priceRange.minPrice
                  || coursesFilter.maxPrice !== priceRange.maxPrice)
                  &&  <div className='courses-page-top-filter-clear'
                        onClick={() => handleClearFilter()}
                      >
                        <span>
                          <i className="fa-solid fa-xmark"></i>
                        </span>
                        <p>Clear Filter</p>
                      </div>
                }
                
              </div>
              {lengthCourses > 0 &&
                <p className='courses-page-top-results'>
                  {`${new Intl.NumberFormat('vi-VN').format(lengthCourses)} kết quả`}
                </p>
              }
            </div>
            <div className='courses-page-content'>
              <div className={`courses-page-content-filter ${isShowFilter ? 'show' : ''}`}>
                <FilterCourses
                  onSetIsShowFilter = {setIsShowFilter}
                  isShowFilter = {isShowFilter}
                />
              </div>
              <CoursesList/>
            </div>
          </div>
        </div>
    </MainLayout>
  )
}

export default CoursesPage
