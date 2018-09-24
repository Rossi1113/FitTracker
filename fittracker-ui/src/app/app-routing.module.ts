import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrackerDetailComponent } from './tracker-detail/tracker-detail.component';
import { TrackersComponent } from './trackers/trackers.component';

// Route for the detail page
const routes : Routes = [
  {path: 'detail/:id', component: TrackerDetailComponent },
  {path: 'trackers', component: TrackersComponent},
  {path: '', redirectTo: '/trackers', pathMatch: 'full' }
]

@NgModule({
  // This will start the router to listen for url change
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
