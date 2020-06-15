const express = require('express')
const path = require('path')
/*подключаем handlebars*/
const exphbs = require('express-handlebars')
/*подключаем роуты*/
const homeRouter = require('./routes/home')
const addRouter = require('./routes/add')
const coursesRouter = require('./routes/courses')
const cardRouter = require('./routes/card')

/*создание приложения*/
const app = express()

/*делаем настройки handlebars*/
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

/*регистрируем данный модуль handlebars как движок для рендеринга html-страниц*/
app.engine('hbs', hbs.engine)

/*начинаем использовать зарегистрированный движок hbs как view engine*/
app.set('view engine', 'hbs')

/*настраиваем в какой папке будут находиться шаблоны*/
app.set('views', 'views')

/*сделали папку public статической для подключения стилей из index.css*/
app.use(express.static('public'))

/*для получения данных из формы в post-запросе*/
app.use(express.urlencoded({extended: true}))

/*выносим роутинги в отдельные файлы, а здесь просто подключаем роуты как middleware*/
app.use('/', homeRouter)
app.use('/add', addRouter)
app.use('/courses', coursesRouter)
app.use('/card', cardRouter)

/*получаем порт из параметров в консоли либо 3000й*/
const PORT = process.env.PORT || 3000

/*запускаем порт на указанном порту и при запуске запускаем внутреннюю ф-ю*/
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`);
})
