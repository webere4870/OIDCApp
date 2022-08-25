let express = require('express')
let passport = require('passport')
let app = express()
let session = require('express-session')
let pageRouter = require('./controllers/main')
let bodyParser = require('body-parser')


require('./GoogleStrategy')
require('./FacebookStrategy')
require('dotenv').config()


let MongoStore = require('connect-mongodb-session')(session)
let store = new MongoStore({
    uri: 'mongodb://localhost:27017/test',
    collection: 'OIDCSessions'
});


app.use(express.static('public'))
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//app.set('layout', './views/layouts/main')
//app.use(expressLayouts)


app.use(session({
    saveUninitialized: true,
    resave: false,
    store: store,
    secret: "KLJKLDSJJJJJJJLAKJLKFJ"
}))
app.use(passport.initialize())
app.use(passport.session())


app.get("/auth/google", passport.authenticate('google', {scope: ['profile', 'email']}))

app.get("/auth/facebook", passport.authenticate('facebook'))

// Ensure auth was successful
app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/protected');
});


app.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/login' }),
function(req, res) {
   res.redirect('/protected');
});




app.use("/", pageRouter)

app.listen(3000, ()=>
{
    console.log("Listening on port 3000")
})

