module.exports = app =>{
    const reviews = require("../controllers/reviewController")
    const router = require("express").Router()

    //create a new review
    router.post("/", reviews.create)

    //retrieve all reviews
    router.get("/", reviews.findAll)

    app.use('/api/reviews', router)
}