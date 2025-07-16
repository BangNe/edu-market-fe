import categories from '../data/mockCategories.json'

//get all categories
export const getCategories = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!categories || categories.length === 0) {
        reject({
          isSuccess: false,
          data: [],
          message: 'Không tìm thấy môn học nào...',
        })
      } else {
        resolve({
          isSuccess: true,
          data: categories,
          message: 'Thành công',
        })
      }
    }, 500)
  })
}
