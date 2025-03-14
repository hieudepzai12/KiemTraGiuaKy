// Tạo đối tượng kết nối đến mysql
//1. Cài đặt và import module mysql
const mysql = require('mysql');
const util = require('util');

//2. Tạo đối tượng kết nối đến mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'tintuc_c23c'
});

//3. Chuyển đổi phương thức db.query
//=> trả về một promise
db.query= util.promisify(db.query).bind(db);
//4. Kết nối đến mysql
db.connect((err) => {
    if (err) {
        console.log('Kết nối thất bại');
    } else {
        console.log('Kết nối thành công');
    }
});

//5. Export module
module.exports = db;