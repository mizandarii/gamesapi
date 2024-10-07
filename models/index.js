const Sequelize = require('sequelize');
const sequelize = require('../config/database'); 

const Game = require('./gameModel');
const Genre = require('./genreModel');
const Team = require('./teamModel');
const Review = require('./reviewModel');


//Один ко многим между играми и отзывами
Game.hasMany(Review, {foreignKey: 'gameId',  as: 'reviews'});
Review.belongsTo(Game, {foreignKey: 'gameId',as: 'game'});
  

//Многие ко многим между играми и жанрами
const GameGenre = sequelize.define('GameGenre', {}, {timestamps:false});

Game.belongsToMany(Genre, { through: GameGenre, as: 'genres'});
Genre.belongsToMany(Game, {through: GameGenre, as: 'games'});

//Многие ко многим между играми и командами
const TeamGame = sequelize.define('TeamGame', {}, {timestamps:false});

Team.belongsToMany(Game, { through: TeamGame, as: 'games'});
Game.belongsToMany(Team, {through: TeamGame, as: 'teams'});


module.exports = {
    Game,
    Genre,
    Team,
    Review
};
