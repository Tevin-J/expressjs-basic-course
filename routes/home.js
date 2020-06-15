const {Router} = require('express')

const router = Router()

router.get('/', (req, res) => {
    /*указываем название той страницы которую надо отрисовать. расширение и папка
    где она находится уже настроены в настройках handlebars*/
    res.render('index', {
        title: 'Main page',
        isHome: true
    })
})

module.exports = router
