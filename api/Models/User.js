const connexion = require('../../config/database');
module.exports = {
    // create PDG
    // recevoir datat from controller and two parametre for error result filds
    create: (data, callBack) => {
        sql = 'insert into pdg (nom_pdg,email_pdg,password_pdg) values(?,?,?)'
        connexion.query(sql, [
                data.nom_pdg,
                data.email_pdg,
                data.password_pdg
            ], (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        );
    },

    // Create Admin Center



    getUserByUserEmail: (email_pdg, callBack) => {
        connexion.query('select * from pdg where email_pdg=?', [email_pdg],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            })
    }
}