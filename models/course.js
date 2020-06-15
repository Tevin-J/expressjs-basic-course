/*подключаем библиотеку по созданию id*/
const uuid = require('uuid/dist/v5')
const fs = require('fs')
const path = require('path')

/*создаем модель курса*/
class Course {
    constructor(title, price, img) {
        this.title = title
        this.price = price
        this.img = img
        this.id = uuid
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }

    /*в этом методе мы должны данные из формы преобразовать в JSON-формат и сохранить их
    в отдельный файл*/
    async save() {
        /*получим в переменную содержимое файла courses.json*/
        const courses = await Course.getAll()
        /*добавляем в эту переменную данные из формы при помощи ф-и toJSON*/
        courses.push(this.toJSON())
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    /*метод чтения данных из файла courses.json, преобразование этих данных в JSON и
    возврат их в виде промиса*/
    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(content))
                    }

                }
            )
        })
    }

    /*метод получения конкретного курса по id из courses.json*/
    static async getCourseById(id) {
        const courses = await Course.getAll()
        return courses.find(c => c.id === id)
    }

    static async update(course) {
        const courses = await Course.getAll()
        const idx = courses.findIndex(c => c.id === course.id)
        courses[idx] = course
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }
}

module.exports = Course
