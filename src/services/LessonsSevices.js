import lessons from '../data/mockLessons.json'

//get lesson detail course
export const getLessonsDetailCourse = (listId) => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            const filtered = lessons.filter(leasson => {
                return listId.includes(leasson.id)
            })

            if(filtered.length === 0) {
                reject({
                    isSuccess: false,
                    message: "Không có bài học tương ứng",
                    data:[]
                })
            } else {
                resolve({
                    isSuccess: true,
                    message: "Thành công",
                    data:filtered
                })
            }
        },500)
    })
}
