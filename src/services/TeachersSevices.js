import teachers from '../data/mockTeachers.json'

//get all teacher
export const getTeachers = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!teachers || teachers.length === 0) {
        reject({
          isSuccess: false,
          data: [],
          message: 'Không tìm thấy giáo viên nào...',
        })
      } else {
        resolve({
          isSuccess: true,
          data: teachers,
          message: 'Thành công',
        })
      }
    }, 500)
  })
}

