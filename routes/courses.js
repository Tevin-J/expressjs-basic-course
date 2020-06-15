const {Router} = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', async (req, res) => {
    const courses = await Course.getAll()
    res.render('courses', {
        title: 'courses',
        isCourses: true,
        courses: courses
    })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }
    const course = await Course.getCourseById(req.params.id)
    res.render('course-edit', {
        title: `Edit ${course.title}`,
        course: course
    })
})

router.post('/edit', async (req, res) => {
    await Course.update(req.body)
    res.redirect('/courses')
})

/*для отображения конкретного курса делаем запрос на адрес с id этого курса. получаем курс
из метода getCourseById модуля Course. рендерим course.hbs, передавая в нее {} course, для
динамической отрисовки того курса, на который нажали. для отображения информации о курсе в
новой вкладке, создаем новый layout и будем эту информацию рендерить туда*/
router.get('/:id', async (req, res) => {
    const course = await Course.getCourseById(req.params.id)
    res.render('course', {
        layout: 'empty',
        title: `${course.title} course`,
        course: course
    })
})

module.exports = router
