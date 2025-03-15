const db = require('./database');

const getSlides = async () => {
    const data = await db.query('select * from slide');
    return data;
}

const getAllTheLoai = async () => {
    const data = await db.query('select * from theloai');
    return data;
}

getLoaiTinByIdTL = async (idTL) => {
    const sql = `select * from loaitin where idTheLoai=?`;
    const data = await db.query(sql, idTL);
    return data;
}

getTinNoiBatByIdTL = async (idTL) => {
    const sql = `select * from tintuc where noibat=1 and idLoaiTin=? limit 0, 1`;
    const data = await db.query(sql, idTL);
    return data[0];
}

const getTinTucByIdLT = async (idLT) => {
    const sql = `select * from tintuc where idLoaiTin=?`;
    const data = await db.query(sql, idLT);
    return data;
}

const getPagedTinTucByIdLT = async (idLT, from) => {
    const sql = `select * 
                from tintuc inner join loaitin on tintuc.idLoaiTin = loaitin.id 
                where tintuc.idLoaiTin=? limit ?, 10`;
    const data = await db.query(sql, [idLT, from]);
    return data;
}

const getTheLoaiAndLoaiTin = async (idTL) => {
    const sql = `select theloai.Ten as tenTL, loaitin.Ten as tenLT 
                from theloai inner join loaitin on theloai.id = loaitin.idTheLoai 
                where loaitin.id = ? limit 1`;
    const data = await db.query(sql, idTL);
    return data[0];
}

const getTimKiemByTuKhoa = async (tuKhoaX, tuKhoaY) => {
    const sql = `SELECT * 
                from tintuc 
                where TieuDe like ? or NoiDung like ?`;
    const data = await db.query(sql, [ `%${tuKhoaX}%`, `%${tuKhoaY}%` ]);
    return data;
}

const getPagedTimKiemByTuKhoa = async (tuKhoaX, tuKhoaY, from) => {
    const sql = `SELECT * 
                from tintuc 
                where TieuDe like ? or NoiDung like ? limit ? , 10`;
    const data = await db.query(sql, [ `%${tuKhoaX}%`, `%${tuKhoaY}%`, from ]);
    return data;
}

const get4TinLienQuan = async (idLT, idTin) => {
    const sql = `SELECT * from tintuc 
                where idLoaiTin=? and id <> ? limit 4`;
    const data = await db.query(sql, [idLT ,idTin]);
    return data;
}

const getTinByIdTin = async (idTin) => {
    const sql = `SELECT * from tintuc where id=? limit 0, 1`;
    const data = await db.query(sql, idTin);
    return data[0];
}

const get4TinNoiBat = async (idTL) => {
    const sql = `SELECT tintuc.* 
                from tintuc inner join loaitin on tintuc.idLoaiTin = loaiTin.idTheLoai 
                where loaitin.idTheLoai = ? and tintuc.NoiBat = 1
                 limit 4`;
    const data = await db.query(sql, idTL);
    return data;
}

const getCommentByIdTin = async (idTin) => {
    const sql = `SELECT users.id, users.name, comment.NoiDung
            FROM users INNER JOIN comment ON users.id = comment.idUser
            WHERE comment.idTinTuc = ?`;
    const data = await db.query(sql, idTin);
    return data;
}

const addComment = async (idUser, idTin, comment) => {
const sql = `Insert into comment set idUser = ?, idTinTuc = ?, NoiDung = ?`;
await db.query(sql, [idUser, idTin, comment]);

}


module.exports = { getSlides, getAllTheLoai, getLoaiTinByIdTL, getTinNoiBatByIdTL, getPagedTinTucByIdLT, getTheLoaiAndLoaiTin,
    getTinTucByIdLT, getTimKiemByTuKhoa, getPagedTimKiemByTuKhoa, get4TinLienQuan, getTinByIdTin, get4TinNoiBat, addComment, getCommentByIdTin } 