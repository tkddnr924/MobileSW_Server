const router = require("express-promise-router")();
const api = require('./api')

router.get("/", (req, res, next) => { res.json({sucess:true, message:"welcome index", data:{version:"1.0.0"}}) })
router.post("/", (req, res, next) => { res.json({sucess:true, message:"welcome index", data:{version:"1.0.0"}}) })

router.use("/api", api)
module.exports = router
