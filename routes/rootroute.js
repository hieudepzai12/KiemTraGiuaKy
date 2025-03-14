const express = require("express");
const rootRouter = express.Router();
const tinTucRouter = require('./tintucroute');
const tintuccontroller = require('../mvc/controllers/tintuccontroller');
const userController = require('../mvc/controllers/usercontroller');

//Tin tuc
rootRouter.get('/', tintuccontroller.trangChu);
rootRouter.use('/loaitin', tinTucRouter);
rootRouter.get('/chitiet/:idLT/:idTin', tintuccontroller.chiTiet);

//User
rootRouter.use('/dangnhap', userController.dangNhap)
rootRouter.get('/dangxuat', userController.dangXuat);
rootRouter.use('/dangky', userController.dangKy);

//tim kiem
rootRouter.get('/timkiem', tintuccontroller.timKiem);
rootRouter.get('/timkiem/page:page/:tuKhoa', tintuccontroller.timKiem);

//chuc nang phu
rootRouter.get('/gioithieu', (req, res) => {
    username = req.session.name;
    sessionState = req.session.logined;
    res.render('gioithieu', { username, sessionState });
})
rootRouter.get('/lienhe', (req, res) => {
    username = req.session.name;
    sessionState = req.session.logined;
    res.render('lienhe', { username, sessionState });
})

module.exports = rootRouter;