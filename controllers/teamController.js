const Team = require("../models/teamModel")

exports.create =(req, res) =>{
    //request validation
    if (!req.body.name){
        res.status(400).send({
            message:"Content cannot be emoty"
        })
        return
    }

    //create team
    const team = {
        name: req.body.name,
    }

    //save team to database
    Team.create(team)
        .then(data =>{
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occured while creating team"
            })
        })
}

//retrieve all teams from the database
exports.findAll = (req, res ) => {
    Team.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occured retrieving all the categories"
            })
        })
}