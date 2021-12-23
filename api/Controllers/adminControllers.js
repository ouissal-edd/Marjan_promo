const {
    create,
    create_promo,
    getUserByUserEmail,
    createUserRayon
} = require('../Models/Admin');
const {
    genSaltSync,
    hashSync,
    compare

} = require('bcrypt');
const {
    sign
} = require('jsonwebtoken');
const nodemailer = require('nodemailer');

module.exports = {
    // Create PDG
    createPromo: (req, res) => {
        data = {
            remise: req.body.remise,
            fk_admin: req.body.fk_admin,
            fk_rayon: req.body.fk_rayon,
            fidelite: (req.body.remise / 5) * 50

        }

        console.log(data);
        create(data, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            } else {
                //    ------------------------------
                var rslt = results.insertId;
                data_prom = {
                    date_debut: req.body.date_debut,
                    date_fin: req.body.date_fin,
                    fk_prod: req.body.fk_prod,
                    fk_promo: rslt,

                }
                create_promo(data_prom, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            message: 'Database connection error'
                        });
                    }

                })

                // -------------------------------

            }



        })
    },
    createAdminRayon: (req, res) => {
        const body = req.body;
        const log = body.email_admin_rayon;
        const mailpass = body.password_admin_rayon;
        const emailadmin = body.to;
        const site = body.site;


        console.log(body)
        const salt = genSaltSync(10);
        body.password_admin_rayon = hashSync(body.password_admin_rayon, salt);
        createUserRayon(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            }

            // --------------------------

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MAIL,
                    pass: process.env.PASS
                }
            });


            let mailOptions = {
                from: process.env.MAIL,
                to: emailadmin,
                subject: 'password access platform',
                text: 'votre mot de passe est: ' + mailpass + ',votre email est: ' + log + ', accedez via cette plateforme: ' + site + ''

            };
            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    return console.log('Error occurs');
                } else {
                    console.log('mail sent')
                }


            });
            return res.status(200).json({
                success: 1,
                mail: 'mail sent',
            });
            // -----------------------------------

        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email_admin, (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length == 0) {
                return res.json({
                    success: 0,
                    date: 'invalide email or password1'
                });
            }
            console.log(body.password_admin);
            const resu = compare(body.password_admin, result.password_admin);
            console.log(result.password_admin);
            console.log(resu);
            if (resu) {
                result.password_admin = undefined;
                const jsontoken = sign({
                    result: result
                }, "qwe1234", {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: 'login succesfully',
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