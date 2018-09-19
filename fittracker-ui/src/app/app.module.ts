import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FitTrackerService } from './services/fittracker.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TrackerDetailComponent } from './tracker-detail/tracker-detail.component'

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { TrackersComponent } from './trackers/trackers.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackerDetailComponent,
    TrackersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    FitTrackerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }