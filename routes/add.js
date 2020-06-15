const {Router} = require('express')
const router = Router()
/*получаем созданный нами модуль курса*/
const Course = require('../models/course')

router.get('/', (req, res) => {
    res.render('add', {
        title: 'add course',
        isAdd: true
    })
})

router.post('/', async (req, res) => {

    /*создаем для данного пост-запроса экземпляр класса Course, в который в свойства
    записываем данные из формы*/
    const course = new Course(req.body.title,  req.body.price, req.body.img)

    await course.save()

    res.redirect('/courses')
})

module.exports = router
