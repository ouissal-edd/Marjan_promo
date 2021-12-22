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




}