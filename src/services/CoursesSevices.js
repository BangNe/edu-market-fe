import courses from '../data/mockCourses.json'

//get detail course
export const getDetailCourse = (id) => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const filtered = courses.find(course => course.id === Number(id))

            if(filtered) {
                resolve({
                    isSuccess: true,
                    data:filtered,
                    message: 'Thành công' 
                }) 
            } else {
                reject({
                    isSuccess: false,
                    data:{},
                    message: 'Không tìm thấy khóa học. Vui lòng chọn khóa học khác...'
                })
            }
        },500)
    })
}

//get filter courses
export const getCoursesFilter = (filterCourses) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const filtered = courses.filter((course) => {

        //match name
        const matchName = course.name.toLowerCase().includes(filterCourses.name?.toLowerCase() || '')

        //match teacher
        const matchTeacher = filterCourses.teacherId
          ? course.teacherId === filterCourses.teacherId
          : true

        //match Grade
        const matchGrade = filterCourses.grade
          ? filterCourses.grade === course.grade
          : true

        //match Category
        const matchCategory = filterCourses.categoryId?.length
          ? filterCourses.categoryId.includes(course.categoryId)
          : true

        //match price
        const matchPrice =
          (filterCourses.minPrice === null || course.price >= Number(filterCourses.minPrice)) &&
          (filterCourses.maxPrice === null || course.price <= Number(filterCourses.maxPrice))

        return matchName && matchTeacher && matchGrade && matchCategory && matchPrice
      })

      const sorted = [...filtered]

      switch (filterCourses.sort.type) {
        case 1: // rating
          sorted.sort((a, b) => b.rating - a.rating)
          break
        case 2: // enrollment
          sorted.sort((a, b) => b.enrollment - a.enrollment)
          break
        case 0: // newest
        default:
          sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          break
      }

      if (sorted.length === 0) {
        reject({
          isSuccess: false,
          data: [],
          message: 'Không tìm thấy kết quả phù hợp...'
        })
      } else {
        resolve({
          isSuccess: true,
          data: sorted,
          message: 'Thành công'
        })
      }
    }, 500)
  })
}

//get min & max price from all courses
export const getMinMaxCoursePrice = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const prices = courses.map(course => course.price)
      if (!prices || prices.length === 0) {
        reject({
          isSuccess: false,
          data: null,
          message: 'Không có dữ liệu giá.',
        })
      } else {
        const minPrice = Math.min(...prices)
        const maxPrice = Math.max(...prices)
        resolve({
          isSuccess: true,
          data: { minPrice, maxPrice },
          message: 'Thành công',
        })
      }
    }, 500)
  })
}

// get course by tag limit 10 item
export const getCoursesByTags = (tags = []) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const filtered = courses.filter(course =>
                course.tags?.some(tag => tags.includes(tag))
            )

            if (filtered.length === 0) {
                reject({
                    isSuccess: false,
                    message: "Không tìm thấy khóa học..."
                })
            } else {
                resolve(filtered.slice(0, 10))
            }
        }, 500)
    })
}

//get course favorites
export const getFavoritesCourses = (favs = []) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const filtered = courses.filter(course =>
                favs.includes(course.id)
            )

            if (filtered.length === 0) {
                reject({
                    isSuccess: false,
                    data:[],
                    message: "Không tìm thấy khóa học yêu thích..."
                })
            } else {
                resolve({
                    isSuccess: true,
                    data:filtered,
                    message: "Thành công"
                })
            }
        }, 500)
    })
}
