import { useEffect, useRef, useState } from 'react'

import useDebounce from '../hooks/useDebounce'
import { getMinMaxCoursePrice , getCoursesFilter} from '../services/CoursesSevices'
import { useCourses } from '../context/CourseContext'

const FilterPriceRange =() => {
    const {
        setDataCourses, 
        coursesFilter, 
        setCoursesFilter, 
        setIsLoadingCourses,
        setLengthCourses,
        skipFetchPriceRange
    } = useCourses()

    const [priceRangeCheck, setPriceRangeCheck] = useState({})
    const [minPriceSearch,setMinPriceSearch] = useState('')
    const [maxPriceSearch,setMaxPriceSearch] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [activeThumb, setActiveThumb] = useState(null)  
    
    const sliderPriceInput = useRef(null)
    const minPriceInput = useRef(null)
    const maxPriceInput = useRef(null)
    const isFirstRun = useRef(true)

    const debouncedMinPrice = useDebounce(coursesFilter.minPrice, 500)
    const debouncedMaxPrice = useDebounce(coursesFilter.maxPrice, 500)

    //get api price range
    useEffect(() => {
        
        const fetchPricieRange = async () => {
            setIsLoading(true)

            try {
                const data = await getMinMaxCoursePrice()
                setPriceRangeCheck(data)
                setCoursesFilter(prev =>({
                    ...prev,
                    minPrice: data?.minPrice,
                    maxPrice: data?.maxPrice
                }))
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchPricieRange()
    },[])
    //

    // get courses filter
    useEffect(() => {
        if (debouncedMinPrice === null || debouncedMaxPrice === null) return

        if (skipFetchPriceRange.current) {
            skipFetchPriceRange.current = false
            return
        }
        
        if (isFirstRun.current) {
            isFirstRun.current = false
            return
        }
    
        const fetchCourses = async () => {
            setIsLoadingCourses(true)

            try {
                const filtered ={
                    ...coursesFilter,
                    minPrice: debouncedMinPrice,
                    maxPrice: debouncedMaxPrice,
                }

                const data = await getCoursesFilter(filtered)
                
                setDataCourses(data)
                setLengthCourses(data.length)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoadingCourses(false)
            }
        }

        fetchCourses()

    }, [debouncedMinPrice, debouncedMaxPrice])
    //

    //update progressbar when price change
    useEffect(() => {
        if (
            coursesFilter.minPrice !== undefined &&
            coursesFilter.maxPrice !== undefined &&
            priceRangeCheck.minPrice !== undefined &&
            priceRangeCheck.maxPrice !== undefined
        ) {
            updateProgressBar(coursesFilter.minPrice, coursesFilter.maxPrice)
        }
    }, [coursesFilter.minPrice, coursesFilter.maxPrice])
    //

    //format to style vnd
    const formatToVND = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        }).format(amount)
    }
    //

    //handle change min price input
    const handleChangeMinPriceInput = (e) => {
        const value = e.target.value

        if (/^[0-9]*$/.test(value)) {
            setMinPriceSearch(value)
        }

    }
    //

    //handle blur min price input
    const handleBlurMinPriceInput = () => {
        const num = parseInt(minPriceSearch)

        if (!num) return

        setIsLoadingCourses(true)

        switch (true) {
            // value search < min price
            case num < priceRangeCheck.minPrice:

                setCoursesFilter(prev => ({
                    ...prev,
                    minPrice: priceRangeCheck.minPrice
                }))

                setMinPriceSearch('')

                updateProgressBar(priceRangeCheck.minPrice,coursesFilter.maxPrice)
                break

            // value search > max price search
            case num > coursesFilter.maxPrice:

                setCoursesFilter(prev => ({
                    ...prev,
                    minPrice: coursesFilter.maxPrice
                }))

                setMinPriceSearch('')

                updateProgressBar(coursesFilter.maxPrice,coursesFilter.maxPrice)
                break

            // min price < value search < max price search
            default:

                setCoursesFilter(prev => ({
                    ...prev,
                    minPrice: num
                }))

                setMinPriceSearch('')

                updateProgressBar(num,coursesFilter.maxPrice)
                break
        }

    }
    //

    //handle change max price input
    const handleChangeMaxPriceInput = (e) => {
        const value = e.target.value

        if (/^[0-9]*$/.test(value)) {
            setMaxPriceSearch(value)
        }

    }
    //

    //handle blur max price input
    const handleBlurMaxPriceInput = () => {
        const num = parseInt(maxPriceSearch)

        if (!num) return

        setIsLoadingCourses(true)

        switch (true) {
            // value search > max price
            case num > coursesFilter.maxPrice:

                setCoursesFilter(prev => ({
                    ...prev,
                    maxPrice: coursesFilter.maxPrice
                }))

                setMaxPriceSearch('')

                updateProgressBar(coursesFilter.minPrice,coursesFilter.maxPrice)
                break

            // value search < min price
            case num < coursesFilter.minPrice:

                setCoursesFilter(prev => ({
                    ...prev,
                    maxPrice: coursesFilter.minPrice
                }))

                setMaxPriceSearch('')

                updateProgressBar(coursesFilter.minPrice,coursesFilter.minPrice)
                break

            // min price search < value search < max price
            default:

                setCoursesFilter(prev => ({
                    ...prev,
                    maxPrice: num
                }))

                setMaxPriceSearch('')

                updateProgressBar(coursesFilter.minPrice,num)
                break
        }

    }
    //

    //handle slide min price
    const handleSlideMinPrice = (e) => {
        let minValue = Number(e.target.value)

        if (minValue > coursesFilter.maxPrice) return

        setCoursesFilter(prev => ({
            ...prev,
            minPrice: minValue
        }))

        updateProgressBar(minValue,coursesFilter.maxPrice)
    }
    //

    //handle slide max price
    const handleSlideMaxPrice = (e) => {
        let maxValue = Number(e.target.value)

        if (maxValue < coursesFilter.minPrice) return

        setCoursesFilter(prev => ({
            ...prev,
            maxPrice: maxValue
        }))

        updateProgressBar(coursesFilter.minPrice, maxValue)
    }
    //

    //update progresss Bar
    const updateProgressBar = (minValue, maxValue) => {
        if (!sliderPriceInput.current) return

        const range = priceRangeCheck.maxPrice - priceRangeCheck.minPrice;

        const leftPercent = ((minValue - priceRangeCheck.minPrice) / range) * 100
        const rightPercent = 100 - ((maxValue - priceRangeCheck.minPrice) / range) * 100

        sliderPriceInput.current.style.left = `${leftPercent}%`
        sliderPriceInput.current.style.right = `${rightPercent}%`
    }
    //

  return (
    <div className='filter-price-wrapper'>
        <h1 className='filter-price-title'>
            Giá
        </h1>

        {!isLoading 
        ?   <div className='filter-price-inner'>
                <div className='filter-price-list'>
                    <div className='filter-price-box'>
                        <span>Từ</span>
                        <div className='filter-price-box-input'>
                            <input
                                placeholder={formatToVND(coursesFilter?.minPrice)}
                                value={minPriceSearch}
                                onChange={(e) => handleChangeMinPriceInput(e)}
                                onBlur={handleBlurMinPriceInput}
                                onMouseDown={() => setActiveThumb('min')}
                                ref={minPriceInput}
                            />
                        </div>
                    </div>
                    <div className='filter-price-box'>
                        <span>Đến</span>
                        <div className='filter-price-box-input'>
                            <input
                                placeholder={formatToVND(coursesFilter?.maxPrice)}
                                value={maxPriceSearch}
                                onChange={e => handleChangeMaxPriceInput(e)}
                                onBlur={handleBlurMaxPriceInput}
                                onMouseDown={() => setActiveThumb('max')}
                                ref={maxPriceInput}
                            />
                        </div>
                    </div>
                </div>

                <div className='filter-price-range'>
                    <span className='filter-price-progress-range'
                        ref={sliderPriceInput}
                    ></span>

                    <input
                        className={`min-thumb ${activeThumb === 'min' ? 'thumb-active' : ''}`}
                        type="range"
                        min={priceRangeCheck?.minPrice || 0}
                        max={priceRangeCheck?.maxPrice || 0}
                        value={coursesFilter?.minPrice || 0}
                        onChange={e => handleSlideMinPrice(e)}
                        onMouseDown={() => setActiveThumb('min')}
                    />
                    <input
                        className={`max-thumb ${activeThumb === 'max' ? 'thumb-active' : ''}`}
                        type="range"
                        min={priceRangeCheck?.minPrice || 0}
                        max={priceRangeCheck?.maxPrice || 0}
                        value={coursesFilter?.maxPrice || 0}
                        onChange={e => handleSlideMaxPrice(e)}
                        onMouseDown={() => setActiveThumb('max')}
                    />
                </div>
            </div>
        :   <div className='filter-price-loadding'>
                <span></span>
            </div>
        }
    </div>
  )
}

export default FilterPriceRange
