const {
    create,
    getUserByUserEmail
} = require('../Models/User');

const {
    genSaltSync,
    hashSync,
    compareSync,
    compare

} = require('bcrypt');
const {
    sign
} = require('jsonwebtoken');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password_pdg = hashSync(body.password_pdg, salt);

        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email_pdg, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            const result = compare(body.password_pdg, results.password_pdg);
            if (result) {
                results.password_pdg = undefined;
                const jsontoken = sign({
                    result: results
                }, "qwe1234", {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    }
}