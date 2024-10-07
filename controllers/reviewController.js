const Review = require("../models/reviewModel")

exports.create =(req, res) =>{
    //request validation
    if (!req.body.name){
        res.status(400).send({
            message:"Content cannot be emoty"
        })
        return
    }

    //create review
    const review = {
        content: req.body.content,
    }

    //save review to database
    Review.create(review)
        .then(data =>{
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occured while creating review"
            })
        })
}

//retrieve all reviews from the database
exports.findAll = (req, res ) => {
    Review.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occured retrieving all the reviews"
            })
        })
}