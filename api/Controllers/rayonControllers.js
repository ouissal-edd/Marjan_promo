const {
    getUserByUserEmail,
    getPromo,
    validationPromotion
} = require('../Models/Rayon');
const {
    compare

} = require('bcrypt');
const {
    sign,
    decode
} = require('jsonwebtoken');

module.exports = {
    loginR: (req, res) => {
        let date_ob = new Date();
        if (date_ob.getHours() >= 8 && date_ob.getHours() < 15) {
            const body = req.body;
            getUserByUserEmail(body.email_admin_rayon, (err, result) => {
                if (err) {
                    console.log(err);
                }
                if (result.length == 0) {
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

                    // Get Promotionn
                    var decoded = decode(jsontoken);
                    console.log(decoded.result[0].id_admin_rayon);

                    const id = decoded.result[0].id_admin_rayon;
                    getPromo(id, (err, reslt) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                success: 0,
                                message: "database connection error"
                            });
                        }
                        return res.status(200).json({
                            success: 1,
                            data: reslt,
                            success: 1,
                            message: 'Admin Rayon has logged  succesfully',
                            token: jsontoken

                        });
                    });
                    // -------------------------------

                } else {
                    return res.json({
                        success: 0,
                        data: "invalid email or password"
                    })
                }
            });
        } else {
            return res.json({
                success: 0,
                data: "hors session"
            })
        }

    },


    validPromotion: (req, res) => {
        const body = req.body;
        data = {
            status: body.status,
            commentaire: body.commentaire,
            id_promo_prod: body.id_promo_prod
        }

        validationPromotion(data, (err, result) => {
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