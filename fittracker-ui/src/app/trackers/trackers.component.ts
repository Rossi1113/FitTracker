import { Response } from '@angular/http';
import { FitTrackerService } from '../services/fittracker.service';
import FitTracker from '../models/fittracker.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trackers',
  templateUrl: './trackers.component.html',
  styleUrls: ['./trackers.component.scss']
})
export class TrackersComponent implements OnInit {

  constructor(
    //Private fittrackerService will be injected into the component by Angular Dependency Injector
    private fittrackerService: FitTrackerService
  ) { }

  //Declaring the new todo Object and initilizing it
  public newTodo: FitTracker = new FitTracker()

  //An Empty list for the visible todo list
  todosList: FitTracker[];
  editTodos: FitTracker[] = [];


  ngOnInit(): void {

    //At component initialization the 
    this.fittrackerService.getToDos()
      .subscribe(todos => {
        //assign the todolist property to the proper http response
        this.todosList = todos
        console.log(todos)
      })
  }

  //This method will get called on Create button event
  create() {
    this.fittrackerService.createTodo(this.newTodo)
      .subscribe((res) => {
        // push the saved todo into todoList and clear the newTodo for next time use
        this.todosList.push(res.data)
        this.newTodo = new FitTracker()
      })
  }

  // edit the selected todo
  editTodo(todo: FitTracker) {
    console.log(todo)
    if(this.todosList.includes(todo)){
      if(!this.editTodos.includes(todo)){
        this.editTodos.push(todo)
      }else{
        // remove todo from editTodos
        this.editTodos.splice(this.editTodos.indexOf(todo), 1)
        this.fittrackerService.editTodo(todo).subscribe(res => {
          console.log('Update Succesful')
        }, err => {
          this.editTodo(todo)
          console.error('Update Unsuccesful')
        })
      }
    }
  }

  // When in inline-edit mode, if pressing enter key, try to save
  submitTodo(event, todo:FitTracker){
    if(event.keyCode ==13){
      this.editTodo(todo)
    }
  }

  // Right now there is an issue with delete api
  // Even though underneath the data is removed from mongodb
  // The status code returned is 400
  // So to make the ui happy, after issuing the request
  // I will assume it succeeds and remove the todo directly
  deleteTodo(todo: FitTracker) {
    this.fittrackerService.deleteTodo(todo._id).subscribe(res => {
      // If success, remove the todo from todoList
      // Comment out due to the above reason
      // this.todosList.splice(this.todosList.indexOf(todo), 1);
    })
    this.todosList.splice(this.todosList.indexOf(todo), 1);
  }

}
