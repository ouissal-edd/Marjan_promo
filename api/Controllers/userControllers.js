const {
    create,
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



}