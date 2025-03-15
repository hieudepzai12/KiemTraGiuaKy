const db = require('./database');
const bcrypt = require('bcrypt');

const checkLogin = async (user) => {
    const sql = 'select * from users where email=?';
    const data = await db.query(sql, [user.email]);
    if (data.length > 0) {
        const match = await bcrypt.compare(user.password, data[0].password);
        if (match) {
            return data[0];
        }
    }
    return false;
}

const register = async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const sql = 'insert into users set?';
    await db.query(sql, { ...user, password: hashedPassword });
}

const checkEmail = async (email) => {
    const sql = 'select * from users where email=?';
    const data = await db.query(sql, email);
    if (data.length > 0) {
        return false;
    }
    return true;
}

module.exports = { checkLogin, register, checkEmail }