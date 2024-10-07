const fs = require('fs');
const csv = require('csv-parser');
const { Game, Genre, Team, Review } = require('./models'); 
const { parse, isValid } = require('date-fns');

const results = [];
const genres = new Set();
const teams = new Set();
const reviews = new Set();

fs.createReadStream('data/games.csv')
  .pipe(csv())
  .on('data', (data) => {
    results.push(data);

    
    if (data.Team && data.Team.trim() !== '') {
      const teamsArray = data.Team.replace(/[\[\]']/g, '').split(', ');
      teamsArray.forEach(team => teams.add(team.trim()));
    }

    if (data.Reviews) {
      const reviewsArray = data.Reviews.replace(/[\[\]']/g, '').split(', ');
      reviewsArray.forEach(review => reviews.add(review.trim()));
    }

    if (data.Genres) {
      const genresArray = data.Genres.replace(/[\[\]']/g, '').split(', ');
      genresArray.forEach(genre => genres.add(genre.trim()));
    }
  })
  .on('end', async () => {
    
    for (const teamName of teams) {
      await Team.findOrCreate({
        where: { name: teamName },
        defaults: { name: teamName }
      });
      console.log(`Team added: ${teamName}`);
    }

    
    for (const genreName of genres) {
      await Genre.findOrCreate({
        where: { title: genreName },
        defaults: { title: genreName }
      });
      console.log(`Genre added: ${genreName}`);
    }

    for (const reviewText of reviews) {
      await Review.findOrCreate({
        where: { content: reviewText },
        defaults: { content: reviewText }
      });
      console.log(`Review added: ${reviewText}`);
    }

    
    for (const game of results) {
      try {
        if (!game.Release) {
          throw new Error(`Release date is missing for game: ${game.Title}`);
        }
    
        const releaseDate = parse(game.Release, 'MMM dd, yyyy', new Date());
        if (!isValid(releaseDate)) {
          throw new Error(`Invalid release date format for game: ${game.Title}`);
        }
    
        const gameData = {
          title: game.Title,
          rating: game.Rating,
          release: releaseDate,
          summary: game.Summary,
          timesListed: parseTextToNumber(game['Times Listed']),
          reviewNumber: parseTextToNumber(game['Number of Reviews']),
          wishlist: parseTextToNumber(game.Wishlist),
          timesPlayed: parseTextToNumber(game.Plays),
          playing: parseTextToNumber(game.Playing),
          backlogs: parseTextToNumber(game.Backlogs),
        };
    
        const [newGame] = await Game.findOrCreate({
          where: { title: gameData.title },
          defaults: gameData
        });
        console.log(`Game processed: ${newGame.title}`);
    
        if (game.Genres) {
          const genresArray = game.Genres.replace(/[\[\]']/g, '').split(', ');
          for (const genreName of genresArray) {
            const [genre] = await Genre.findOrCreate({
              where: { title: genreName.trim() },
              defaults: { title: genreName.trim() }
            });
            await newGame.addGenre(genre);
            console.log(`Genre added: ${genre.title}`);
          }
        }
    
        if (game.Reviews) {
          const reviewsArray = game.Reviews.replace(/[\[\]']/g, '').split(', ');
          for (const reviewText of reviewsArray) {
            const [review] = await Review.findOrCreate({
              where: { content: reviewText },
              defaults: { content: reviewText }
            });
            await newGame.addReview(review);
            console.log(`Review added: ${review.content}`);
          }
        }
    
        if (game.Team && game.Team.trim() !== '') {
          const teamsArray = game.Team.replace(/[\[\]']/g, '').split(', ');
          for (const teamName of teamsArray) {
            const [team] = await Team.findOrCreate({
              where: { name: teamName.trim() },
              defaults: { name: teamName.trim() }
            });
            await newGame.addTeam(team);
            console.log(`Team added: ${team.name}`);
          }
        } else {
          console.log(`No teams found for game: ${game.Title}`);
        }
    
      } catch (error) {
        console.error('Error processing game:', error.message);
      }
    }
  })    

  function parseTextToNumber(text) {
    if (text.toLowerCase().endsWith('k')) {
        return parseFloat(text) * 1000;
    } else {
        return parseFloat(text);
    }
}