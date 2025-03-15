const userModel = require('../models/usermodel');
const bcrypt = require('bcrypt');

const dangNhap = async (req, res) => {
    var error = '';
    if (req.method === 'GET') {
        const user = req.session.name;
        const sessionState = req.session.logined;
        res.render('dangnhap', { user, sessionState, error });
    } else {
        const loginData = req.body;
        let userData = await userModel.checkLogin(loginData);
        if (userData) {
            req.session.logined = true;
            req.session.name = userData.name;
            req.session.idUser = userData.id;
            res.redirect('/');
        } else {
            error = 'Đăng nhập thất bại! Sai tài khoản hoặc mật khẩu.';
            res.render('dangnhap', { error });
        }
    }
}

const dangXuat = async (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

const dangKy = async (req, res) => {
    if (req.method === 'GET') {
        const user = req.session.name;
        const sessionState = req.session.logined;
        res.render('dangky', { user, sessionState });
    } else {
        const registerData = req.body;
        const checkEmail = await userModel.checkEmail(registerData.email);
        if (checkEmail) {
            registerData.password = await bcrypt.hash(registerData.password, 10);
            await userModel.register(registerData);
            res.send(true);
        } else {
            res.send(false);
        }
    }
}

module.exports = { dangNhap, dangXuat, dangKy }