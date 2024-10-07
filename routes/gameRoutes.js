module.exports = (app) => {
    const games = require("../controllers/gameController"); 
    const router = require("express").Router();

    // Create a new game
    router.post("/", games.create);

    // Retrieve all games
    router.get("/", games.findAll);

    // Retrieve a single game by id
    router.get("/:id", games.getGameById);

    // Delete a game by id (use DELETE)
    router.delete("/:id", games.deleteGameById);

    // SEARCH

    //find games by title (partial match)
    //GET /games/search?title={title}
    router.get("/search", games.findGameByTitle);

    //find games by genre 
    router.get("/search", games.findGamesByGenre);

    app.use('/api/games', router);
};
