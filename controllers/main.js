let express = require('express')
let router = express.Router()

function isLoggedIn(req, res, next)
{
    req.user ? next() : res.redirect("/")
}

router.get("/", (req, res)=>
{
    if(req.user)
    {
        res.redirect("protected")
    }
    res.render("home")
})

router.get("/failure", (req, res)=>
{
    res.send("Something went wrong")
})

router.get("/protected", isLoggedIn,(req, res)=>
{
    let name = req.user.displayName
    let email = req.user.emails[0].value
    let href = req.user._json.picture
    console.log(name, email, href)
    res.render("protected", {profilePicture: href, name: name, email: email})
})

router.get('/logout', function(req, res){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

module.exports = router