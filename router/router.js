const {
    createUser,

} = require('../api/Controllers/userControllers');
const {
    createPromo,
    createAdminRayon,
    login
} = require('../api/Controllers/adminControllers');
const {
    loginR,
} = require('../api/Controllers/rayonControllers');
const router = require('express').Router();
const {
    checkToken
} = require('../auth/token_validation')

// Action PDG
router.post('/create', createUser);

// Acion Admin Center
router.post('/promo', createPromo);
router.post('/rayonUser', createAdminRayon);
router.post('/loginAdmin', login);

// Action Admin Rayon
router.post('/loginRayon', loginR);



// router.get('/', checkToken, getUsers);
// router.get('/:id_pdg', getUserByUserId);
// router.patch('/', updateUser);
// router.delete('/', deleteUser);


module.exports = router;