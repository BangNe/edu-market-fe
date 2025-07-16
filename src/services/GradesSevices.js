import grades from '../data/mockGrades.json'

//get all grades
export const getGrades = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!grades || grades.length === 0) {
        reject({
          isSuccess: false,
          data: [],
          message: 'Không tìm thấy lớp nào...',
        })
      } else {
        resolve({
          isSuccess: true,
          data: grades,
          message: 'Thành công',
        })
      }
    }, 500)
  })
}
