const Genre = require("../models/genreModel")

exports.create =(req, res) =>{
    //request validation
    if (!req.body.name){
        res.status(400).send({
            message:"Content cannot be empty"
        })
        return
    }

    //create genre
    const genre = {
        title: req.body.title,
    }

    //save genre to database
    Genre.create(genre)
        .then(data =>{
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occured while creating genre"
            })
        })
}

//retrieve all genres from the database
exports.findAll = (req, res ) => {
    Genre.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occured retrieving all the genres"
            })
        })
}