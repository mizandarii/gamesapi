const Game = require("../models/gameModel");
const { Op } = require('sequelize');

//create a new game
exports.create = (req, res) => {
    //request validation
    if (!req.body.title) {
        return res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    const { title, rating, release, summary } = req.body;

    Game.create({ title, rating, release, summary })
        .then(newGame => {
            res.send(newGame);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the game"
            });
        });
};

//retrieve all games from the database
exports.findAll = (req, res) => {
    Game.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred retrieving all the games"
            });
        });
};

//get a game by id
exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id);
        if (!game) {
            return res.status(404).send({ message: "Game not found." });
        }
        return res.status(200).json(game);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

//delete a game by id
exports.deleteGameById = async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id);
        if (!game) {
            return res.status(404).send({ message: "Game not found." });
        }
        await game.destroy();
        return res.status(204).send();
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

//SEARCH

//find games by title (partial match)
exports.findGameByTitle = async (req, res) => {
    try {
        const gameTitle = req.query.title;
        if (!gameTitle) {
            return res.status(400).json({ error: 'Title query parameter is required.' });
        }
        const games = await Game.findAll({
            where: {
                title: {
                    [Op.like]: `%${gameTitle}%`
                }
            }
        });
        return res.status(200).json(games);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while searching for games.' });
    }
};


//find games by genre
exports.findGamesByGenre = async (req, res) => {
    try {
        const genreTitle = req.query.genre;
        if (!genreTitle) {
            return res.status(400).json({ error: 'Genre query parameter is required.' });
        }

        const games = await Game.findAll({
            where: {
                genre: genreTitle 
            }
        });

        return res.status(200).json(games);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while searching for games.' });
    }
};



module.exports = {
    create: exports.create,
    findAll: exports.findAll,
    getGameById: exports.getGameById,
    deleteGameById: exports.deleteGameById,
    findGameByTitle: exports.findGameByTitle,
    findGamesByGenre: exports.findGamesByGenre
};
