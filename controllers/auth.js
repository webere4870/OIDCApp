let passport = require('passport')
let express = require('express')
let router = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()
router.get("/auth/google", passport.authenticate('google', {scope: ['profile', 'email']}))

router.get("/auth/facebook", passport.authenticate('facebook', {session: false}))
router.post("/register", (req, res)=>
{
    let {username, password} = req.body
    res.render('login')
})

// Ensure auth was successful
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session: false}),
  function(req, res) {
    // Successful authentication, redirect home.
    let user = {
      displayName: req.user.displayName,
      name: req.user.name.givenName,
      email: req.user._json.email,
      provider: req.user.provider }
  console.log(user)
  let token = jwt.sign(user, process.env.JWT_KEY, {expiresIn: 60})
  res.cookie("jwt", token)
    res.redirect('/protected');
});


router.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/login' }),
function(req, res) {
  console.log(req.user)
   res.redirect('/protected');
});

module.exports = router