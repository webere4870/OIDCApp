let express = require('express')
let router = express.Router()
let ValidateJWT = require('./../utils/ValidateJWT')
let FindOrCreate = require('./../MongoDB/FindOrCreate')
let VerifyUser = require('./../MongoDB/VerifyUser')

function isLoggedIn(req, res, next)
{
    req.user ? next() : res.redirect("/login")
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
    let profile = req.JWT
    console.log(profile)
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

router.post("/register", async (req, res)=>
{
    let {username, password} = req.body
    await FindOrCreate(username, password)
    res.redirect("/login")
})

router.post("/login", async (req, res)=>
{
    let {username, password} = req.body
    let isVerified = await VerifyUser(username, password)
    console.log("Ver", isVerified)
    if(isVerified == true)
    {
        let user = {
            displayName: username,
            name: username,
            email: username,
            provider: "Node.js Server",
            picture: ""}
        let [token, profile] = CreateToken(user)
        console.log(token)
        res.cookie("jwt", token)
        res.redirect("/protected")
    }
    else
    {
    res.redirect("/login") 
    }
})

module.exports = router