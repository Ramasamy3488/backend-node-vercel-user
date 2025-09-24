const router = require('express').Router();
const UserController = require('../controllers/userControllers')

router.get('/getUsers', UserController.getUsers);
router.post('/getUser', UserController.getUser);
router.post('/addUser', UserController.addUser);
router.put('/updateUser', UserController.updateUser);
router.delete('/deleteUser', UserController.deleteUser);

module.exports = router;
