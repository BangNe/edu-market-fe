import FilterTeachers from './FilterTeachers'
import FilterCategories from './FilterCategories'
import FilterGrade from './FilterGrade'
import FilterPriceRange from './FilterPriceRange'

const FilterCourses = ({
    onSetIsShowFilter,
    isShowFilter
}) => {
  return (
    <div className={`filter-courses-wrapper ${isShowFilter ? 'show' : ''}`}>
      <div className='filter-courses-close'
        onClick={() => onSetIsShowFilter(false)}
      >
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className='filter-courses-inner'>
          <FilterTeachers/>
          <FilterCategories/>
          <FilterGrade/>
          <FilterPriceRange/>
      </div>
    </div>
  )
}

export default FilterCourses
