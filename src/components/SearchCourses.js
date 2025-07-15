import { useEffect, useRef, useState } from 'react'

import { useCourses } from '../context/CourseContext'
import { getCoursesFilter } from '../services/CoursesSevices'

const SearchCourses = () => {

    const {setDataCourses, coursesFilter, setCoursesFilter, setIsLoadingCourses,setLengthCourses} = useCourses()

    const [isLoading, setIsLoading] = useState(false)
    const [isShowMenu,setIsShowMenu] = useState(false)
    const [searchHistory, setSearchHistory] = useState([])

    const inputRef = useRef()

    //get localStorage
    useEffect(() => {
        const historySearchLocal = JSON.parse(
            localStorage.getItem('searchCoursesHistory')
        ) || []

        setSearchHistory(historySearchLocal)
    },[])

    //handle change value search
    const handleChangeValue = (e) => {
        const raw = e.target.value

        const cleaned = raw
            .replace(/^\s+/, '')
            .replace(/\s{2,}/g, ' ')

        setCoursesFilter(prev => ({
            ...prev,
            name: cleaned
        }))

    }
    //

    //handle clear text
    const handleClearText = () => {

        setCoursesFilter(prev => ({
            ...prev,
            name: ''
        }))

        inputRef.current.focus()
    }
    //

    //handle search courses
    const handleSearchCourses = async (searchText = coursesFilter.name) => {

        const searchValueFormat = (typeof searchText === 'string' ? searchText.trim() : '')
        
        setIsLoading(true)
        setIsLoadingCourses(true)

        //blur input
        inputRef.current.blur()

        try {
            //get courses filter
            const filter = { ...coursesFilter, name: searchValueFormat }
            const data = await getCoursesFilter(filter)

            setDataCourses(data)
            setLengthCourses(data.length)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
            setIsLoadingCourses(false)
        }

        if(!searchValueFormat) {
            //blur input
            inputRef.current.blur()
            return
        }

        //key localStorage
        const storageKey = 'searchCoursesHistory'

        //get localStorage
        const history = JSON.parse(localStorage.getItem(storageKey)) || []

        //update localStorage
        const filtered = history.filter((item) => item !== searchValueFormat)
        const updated = [searchValueFormat, ...filtered]

        //limit array
        const limited = updated.slice(0, 10)

        //set localStorage
        localStorage.setItem(storageKey, JSON.stringify(limited))

        //update setSearchHistory
        setSearchHistory(limited)

    }

    //handle delete history
    const handleDeleteHistoryItem = (e,itemDelete) => {
        e.stopPropagation()

        const storageKey = 'searchCoursesHistory'

        // get localStorage
        const history = JSON.parse(localStorage.getItem(storageKey)) || []

        // delete item
        const updated = history.filter(item => item !== itemDelete)

        // set localStorage
        localStorage.setItem(storageKey, JSON.stringify(updated))

        // update setSearchHistory
        setSearchHistory(updated)
    }

    //handle clear all history
    const handleClearAllHistory = () => {

        //remove localStorage
        localStorage.removeItem('searchCoursesHistory')
        
        //update setSearchHistory
        setSearchHistory([])
    }

  return (
    <div className='search-courses-wrapper'>
        <div className='search-courses-inner'>
            <div className='search-courses-input'>
                <input
                    placeholder='tiềm kiếm tên khóa học...'
                    ref={inputRef}
                    value={coursesFilter.name || ''}
                    onChange={(e) => handleChangeValue(e)}
                    onFocus={() => setIsShowMenu(true)}
                    onBlur={() => setIsShowMenu(false)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearchCourses()
                        }
                    }}
                />
                {isLoading &&
                    <span className='search-courses-input-load'>
                        <i className="fa-solid fa-spinner"></i>
                    </span>
                }
                {coursesFilter.name && !isLoading &&
                    <span className='search-courses-input-clear'
                        onClick={handleClearText}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </span>
                }
            </div>
            <div className='search-courses-btn'
                onClick={() => handleSearchCourses()}
            >
                <span>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </span>
            </div>
        </div>
        {searchHistory.length > 0 && isShowMenu &&
            <div className='search-courses-history-wrapper'
                onMouseDown={(e) => {
                    e.preventDefault()
                }}
            >
                <div className='search-courses-history-title'>
                    <h1>Lịch sử tìm kiếm</h1>
                    <span
                        onClick={handleClearAllHistory}
                    >
                        Xóa
                    </span>
                </div>
                <div className='search-courses-history-menu'>
                    {searchHistory.map((item,i) => {
                        return (
                            <div className='search-courses-history-menu-item'
                                key={i}
                                onClick={() => {
                                    setCoursesFilter(prev => ({
                                        ...prev,
                                        name: item
                                    }))

                                    handleSearchCourses(item)
                                }}
                            >
                                <p>{item}</p>
                                <span
                                onClick={(e) => handleDeleteHistoryItem(e,item)}
                                >
                                    <i className="fa-solid fa-trash-can"></i>
                                </span>
                            </div>
                        )
                    })
                    }
                    
                </div>
            </div>
        }
    </div>
  )
}

export default SearchCourses
