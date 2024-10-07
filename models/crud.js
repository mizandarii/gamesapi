const CsvSql = require('sql-csv');
const csvSql = new CsvSql('ivleva/rest_api/games.csv');

const result = await csvSql.query('SELECT * FROM file WHERE column1 = "value"');