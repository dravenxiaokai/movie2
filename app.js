var express = require('express')
var port = process.env.PORT || 3000
var path = require('path')
var serveStatic = require('serve-static')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var mongoose = require('mongoose')
var MongoStore = require('connect-mongo')(session)
// mongoose.Promise = require('bluebird')

var app = express()
var dbUrl = 'mongodb://localhost:27017/movie'

mongoose.connect(dbUrl, {
  useMongoClient: true
})

app.set('views', 'app/views/pages/')
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
  secret: 'movie',
  saveUninitialized: true, // don't create session until something stored 
  resave: true, //don't save session if unmodified
  auto_reconnect: true,
  store: new MongoStore({
    url: dbUrl,
    collection: 'sessions'
  })
}))

if('development' === app.get('env')){
  app.set('showStackError',true)
  // app.use(express.logger(':method :url :status'))
  app.locals.pretty = true
  mongoose.set('debug',true)
}

require('./config/routes')(app)

app.use(serveStatic(path.join(__dirname, 'public')))
app.locals.moment = require('moment')
app.listen(port)
mongoose.Promise = global.Promise

console.log('started on port ' + port)