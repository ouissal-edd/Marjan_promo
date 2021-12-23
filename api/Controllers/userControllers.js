const {
    create,
    getAllPromo,
    getPromosValid,
    getPromosNoValid,
    deletePromo
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
const nodemailer = require('nodemailer');
const fs = require('fs');
module.exports = {
    // Create PDG
    createUser: (req, res) => {
        const body = req.body;
        const log = body.email_admin;
        const mailpass = body.password_admin;
        const emailadmin = body.to;
        const site = body.site;
        const salt = genSaltSync(10);
        body.password_admin = hashSync(body.password_admin, salt);

        create(body, (err, results) => {
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

            // -----------------------------------

        });
    },
    getPromos: (req, res) => {
        getAllPromo((err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: result
            });
        })
    },
    getStatistics: (req, res) => {

        getPromosValid((err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "database connection error"
                });
            }
            getPromosNoValid((err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "database connection error"
                    });
                }
                console.log(result, results)
                let date_ob = new Date();
                let date = date_ob.getDate();
                let month = date_ob.getMonth();
                let year = date_ob.getFullYear();
                let hours = date_ob.getHours();
                let minutes = date_ob.getMinutes();
                let seconds = date_ob.getSeconds();
                let dateDisplay = `${hours}-${minutes}-${seconds} ${month}-${date}-${year}`;
                const resFs = "Nombre des  promos valide " + result.valid + " Nombre de promos non valide : " + results.novalid + "";
                fs.writeFileSync("C:/wamp64/www/Marjan/public/" + dateDisplay + ".txt", resFs, 'utf8');
                return res.status(200).json({
                    success: 1,
                    data: "Nombre des  promos valide " + result.valid + " Nombre de promos non valide : " + results.novalid + ""

                });

            })

        })
    },
    deletePromos: (req, res) => {
        const id = req.params.id;
        deletePromo(id, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: result
            });
        });
    },




}