var express = require('express')

var router = express.Router()

// Getting the Controller that we just created
var FitTrackerController = require('../../controllers/fittracker.controller');

// Map each API to the Controller FUnctions

router.get('/', FitTrackerController.getTodos)

router.post('/', FitTrackerController.createTodo)

router.put('/', FitTrackerController.updateTodo)

router.delete('/:id',FitTrackerController.removeTodo)


// Export the Router

module.exports = router;