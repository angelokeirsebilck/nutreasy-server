const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Food = require('../../models/Food');
const axios = require('axios');
var request = require('request');

// @route   PATCH api/food
// @desc    Update Food
// @access  Private
router.patch(
    '/:id',
    [
        auth,
        check('name', 'name is required.').not().isEmpty(),
        check('measurement_description', 'measurement_description is required').not().isEmpty(),
        check('calories', 'calories is required').not().isEmpty(),
        check('number_of_units', 'number_of_units is required').not().isEmpty(),
        check('carbohydrate', 'carbohydrate is required').not().isEmpty(),
        check('protein', 'protein is required').not().isEmpty(),
        check('fat', 'fat is required').not().isEmpty(),
        check('favorite', 'favorite is required').not().isEmpty(),
    ],
    async (req, res) => {
        const id = req.params.id;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send({
                errors: errors.array(),
            });
        }

        // Destructure the request
        const {
            name,
            measurement_description,
            number_of_units,
            calories,
            carbohydrate,
            protein,
            fat,
            favorite,
        } = req.body;

        // Build food object
        const foodFields = {};
        foodFields.user = req.user.id;
        if (name) foodFields.name = name;
        if (measurement_description) foodFields.measurement_description = measurement_description;
        if (number_of_units) foodFields.number_of_units = number_of_units;
        if (carbohydrate) foodFields.carbohydrate = carbohydrate;
        if (protein) foodFields.protein = protein;
        if (protein) foodFields.protein = protein;
        if (fat) foodFields.fat = fat;
        if (typeof favorite != 'undefined') foodFields.favorite = favorite;
        if (calories) foodFields.calories = calories;

        try {
            let food = Food.findById(id);
            if (food) {
                // Update
                food = await Food.findOneAndUpdate(
                    {
                        _id: id,
                    },
                    {
                        $set: foodFields,
                    },
                    {
                        new: true,
                    }
                );
            }
            return res.send(food);
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   POST api/food
// @desc    Add food for current logged in user
// @access  Private
router.post(
    '',
    [
        auth,
        check('name', 'name is required.').not().isEmpty(),
        check('measurement_description', 'measurement_description is required').not().isEmpty(),
        check('calories', 'calories is required').not().isEmpty(),
        check('number_of_units', 'number_of_units is required').not().isEmpty(),
        check('carbohydrate', 'carbohydrate is required').not().isEmpty(),
        check('protein', 'protein is required').not().isEmpty(),
        check('fat', 'fat is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send({
                errors: errors.array(),
            });
        }

        // Destructure the request
        const {
            name,
            measurement_description,
            number_of_units,
            calories,
            carbohydrate,
            protein,
            fat,
            favorite,
        } = req.body;

        // Build food object
        const foodFields = {};
        foodFields.user = req.user.id;
        if (name) foodFields.name = name;
        if (measurement_description) foodFields.measurement_description = measurement_description;
        if (number_of_units) foodFields.number_of_units = number_of_units;
        if (carbohydrate) foodFields.carbohydrate = carbohydrate;
        if (protein) foodFields.protein = protein;
        if (protein) foodFields.protein = protein;
        if (fat) foodFields.fat = fat;
        if (typeof favorite != 'undefined') foodFields.favorite = favorite;
        if (calories) foodFields.calories = calories;

        try {
            let food = await Food.findOne({
                user: req.user.id,
                name,
            });

            if (food) {
                return res.status(400).send({
                    errors: [
                        {
                            msg: `Food with name ${name} already exist.`,
                        },
                    ],
                });
            }

            food = new Food(foodFields);
            await food.save();
            return res.send(food);
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   POST api/foodSearch
// @desc    Add food for current logged in user
// @access  Private
router.post(
    '/foodSearch',
    [
        auth,
        check('name', 'name is required.').not().isEmpty(),
        check('measurement_description', 'measurement_description is required').not().isEmpty(),
        check('calories', 'calories is required').not().isEmpty(),
        check('number_of_units', 'number_of_units is required').not().isEmpty(),
        check('carbohydrate', 'carbohydrate is required').not().isEmpty(),
        check('protein', 'protein is required').not().isEmpty(),
        check('fat', 'fat is required').not().isEmpty(),
        check('searchId', 'searchId is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send({
                errors: errors.array(),
            });
        }

        // Destructure the request
        const {
            name,
            measurement_description,
            number_of_units,
            calories,
            carbohydrate,
            protein,
            fat,
            favorite,
            searchId,
        } = req.body;

        // Build food object
        const foodFields = {};
        foodFields.user = req.user.id;
        if (name) foodFields.name = name;
        if (measurement_description) foodFields.measurement_description = measurement_description;
        if (number_of_units) foodFields.number_of_units = number_of_units;
        if (carbohydrate) foodFields.carbohydrate = carbohydrate;
        if (protein) foodFields.protein = protein;
        if (fat) foodFields.fat = fat;
        if (typeof favorite != 'undefined') foodFields.favorite = favorite;
        if (calories) foodFields.calories = calories;
        foodFields.search = true;
        if (searchId) foodFields.searchId = searchId;

        try {
            let food = await Food.findOne({
                user: req.user.id,
                name,
                search: true,
            });
            if (food) {
                return res.send(food);
            }

            food = new Food(foodFields);
            await food.save();
            return res.send(food);
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   GET api/food
// @desc    Get all own food for current user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const ownFood = await Food.find({
            user: req.user.id,
        });

        res.send(ownFood);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/food/favorite
// @desc    Get all favorite food for current user
// @access  Private
router.get('/favorite', auth, async (req, res) => {
    try {
        const favoFood = await Food.find({
            user: req.user.id,
            favorite: true,
        });
        res.send(favoFood);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error', error.message);
    }
});

// @route   POST api/food/searchFood
// @desc    Get all food searched by string
// @access  Private
router.post(
    '/searchFood',
    [auth, check('searchString').not().isEmpty(), check('token').not().isEmpty()],
    async (req, res) => {
        const { token, searchString } = req.body;
        try {
            var options = {
                method: 'GET',
                url: `https://platform.fatsecret.com/rest/server.api?method=foods.search&search_expression=${searchString}&format=json`,
                headers: { Authorization: `Bearer ${token}` },
                json: true,
            };

            const fixieRequest = await request.defaults({ proxy: process.env.FIXIE_URL });

            fixieRequest(options, function (error, response, body) {
                if (error) throw new Error(error);

                res.send(body);
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error', error.message);
        }
    }
);

// @route   POST api/food/searchFoodById
// @desc    Get fatsecret food by ID
// @access  Private
router.post(
    '/searchFoodById',
    [auth, check('id').not().isEmpty(), check('token').not().isEmpty()],
    async (req, res) => {
        const { token, id } = req.body;
        try {
            var options = {
                method: 'GET',
                url: `https://platform.fatsecret.com/rest/server.api?method=food.get.v2&food_id=${id}&format=json`,
                headers: { Authorization: `Bearer ${token}` },
                json: true,
            };

            const fixieRequest = await request.defaults({ proxy: process.env.FIXIE_URL });

            fixieRequest(options, function (error, response, body) {
                if (error) throw new Error(error);

                res.send(body);
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error', error.message);
        }
    }
);

module.exports = router;
