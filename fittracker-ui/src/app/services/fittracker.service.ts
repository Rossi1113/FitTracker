import FitTracker from '../models/fittracker.model';
import {Observable} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

//RxJS operator for mapping the observable

// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';


// Issue multiple rest api call to backedn to get response
// and expose them as api here
@Injectable()
export class FitTrackerService {

  api_url = 'http://localhost:3000';
  todoUrl = `${this.api_url}/api/fittracker`;

  constructor(
    private http: HttpClient
  ) { }


  //Create todo, takes a FitTracker Object
  createTodo(todo: FitTracker): Observable<any>{
    //returns the observable of http post request 
    return this.http.post(`${this.todoUrl}`, todo);
  }

  //Read todo, takes no arguments
  getToDos(): Observable<FitTracker[]>{
    return this.http.get(this.todoUrl)
    .pipe(map(res  => {
      //Maps the response object sent from the server        
      return res["data"].docs as FitTracker[];
    }))
  }

  // Get a single todo item
  getTodo(id:string): Observable<FitTracker>{
    return this.http.get(this.todoUrl + "?id=" + id)
    .pipe(map(res  => {
      //Maps the response object sent from the server        
      return res["data"] as FitTracker;
    }))
  }

  //Update todo, takes a FitTracker Object as parameter
  editTodo(todo:FitTracker){
    let editUrl = `${this.todoUrl}`
    //returns the observable of http put request 
    return this.http.put(editUrl, todo);
  }

  deleteTodo(id:string):any{
    //Delete the object by the id
    let deleteUrl = `${this.todoUrl}/${id}`
    return this.http.delete(deleteUrl)
    .pipe(map(res  => {
      return res;
    }))
  }

  //Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}