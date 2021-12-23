const connexion = require('../../config/database');
module.exports = {
    // Create promo
    create: (data, callBack) => {
        sql = 'insert into promotion (remise,fk_admin,fk_rayon,fidelite) values(?,?,?,?)'
        connexion.query(sql, [
                data.remise,
                data.fk_admin,
                data.fk_rayon,
                data.fidelite

            ], (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        );
    },
    create_promo: (data, callBack) => {
        sql = 'insert into promo_prod (date_debut,date_fin,fk_prod,fk_promo) values(?,?,?,?)'
        connexion.query(sql, [
                data.date_debut,
                data.date_fin,
                data.fk_prod,
                data.fk_promo,


            ], (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        );
    },
    // end
    // Login
    getUserByUserEmail: (email_admin, callBack) => {
        connexion.query('select * from admin_centre where email_admin=?', [email_admin],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            })
    },
    // create account rayon
    createUserRayon: (data, callBack) => {
        sql = 'insert into admin_rayon (nom_admin_rayon,email_admin_rayon,password_admin_rayon,fk_centre,fk_cat) values(?,?,?,?,?)'
        connexion.query(sql, [
                data.nom_admin_rayon,
                data.email_admin_rayon,
                data.password_admin_rayon,
                data.fk_centre,
                data.fk_cat,


            ], (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        );
    },





}