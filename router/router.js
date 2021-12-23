const {
    createUser,
    getPromos,
    getStatistics,
    deletePromos

} = require('../api/Controllers/userControllers');
const {
    createPromo,
    createAdminRayon,
    login
} = require('../api/Controllers/adminControllers');
const {
    loginR,
    validPromotion
} = require('../api/Controllers/rayonControllers');
const router = require('express').Router();
const {
    checkToken
} = require('../auth/token_validation')

// Action PDG
router.post('/create', checkToken, createUser);
router.get('/promos', checkToken, getPromos);
router.get('/statistics', checkToken, getStatistics);
router.delete('/delprom/:id', checkToken, deletePromos);




// Acion Admin Center
router.post('/promo', checkToken, createPromo);
router.post('/rayonUser', checkToken, createAdminRayon);
router.post('/loginAdmin', checkToken, login);

// Action Admin Rayon
router.post('/loginRayon', checkToken, loginR);
router.patch('/validation', checkToken, validPromotion);




// router.get('/', checkToken, getUsers);
// router.get('/:id_pdg', getUserByUserId);
// router.patch('/', updateUser);
// router.delete('/', deleteUser);


module.exports = router;