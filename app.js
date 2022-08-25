let express = require('express')
let passport = require('passport')
require('./strategy')
let app = express()
let session = require('express-session')
require('dotenv').config()
let pageRouter = require('./controllers/main')

app.use(express.static('public'))
app.set("view engine", "ejs")
//app.set('layout', './views/layouts/main')
//app.use(expressLayouts)


app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: "KLJKLDSJJJJJJJLAKJLKFJ"
}))

app.use(passport.initialize())
app.use(passport.session())


app.get("/auth/google", passport.authenticate('google', {scope: ['profile', 'email']}))

// Ensure auth was successful
app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/protected');
  });



app.use("/", pageRouter)

app.listen(3000, ()=>
{
    console.log("Listening on port 3000")
})

