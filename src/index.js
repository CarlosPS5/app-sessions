const express = require('express')
const session = require('express-session')
const ConnectMongoDBSession = require('connect-mongodb-session')

const config = require('./config')
const app = express()
const MongoDBStore = ConnectMongoDBSession(session)
const store = new MongoDBStore({
    uri: config.session.db.uri,
    collection: config.session.db.collection
})

store.on('error', (err) => {
    console.log("Error conectando a la db")
})

//Settings.
app.set('port', process.env.PORT || 4000)

//Middleware.
app.use(session({
    secret: config.session.secret,
    name: 'my-session',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000* 60 * 60
    },
    store
}))

//Routes.
app.get('/', (req,res) => {
    res.redirect('/counter')
})

app.get('/counter', (req,res) => {
    let count = req.session.count
    req.session.count = count ? ++count : 1
    req.session.user = {
        name: 'carlos',
        age: 26
    }
    console.log(req.session)
    res.send(`count: ${req.session.count}`)
})

app.get('/destroy', (req,res) => {
    req.session.destroy()
    res.redirect('/')
})



app.listen(app.get('port'), () => {
    console.log("Server running on port: ", app.get('port'))
})