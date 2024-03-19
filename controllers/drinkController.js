const Drink = require('../models/Drink')

module.exports = {
    addDrink: async (req, res)=> {
        const newDrink = new Drink(req.body)

        try {
            await newDrink.save();

            res.status(200).json({status: true, message: "Drink item added successfully "})
        } catch (error) {
            res.status(500).json({status: false, message: 'Drink item could not be saved successfully!'})           
        }
    },

    getDrinkById: async (req, res)=> {
        const drinkId = req.params.id

        try {
            const drink = await Drink.findById(drinkId)

            if(!drink){
                return res.status(404).json({status: false, message: 'Food not found!'})
            }

            res.status(200).json(drink)
        } catch (error) {
            res.status(500).json({status: false, message: 'Failed to get a drink item!'})
        }
    },

    getDrinkByShop: async (req, res)=> {
        const shopId = req.params.shopId;

        try {
            const drinks = await Drink.find({shop: shopId});

            if(!drinks || drinks.length === 0){
                return res.status(404).json({status: false, message: 'No drink Items found!'})
            }

            res.status(200).json(drinks)
        } catch (error) {
            res.status(500).json({status: false, message: error.message})
        }
    },

    deleteDrinkById: async (req, res)=> {
        const drinkId = req.params.id;

        try {
            const drink = await Drink.findById(drinkId);

            if(!drink){
                return res.status(404).json({status: false, message: 'Drink item not found!'})
            }

            await Drink.findByIdAndDelete(drinkId)
            res.status(200).json({status: true, message: 'Drink item successfully deleted!'})
        } catch (error) {
            res.status(500).json({status: false, message: error.message})
        }
    },

    drinkAvailability: async (req, res)=> {
        const drinkId = req.params.id;

        try {
            const drink = await Drink.findById(drinkId)

            if(!drink){
                return res.status(404).json({status: false, message: 'Drink item not found!'})
            }

            drink.isAvailable = !drink.isAvailable;

            await drink.save();

            res.status(200).json({status: true, message: 'Drink availability successfully toggled!'})
        } catch (error) {
            res.status(500).json({status: false, message: error.message})
        }
    },

    updateDrinkById: async (req, res)=> {
        const drinkId = req.params.id;

        try {
            const updatedDrink = await Drink.findByIdAndUpdate(
                drinkId, 
                req.body,
                {new: true, runValidators: true});
                
            if(!updatedDrink){
                return res.status(404).json({status: false, message: 'Drink item not updated!'})
            }

            res.status(200).json({status: true, message: 'Drink item successfully updated!'})
        } catch (error) {
            res.status(500).json({status: false, message: error.message})
        }
    },

    addDrinkTag: async (req, res)=> {
        const drinkId =req.params.id;
        const {tag} = req.body

        try {
            const drink = await Drink.findById(drinkId)

            if(!drink){
                return res.status(404).json({status: false, message: 'Drink item not found!'})
            }

            if(drink.drinkTags.includes(tag)){
                return res.status(400).json({status: false, message: 'Tag already exist!'})
            }
            
            drink.drinkTags.push(tag)
            await drink.save();
            res.status(200).json({ status: true, message: 'Drink tag successfully added!'})
        } catch (error) {
            res.status(500).json({ status: false, message: error.message})
        }
    },

    getRandomDrinksByCode: async (req, res)=> {
        try {
            const randomDrinkItem = await Drink.aggregate([
                {$match: {code: req.params.code}},
                {$sample: {size: 5}},
                {$project: {_id: 0}}
            ])

            res.status(200).json(randomDrinkItem)
        } catch (error) {
            res.status(500).json({status: false, message: error.message})
        }
    },

    addDrinkType: async (req, res)=> {
        const drinkId = req.params.id;
        const drinkType = req.body.drinkType;

        try {
            const drink= await Drink.findById(drinkId)

            if(!drink){
                return res.status(404).json({status: false, message: error.message})
            }

            if(drink.drinkType.includes(drinkType)){
                return res.status(400).json({status: false, message: 'Drink type already exist!'})
            }

            drink.drinkType.push(drinkType)

            await drink.save();
            return res.status(200).json({status: true, message: 'Type added successfully!'})
        } catch (error) {
            res.status(500).json({status: false, message: error.message})
        }
    },

    getRandomByCategoryAndCode: async (req, res)=> {
        const {category, code} = req.params;

        try {
            let drinks = await Drink.aggregate([
                {$match: {category: category, code: code}},
                {$sample: {size: 10}}
            ])

            if(!drinks || drinks.length === 0){
                drinks = await Drink.aggregate([
                    {$match: {code: code}},
                    {$sample: {size: 10}}
                ])
            } else(
                drinks = await Drink.aggregate([
                    {$sample: {size: 10}}
                ])
            )

            res.status(200).json(drinks)
        } catch (error) {
            res.status(500).json({status: false, message: error.message})
        }
    },
    
}