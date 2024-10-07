module.exports = app =>{
    const genres = require("../controllers/genreController")
    const router = require("express").Router()

    //create a new genre
    router.post("/", genres.create)

    //retrieve all genres
    router.get("/", genres.findAll)

    app.use('/api/genres', router)
}