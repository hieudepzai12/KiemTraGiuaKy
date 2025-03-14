const { use } = require('../../routes/tintucroute');
const userModel = require('../models/usermodel');
const md5 = require('js-md5');

const dangNhap = async (req, res) => {
    var error = '';
    if (req.method === 'GET') {
        user = req.session.name;
        sessionState = req.session.logined;
        res.render('dangnhap', { user, sessionState, error });
    } else {
        const loginData = req.body;
        loginData.password = md5(loginData.password);
        let userData = await userModel.checkLogin(loginData);
        if (userData) {
            req.session.logined = true;
            req.session.name = userData.name;
            req.session.id = userData.id;
            res.redirect('/');
        } else if (!userData) {
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
        user = req.session.name;
        sessionState = req.session.logined;
        res.render('dangky');
    } else {
        const registerData = req.body;
        const checkEmail = await userModel.checkEmail(registerData.email);
        if (checkEmail) {
            registerData.password = md5(registerData.password);
            await userModel.register(registerData);
            resData = true;
            res.send(true);
        }
        else {
            res.send(false);
        }
    }
}

module.exports = { dangNhap, dangXuat, dangKy }