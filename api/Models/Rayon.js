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
    getPromo: (id, callBack) => {
        connexion.query(
            'SELECT * FROM promo_prod INNER JOIN promotion on promo_prod.fk_promo=promotion.id_promo INNER JOIN produit ON promo_prod.fk_prod=produit.id_prod where fk_rayon=?',
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }

        )
    },
    validationPromotion: (data, callBack) => {
        connexion.query(
            'UPDATE promo_prod SET status=?,commentaire=? WHERE id_promo_prod=?',
            [
                data.status,
                data.commentaire,
                data.id_promo_prod

            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },





}