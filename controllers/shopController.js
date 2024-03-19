const Shop = require('../models/Shop')

module.exports = {
    addShop: async(req, res) => {

        const newShop = new Shop(req.body)

        try {
            await newShop.save()
            res.status(201).json({status: true, message: "Shop successfully created"})
        } catch (error) {
            res.status(500).json({status: false, message: "Error creating shop", error: error.message})
        }
    },

    serviceAvailability: async(req, res) => {
        const shopId = req.params.id;

        try {
            const shop = await Shop.findId(shopId)

            if(!shop) {
                return res.status(404).json({status: false, message:"Shop not found"})
            }

            shop.isAvailable = !shop.isAvailable

            await shop.save()
            res.status(200).json({status: true, message: "Availability successfully toggled", isAvailable: shop.isAvailable})
        } catch (error) {
            res.status(500).json({status: true, message: "Error toggling shop"})
        }
    },

    deleteShop: async(req, res) => {
        const shopId = req.params.id;

        try {
            const shop = await Shop.findId(shopId)

            if(!shop) {
                return res.status(403).json({status: false, message:"Shop not found"})
            }

            await Shop.findByIdAndDelete(shopId)
            res.status(200).json({status: true, message: "Shop successfully deleted"})
        } catch (error) {
            res.status(500).json({status: true, message: "Error deleting shop"})
        }

    },

    getShop: async (req, res) => {
        const shopId = req.params.id

        try {
            const shop = await Shop.findId(shopId)

            if(!shop) {
                return res.status(404).json({status: false, message:"Shop not found"})
            }

            res.status(200).json(shop)
        } catch (error) {
            res.status(500).json({status: true, message: "Error retrieving the shop"})
        }
    },

    getRandomShops: async(req, res) => {
        try {
            let randomShop = [];

            if(req.params.code){
                randomShop = await Shop.aggregate([
                    {$match: {code: req.params.code}},
                    {$sample: {size: 5}},
                    {$project: {__v: 0}}
                ]);
            }

            if(!randomShop.length){
                randomShop = await Shop.aggregate([
                    {$sample: {size: 5}},
                    {$project: {__v: 0}}
                ]);
            }

            if(randomShop.length){
                res.status(200).json(randomShop)
            }

        } catch (error) {
            res.status(500).json({status: false, message: "Error finding shops"})
        }
    }
}