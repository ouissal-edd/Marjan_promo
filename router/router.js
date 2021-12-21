const {
    createUser,
    login
} = require('../api/Controllers/userControllers');
const router = require('express').Router();
const {
    checkToken
} = require('../auth/token_validation')

router.post('/createpdg', checkToken, createUser);
// router.get('/', checkToken, getUsers);
// router.get('/:id_pdg', getUserByUserId);
// router.patch('/', updateUser);
// router.delete('/', deleteUser);
router.post('/login', login);


module.exports = router;