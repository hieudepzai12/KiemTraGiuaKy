const express = require("express");
const tinTucRouter = express.Router();
const tinTucController = require('../mvc/controllers/tintuccontroller');

tinTucRouter.get('/:idLT/page:page', tinTucController.loaiTinPhanTrang);

module.exports = tinTucRouter;