const mysql = require('mysql2');

require('dotenv').config();

function dbConnection() {}

var connectionObj = {
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  insecureAuth: true,
};

dbConnection.prototype.createDbConnection = async () => {
  let dbConnection = new Promise((resolve, reject) => {
    var connection = mysql.createConnection(connectionObj);
    console.info('Connection Established!!!');
    resolve(connection);
  });

  return dbConnection;
};

module.exports = dbConnection;
