import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'


const Pagination = ({ data = [], quantity = 6, children }) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const initialPage = parseInt(searchParams.get('page')) || 1

  const [currentPage, setCurrentPage] = useState(initialPage)
  const [paginationRange, setPaginationRange] = useState([])

  const totalPage = Math.ceil(data.length / quantity)
  const start = (currentPage - 1) * quantity
  const currentData = data.slice(start, start + quantity)

  //update query URL on search courses
  useEffect(()=> {
    setCurrentPage(1)
  },[data])

  // Update query URL on page change
  useEffect(() => {
    navigate(`?page=${currentPage}`)
  }, [currentPage, navigate])
  //

  // handle paginationRange
  useEffect(() => {

    let range = []

    if(totalPage <= 7) {

        range = Array.from({ length: totalPage }, (_, i) => i + 1)

    } else if (currentPage <= 4) {

        range = [1, 2, 3, 4, 5, '...', totalPage]

    } else if (currentPage >= totalPage - 3) {

        const tail = Array.from({ length: 5 }, (_, i) => totalPage - 4 + i)
        range = [1, '...', ...tail]

    } else {

        range = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPage]
    }

    setPaginationRange(range)
  },[currentPage, totalPage])
  //

  //handle page click
  const handleClickPage = (page) => {
    if (page === '...' || currentData === page) return
    setCurrentPage(page)
  }
  //

  //handle next page
  const handleNextPage = () => {
    if (currentPage >= totalPage) return

    setCurrentPage(prev => prev + 1)
  }
  //

  //handle previous page
  const handlePreviousPage = () => {
    if (currentPage <= 1) return

    setCurrentPage(prev => prev - 1)
  }
  //

  return (
    <div className='pagination-wrapper'>
      <div className="pagination-content">
        {typeof children === 'function' ? children(currentData) : null}
      </div>
      {paginationRange.length > 1 &&
        <div className="pagination-box-wrapper">
          <div className='pagination-box'>
              <div className= {`pagination-box-item pagination-box-type ${currentPage <= 1 ? 'disable' : ''}`}
                  onClick={handlePreviousPage}
              >
                  <span>
                      Previous
                  </span>
              </div>
              {paginationRange?.map((item,i) => {
                  return (
                      <div
                          key={i}
                          onClick={() => handleClickPage(item)}
                          className={`pagination-box-item pagination-box--link ${currentPage === item ? 'active' : ''}
                              ${item === '...' ? 'note' : ''}
                          `}
                      >
                          <span>{item}</span>
                      </div>
                  )
              })}
              <div className={`pagination-box-item pagination-box-type ${currentPage >= totalPage ? 'disable' : ''}`}
                  onClick={handleNextPage}
              >
                  <span>
                      Next
                  </span>
              </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Pagination