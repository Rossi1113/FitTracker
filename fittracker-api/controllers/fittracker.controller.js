// This controller is being used in the mean.route.js

// Accessing the Service that we just created
var FitTrackerService = require('../services/fittracker.service')

// Saving the context of this module inside the _the variable
_this = this


// Async Controller function to get the To do List
// Notice the parameters differnce in this getTodos and 
// the one in service. 
exports.getTodos = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 100; 
    var todoId = req.query.id;

    try{  
        if (todoId != undefined) {
            var todos = await FitTrackerService.getTodos({"id":todoId}, page, limit)
        } else {
            // No query param, return everything
            var todos = await FitTrackerService.getTodos({}, page, limit)
        }
        
        // Return the todos list with the appropriate HTTP Status Code and Message.      
        return res.status(200).json({status: 200, data: todos, message: "Succesfully Todos Recieved"});    
    }catch(e){        
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createTodo = async function(req, res, next){

    // Req.Body contains the form submit values.
    var todo = {
        excercise: req.body.excercise,
        category: req.body.category,
        duration: req.body.duration,
        calory: req.body.calory
    }

    try{
        // Calling the Service function with the new object from the Request Body
        var createdTodo = await FitTrackerService.createTodo(todo)
        return res.status(201).json({status: 201, data: createdTodo, message: "Succesfully Created ToDo"})
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.      
        return res.status(400).json({status: 400, message: "Todo Creation was Unsuccesfull"})
    }
}

exports.updateTodo = async function(req, res, next){

    // Id is necessary for the update
    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var todo = {
        id,
        excercise: req.body.excercise ? req.body.excercise : null,
        category: req.body.category ? req.body.category : null,
        duration: req.body.duration ? req.body.duration : null,
        calory: req.body.calory ? req.body.calory : null
    }

    try{
        var updatedTodo = await FitTrackerService.updateTodo(todo)
        return res.status(200).json({status: 200, data: updatedTodo, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeTodo = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await FitTrackerService.deleteTodo(id)
        return res.status(204).json({status:204, message: "Succesfully Todo Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}