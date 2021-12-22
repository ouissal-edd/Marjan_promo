const connexion = require('../../config/database');
module.exports = {
    // Login
    getUserByUserEmail: (email_admin_rayon, callBack) => {
        connexion.query('select * from admin_rayon where email_admin_rayon=?', [email_admin_rayon],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            })
    },




}