const router = require('express').Router()
const drinkController = require('../controllers/drinkController')
const {verifyVendor} = require('../middleware/verifyToken')

router.post('/', verifyVendor, drinkController.addDrink)

router.post('/tags/:id', verifyVendor, drinkController.addDrinkTag)

router.post('/type/:id', verifyVendor, drinkController.addDrinkType)

router.get('/:id', drinkController.getDrinkById)

router.get('/:category/:code', drinkController.getRandomByCategoryAndCode)

router.delete('/:id', verifyVendor, drinkController.deleteDrinkById)

router.patch('/:id', verifyVendor, drinkController.drinkAvailability)

router.get('/shop/:shopId', drinkController.getDrinkByShop)

router.get('/shop/:shopId', drinkController.getDrinkByShop)

module.exports = router;