const mysql = require('mysql');
const util = require('util');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'tintuc_c23c'
});

db.query = util.promisify(db.query).bind(db);

db.connect((err) => {
    if (err) {
        console.log('Kết nối thất bại');
    } else {
        console.log('Kết nối thành công');
    }
});

module.exports = db;