import { Component, OnInit, Input } from '@angular/core';
import FitTracker from '../models/fittracker.model';
import { Response } from '@angular/http';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FitTrackerService } from '../services/fittracker.service';

@Component({
  selector: 'app-tracker-detail',
  templateUrl: './tracker-detail.component.html',
  styleUrls: ['./tracker-detail.component.scss']
})
export class TrackerDetailComponent implements OnInit {
  
  // Need this input since the outside parent component will bind
  // variable to this
  @Input() tracker : FitTracker;

  constructor( 
    private route: ActivatedRoute,
    private fittrackerService: FitTrackerService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getTracker();
  }

  getTracker() : void {
    const id = this.route.snapshot.paramMap.get('id');
    this.fittrackerService.getTodo(id.toString())
      .subscribe(todos => {
        //assign the todolist property to the proper http response
        this.tracker = todos
        console.log(todos)
      })
  }
}
