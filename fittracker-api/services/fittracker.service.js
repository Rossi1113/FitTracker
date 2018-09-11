// This service provides a layer that hides all the underneath db operation
// and expose you with clean CRUD apis

// Gettign the Newly created Mongoose Model we just created 
var FitTracker = require('../models/fittracker.model')

// Saving the context of this module inside the _the variable
_this = this

// ----------------- Below is the CRUD ---------------------

// Async function to get the To do List
// This is the async-await feature introduced in NodeJS 7.6
// Pass query to get records
exports.getTodos = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    var id = query["id"];
    
    // Try Catch the awaited promise to handle the error     
    try {
        if (id) {
            var todos = await FitTracker.findById(id);
        } else {
            var todos = await FitTracker.paginate(query, options);
        }
        // Return the todod list that was retured by the mongoose promise
        return todos;
    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Todos' + e);
    }
}

exports.createTodo = async function(todo){
    // Creating a new Mongoose Object by using the new keyword
    var newTodo = new FitTracker({
        excercise: todo.excercise,
        category: todo.category,
        duration: todo.duration,
        calory: todo.calory,
        date: new Date()
    })

    try{
        // Saving the Todo 
        var savedTodo = await newTodo.save()
        return savedTodo;
    }catch(e){
        // return a Error message describing the reason     
        throw Error("Error while Creating Todo")
    }
}

exports.updateTodo = async function(todo){
    var id = todo.id

    try{
        //Find the old Todo Object by the Id
        var oldTodo = await FitTracker.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Todo")
    }

    // If no old Todo Object exists return false
    if(!oldTodo){
        return false;
    }

    console.log(oldTodo)

    //Edit the Todo Object
    oldTodo.excercise = todo.excercise
    oldTodo.category = todo.category
    oldTodo.duration = todo.duration
    oldTodo.calory = todo.calory

    console.log(oldTodo)

    try{
        var savedTodo = await oldTodo.save()
        return savedTodo;
    }catch(e){
        throw Error("And Error occured while updating the Todo");
    }
}

exports.deleteTodo = async function(id){    
    // Delete the Todo
    try{
        var deleted = await FitTracker.deleteOne({_id: id})
        if(deleted.result.n === 0){
            throw Error("Todo Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Todo")
    }
}