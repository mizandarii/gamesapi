module.exports = app =>{
    const teams = require("../controllers/teamController")
    const router = require("express").Router()

    //create a new team
    router.post("/", teams.create)

    //retrieve all teams
    router.get("/", teams.findAll)

    app.use('/api/teams', router)
}