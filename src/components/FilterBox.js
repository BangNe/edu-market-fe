const FilterBox =({title,
    isExpanded = false,
    isVisibleData = false,
    onSetIsExpanded = () => {},
    isLoading = false,
    children
}) => {
  return (
    <div className='filter-box-wrapper'>
        <h1 className='filter-box-title'>
            {title}
        </h1>
        {isLoading
        ?   <div className='filter-box-load'></div>
        :   children
        }
        {isVisibleData  &&
            <div className='filter-box-btn'
                onClick={() => onSetIsExpanded(prev => !prev)}
            >
                <span>{isExpanded? 'Ẩn bớt' : 'Xem thêm'}</span>
            </div>
        }
    </div>
  )
}

export default FilterBox
