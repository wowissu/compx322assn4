const mysql = require('mysql2');

const MYSQL_HOST = 'learn-mysql.cms.waikato.ac.nz';
const MYSQL_DATABASE = 'zs284';
const MYSQL_USERNAME = 'zs284';
const MYSQL_PASSWORD = 'my525041sql';

// DB Connection
const dbConfig = {
  host: MYSQL_HOST,
  user: MYSQL_USERNAME,
  database: MYSQL_DATABASE,
  password: MYSQL_PASSWORD
};

const db = mysql.createConnection(dbConfig);
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Successfully connected to the db');
});

module.exports = db;