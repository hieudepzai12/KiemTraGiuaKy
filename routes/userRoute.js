
const express = require('express');
const userController=require('../mvc/controllers/usercontroller');
const userRouter = express.Router();

userRouter.get('/dangky',userController.dangKy);
userRouter.post('/dangky',userController.dangKy);

userRouter.get("/dangnhap",userController.dangNhap);
userRouter.post("/dangnhap",userController.dangNhap);
userRouter.get("/dangxuat",userController.dangXuat);
module.exports = userRouter;