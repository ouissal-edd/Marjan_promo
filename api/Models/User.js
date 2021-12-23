const connexion = require('../../config/database');
module.exports = {
    // create PDG
    // recevoir datat from controller and two parametre for error result filds
    create: (data, callBack) => {
        sql = 'insert into admin_centre (nom_admin,email_admin,password_admin,fkcentre) values(?,?,?,?)'
        connexion.query(sql, [
                data.nom_admin,
                data.email_admin,
                data.password_admin,
                data.fkcentre

            ], (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        );
    },
    // get all promotion
    getAllPromo: (callBack) => {
        connexion.query(
            'SELECT promo_prod.date_debut,promo_prod.date_fin, promo_prod.status,promo_prod.commentaire ,promotion.fidelite,promotion.remise,produit.nom_prod,produit.prix,produit.qte_prod,admin_rayon.fk_centre, centre.nom_centre,ville.nom_ville FROM promo_prod INNER JOIN promotion on promo_prod.fk_promo=promotion.id_promo INNER JOIN produit ON promo_prod.fk_prod=produit.id_prod INNER join admin_rayon on admin_rayon.id_admin_rayon=promotion.fk_rayon INNER JOIN centre on centre.id_centre=admin_rayon.fk_centre INNER JOIN ville on ville.id_ville= centre.fk_ville ',

            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }

        )
    },
    getPromosValid: (callBack) => {
        connexion.query(
            'SELECT COUNT(status) as valid FROM promo_prod WHERE status=1 ',

            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }

        )
    },
    getPromosNoValid: (callBack) => {
        connexion.query(
            'SELECT COUNT(status) as novalid FROM promo_prod WHERE status=0 ',

            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }

        )
    },
    deletePromo: (id, callBack) => {
        connexion.query(
            'DELETE FROM promo_prod WHERE id_promo_prod=?',
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },




}