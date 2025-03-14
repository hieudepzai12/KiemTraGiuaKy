const db = require('./database');

const checkLogin = async (user) => {
    const sql = 'select * from users where email=? and password=?';
    const data = await db.query(sql, [ user.email, user.password ]);
    if (data.length > 0) {
        return data[0];
    }
    return false;
}

const register = async (user) => {
    const sql = 'insert into users set?';
    await db.query(sql, user);
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