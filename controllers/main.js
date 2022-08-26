let express = require('express')
let getUserData = require('../utils/userData')
let router = express.Router()
let UserSchema = require('./../MongoDB/Schema')
let ValidateJWT = require('./../utils/ValidateJWT')

function isLoggedIn(req, res, next)
{
    req.user ? next() : res.redirect("/login")
}

function FindOrCreate(req, res, next)
{
    console.log(req.user)
    next()
}


router.get("/", isLoggedIn, FindOrCreate,(req, res)=>
{
    res.render("/protected")
})

router.get("/login", (req, res)=>
{
    if(req.user)
    {
        res.redirect("/")
    }
    res.render("login")
})

router.get("/failure", (req, res)=>
{
    res.send("Something went wrong")
})

router.get("/protected", ValidateJWT, (req, res)=>
{
    /*
    let name = req.user.displayName
    let email = req.user.emails[0].value
    let href = req.user._json.picture
    console.log(name, email, href)
    */
    let profile = {name: req.JWT.name}

    res.render("protected", profile)
})

router.get('/logout', function(req, res){
    res.clearCookie("jwt")
    res.redirect("/login")
  });

router.get("/register", (req, res)=>
{
    res.render("register")
})

router.post("/register", (req, res)=>
{
    let {username, password} = req.body
    console.log(username, password)
    res.send("Received")
})

module.exports = router