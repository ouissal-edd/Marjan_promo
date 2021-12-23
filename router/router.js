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
router.post('/create', createUser);
router.get('/promos', getPromos);
router.get('/statistics', getStatistics);
router.delete('/delprom/:id', deletePromos);




// Acion Admin Center
router.post('/promo', checkToken, createPromo);
router.post('/rayonUser', checkToken, createAdminRayon);
router.post('/loginAdmin', checkToken, login);

// Action Admin Rayon
router.post('/loginRayon', loginR);
router.patch('/validation', checkToken, validPromotion);




module.exports = router;