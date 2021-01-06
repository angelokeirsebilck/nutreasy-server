const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Food = require('../../models/Food');
const FoodEntry = require('../../models/FoodEntry');
const moment = require('moment');

// @route   POST api/foodEntry
// @desc    Create/Update food entry for current loggedin user for a specific time of day (breakfast, lunc, dinner, snack)
// @access  Private
router.post(
  '',
  [
    auth,
    check('date', 'Date is required.').not().isEmpty(),
    check('food', 'Food is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({
        errors: errors.array(),
      });
    }

    // Destructure the request
    const { date, food } = req.body;
    let formatDate = moment(date, 'YYYY-MM-DD')
      .minute(0)
      .hour(0)
      .seconds(0)
      .millisecond(0)
      .utcOffset('+00:00');

    // Build food object
    const foodEntryFields = {};
    foodEntryFields.user = req.user.id;
    if (formatDate) foodEntryFields.date = formatDate;
    if (food) foodEntryFields.food = food;

    try {
      let foodEntry = await FoodEntry.findOne({
        user: req.user.id,
        date,
      });

      if (foodEntry) {
        // Update
        foodEntry = await FoodEntry.findOneAndUpdate(
          {
            user: req.user.id,
            date,
          },
          {
            $set: foodEntryFields,
          },
          {
            new: true,
          }
        )
          .populate({
            path: 'food.breakfast.foodItem',
            model: ['food'],
          })
          .populate({
            path: 'food.lunch.foodItem',
            model: 'food',
          })
          .populate({
            path: 'food.dinner.foodItem',
            model: 'food',
          })
          .populate({
            path: 'food.snack1.foodItem',
            model: 'food',
          })
          .populate({
            path: 'food.snack2.foodItem',
            model: 'food',
          })
          .populate({
            path: 'food.snack3.foodItem',
            model: 'food',
          });
        return res.send(foodEntry);
      }

      foodEntry = new FoodEntry(foodEntryFields);

      await foodEntry.save();
      foodEntry = await FoodEntry.findOne({
        user: req.user.id,
        date,
      })
        .populate({
          path: 'food.breakfast.foodItem',
          model: ['food'],
        })
        .populate({
          path: 'food.lunch.foodItem',
          model: 'food',
        })
        .populate({
          path: 'food.dinner.foodItem',
          model: 'food',
        })
        .populate({
          path: 'food.snack1.foodItem',
          model: 'food',
        })
        .populate({
          path: 'food.snack2.foodItem',
          model: 'food',
        })
        .populate({
          path: 'food.snack3.foodItem',
          model: 'food',
        });
      return res.send(foodEntry);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/foodEntry
// @desc    Get foodEntries for specific day
// @access  Private
router.get('/', auth, async (req, res) => {
  // Destructure the request
  const { date } = req.body;
  let formatDate = moment(date, 'YYYY-MM-DD')
    .minute(0)
    .hour(0)
    .seconds(0)
    .millisecond(0)
    .utcOffset('+00:00');

  try {
    const foodEntry = await FoodEntry.findOne({
      user: req.user.id,
      date: formatDate,
    })
      .populate({
        path: 'food.breakfast.foodItem',
        model: 'food',
      })
      .populate({
        path: 'food.lunch.foodItem',
        model: 'food',
      })
      .populate({
        path: 'food.dinner.foodItem',
        model: 'food',
      })
      .populate({
        path: 'food.snack1.foodItem',
        model: 'food',
      })
      .populate({
        path: 'food.snack2.foodItem',
        model: 'food',
      })
      .populate({
        path: 'food.snack3.foodItem',
        model: 'food',
      });

    res.send(foodEntry);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error', error.message);
  }
});

module.exports = router;
