import { useEffect, useRef, useState } from 'react'

import { useCourses } from '../context/CourseContext'
import { getCoursesFilter } from '../services/CoursesSevices'

const SearchCourses = () => {
  const {
    setDataCourses,
    coursesFilter,
    setCoursesFilter,
    setIsLoadingCourses,
    setLengthCourses,
  } = useCourses()

  const [isLoading, setIsLoading] = useState(false)
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [searchHistory, setSearchHistory] = useState([])

  const inputRef = useRef()
  const STORAGE_KEY = 'searchCoursesHistory'

  // Load search history from localStorage
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    setSearchHistory(history)
  }, [])

  // handle change value
  const handleChangeValue = (e) => {
    const cleaned = e.target.value
      .replace(/^\s+/, '')
      .replace(/\s{2,}/g, ' ')

    setCoursesFilter(prev => ({
      ...prev,
      name: cleaned
    }))
  }

  // handle clear text
  const handleClearText = () => {
    setCoursesFilter(prev => ({ ...prev, name: '' }))
    inputRef.current.focus()
  }

  // handle search course
  const handleSearchCourses = async (searchText = coursesFilter.name) => {
    const searchValue = (typeof searchText === 'string' ? searchText.trim() : '')

    // UI loading
    setIsLoading(true)
    setIsLoadingCourses(true)
    inputRef.current.blur()

    try {
      const filter = { ...coursesFilter, name: searchValue }
      const res = await getCoursesFilter(filter)

      setDataCourses(res)
      setLengthCourses(res?.data?.length || 0)
    } catch (error) {
      setDataCourses(error)
      setLengthCourses(0)
    } finally {
      setIsLoading(false)
      setIsLoadingCourses(false)
    }

    // Save to history
    if (!searchValue) return

    const history = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    const updated = [searchValue, ...history.filter(item => item !== searchValue)].slice(0, 10)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setSearchHistory(updated)
  }

  //handle delete history search
  const handleDeleteHistoryItem = (e, itemDelete) => {
    e.stopPropagation()
    const updated = searchHistory.filter(item => item !== itemDelete)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setSearchHistory(updated)
  }

  //handle clear all history search
  const handleClearAllHistory = () => {
    localStorage.removeItem(STORAGE_KEY)
    setSearchHistory([])
  }

  return (
    <div className='search-courses-wrapper'>
      <div className='search-courses-inner'>
        <div className='search-courses-input'>
          <input
            ref={inputRef}
            placeholder='Tìm kiếm tên khóa học...'
            value={coursesFilter?.name || ''}
            onChange={handleChangeValue}
            onFocus={() => setIsShowMenu(true)}
            onBlur={() => setIsShowMenu(false)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchCourses()}
          />
          {isLoading && (
            <span className='search-courses-input-load'>
              <i className="fa-solid fa-spinner"></i>
            </span>
          )}
          {coursesFilter?.name && !isLoading && (
            <span className='search-courses-input-clear' onClick={handleClearText}>
              <i className="fa-solid fa-xmark"></i>
            </span>
          )}
        </div>
        <div className='search-courses-btn' onClick={() => handleSearchCourses()}>
          <span>
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
        </div>
      </div>

      {searchHistory?.length > 0 && isShowMenu && (
        <div
          className='search-courses-history-wrapper'
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className='search-courses-history-title'>
            <h1>Lịch sử tìm kiếm</h1>
            <span onClick={handleClearAllHistory}>Xóa</span>
          </div>
          <div className='search-courses-history-menu'>
            {searchHistory.map((item, i) => (
              <div
                className='search-courses-history-menu-item'
                key={i}
                onClick={() => {
                  setCoursesFilter(prev => ({ ...prev, name: item }))
                  handleSearchCourses(item)
                }}
              >
                <p>{item}</p>
                <span onClick={(e) => handleDeleteHistoryItem(e, item)}>
                  <i className="fa-solid fa-trash-can"></i>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchCourses
