const router = require('express').Router()
const shopController = require('../controllers/shopController')
const { verifyAndAuthorization, verifyVendor } = require('../middleware/verifyToken')


router.post('/', verifyAndAuthorization ,shopController.addShop)

router.get('/byId/:id' ,shopController.getShop)

router.get('/:code' ,shopController.getRandomShops)

router.delete('/:id', verifyVendor  ,shopController.deleteShop)

router.patch('/:id', verifyVendor  ,shopController.serviceAvailability)

module.exports = router;