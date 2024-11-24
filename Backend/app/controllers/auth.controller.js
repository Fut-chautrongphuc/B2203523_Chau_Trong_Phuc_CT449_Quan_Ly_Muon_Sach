const bcrypt = require('bcryptjs');
const MongoDB = require('../utils/mongodb.util');
const NhanVienService = require('../services/nhanvien.service');
const DocGiaService = require('../services/docgia.service')
const ApiError = require('../api-error');

exports.login = async (req, res, next) => {
    try {
        const nhanVienService = new NhanVienService(MongoDB.client);
        const docGiaService = new DocGiaService(MongoDB.client);

        const { msnv, password } = req.body;

        // Tìm nhân viên
        const employee = await nhanVienService.findById(msnv);
        if (employee.length > 0) {
            const passwordMatch = await bcrypt.compare(password, employee[0].password);
            if (passwordMatch) {
                req.session.user = {
                    msnv: employee[0]._id,
                    hotennv: employee[0].hotennv,
                    chucvu: employee[0].chucvu,
                    role: "nhanvien"
                };
                return res.status(200).send(req.session.user);
            }
        }
        const {madocgia, a} = req.body
        console.log({msnv, password})
        // Nếu không tìm thấy hoặc mật khẩu không đúng, kiểm tra độc giả
        const reader = await docGiaService.findById(msnv);
        if (reader.length > 0) {
            const passwordMatch = await bcrypt.compare(password, reader[0].password);
            if (passwordMatch) {
                req.session.user = {
                    madocgia: reader[0]._id,
                    holot: reader[0].holot,
                    ten: reader[0].ten,
                    role: "docgia"
                };
                return res.status(200).send(req.session.user);
            }
        }

        // Nếu không tìm thấy cả nhân viên và độc giả hoặc mật khẩu không đúng
        return next(new ApiError(401, "Invalid credentials"));
    } catch (error) {
        return next(new ApiError(500, error.message));
    }
};


exports.logout = (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return next(new ApiError(500, "Failed to logout"));
            }

            res.status(200).send({ message: "Logged out successfully" });
        });
    } catch (error) {
        return next(new ApiError(500, error.message));
    }
};

exports.checkLogin = (req, res, next) => {
    if (req.session.user) {
        return res.status(200).send(
            req.session.user
        );
    } else {
        return res.status(401).send({
            message: "User is not logged in"
        });
    }
};

