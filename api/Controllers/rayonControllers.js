const {
    getUserByUserEmail,
} = require('../Models/Rayon');
const {
    compare

} = require('bcrypt');
const {
    sign
} = require('jsonwebtoken');

module.exports = {
    loginR: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email_admin_rayon, (err, result) => {
            if (err) {
                console.log(err);
            }
            if (!result) {
                return res.json({
                    success: 0,
                    date: 'invalide email or password1'
                });
            }
            const resu = compare(body.password_admin_rayon, result.password_admin_rayon);
            if (resu) {
                result.password_admin_rayon = undefined;
                const jsontoken = sign({
                    result: result
                }, "qwe1234", {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: 'Admin Rayon has logged  succesfully',
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    data: "invalid email or password"
                })
            }
        });
    }

}