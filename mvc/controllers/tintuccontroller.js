const tinTucModel = require('../models/tintucmodel');
const querystring = require('querystring');

const trangChu = async (req, res) => {
    username = req.session.name;
    sessionState = req.session.logined;
    const slides = await tinTucModel.getSlides();
    const listData = [];
    const theloais = await tinTucModel.getAllTheLoai();
    for (var theLoai of theloais) {
        const loaiTin = await tinTucModel.getLoaiTinByIdTL(theLoai.id);
        const tinNoiBat = await tinTucModel.getTinNoiBatByIdTL(theLoai.id);
        if (loaiTin.length > 0) {
            listData.push({ theLoai, loaiTin, tinNoiBat, username, sessionState });
        }
    }
    console.log(listData.loaiTin);
    res.render('index', { slides, listData });
}

const loaiTinPhanTrang = async (req, res) => {
    const idLT = req.params.idLT;
    //Hàm đếm số trang
    const pageCount = Math.ceil((await tinTucModel.getTinTucByIdLT(idLT)).length / 10);
    //Hàm phân trang
    const pageNumber = req.params.page;
    const pagedTinTuc = await tinTucModel.getPagedTinTucByIdLT(idLT, (pageNumber - 1) * 5);
    const fromPage = Math.max(1, (pageNumber - 2));
    const toPage = Math.min((pageNumber + 2), pageCount);
    const tenTLLT = await tinTucModel.getTheLoaiAndLoaiTin(idLT);
    res.render('loaitin', { pagedTinTuc, pageCount, fromPage, toPage, tenTLLT, idLT, pageNumber });
}

const timKiem = async (req, res) => {
    username = req.session.name;
    sessionState = req.session.logined;
    const tuKhoa = req.query.tuKhoa || req.params.tuKhoa;
    const pageCount = Math.ceil((await tinTucModel.getTimKiemByTuKhoa(tuKhoa, tuKhoa)).length / 10);
    const pageNumber = req.params.page || 1;
    const pagedTimKiem = await tinTucModel.getPagedTimKiemByTuKhoa(tuKhoa, tuKhoa, (pageNumber - 1) * 5);
    const fromPage = Math.max(1, (pageNumber - 2));
    const toPage = Math.min((pageNumber + 2), pageCount);
    res.render('timkiem', { pagedTimKiem, pageCount, fromPage, toPage, tuKhoa, pageNumber, username, sessionState });
}

const chiTiet = async (req, res) => {
    if (req.method === 'GET') {
        username = req.session.name;
        sessionState = req.session.logined;
        const idLT = req.params.idLT;
        const idTin = req.params.idTin;
        const chiTiet = await tinTucModel.getTinByIdTin(idTin);
        const comments = await tinTucModel.getCommentByIdTin(idTin);
        const tinLQ = await tinTucModel.get4TinLienQuan(idLT, idTin);
        const tinNB = await tinTucModel.get4TinNoiBat(idLT);
        res.render('chitiet', { username, sessionState, idLT, chiTiet, tinLQ, comments, idTin, tinNB });
    } else {
        username = req.session.name;
        idUser = req.session.id;
        sessionState = req.session.logined;
        const comment = req.body;
        const idTin = req.params.idTin;
        await tinTucModel.addComment(idUser, idTin, comment);
    }

}

// Hàm conment
const addComment = async (req, res) => {
let comment = req.body.comment;
let idTin= req.body.idTin;
console.log(idTin);
let idUser = req.session.idUser;
console.log(comment, idTin, idUser);
await tinTucModel.addComment(idUser, idTin, comment);
console.log(comment);
}

module.exports = { trangChu, loaiTinPhanTrang, timKiem, chiTiet, addComment };