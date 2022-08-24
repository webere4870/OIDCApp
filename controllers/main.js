let express = require('express')
let router = express.Router()

router.get("/test", (req, res)=>
{
    console.log("here")
    res.render("home")
})

module.exports = router