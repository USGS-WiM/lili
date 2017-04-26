import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule, MdSidenavModule, MdListModule, MdIconModule} from '@angular/material';

import { AppComponent } from './app.component';
import { StudiesComponent } from './studies/studies.component';
import { SamplesComponent } from './samples/samples.component';
import { ReportsComponent } from './reports/reports.component';
import { ResultsComponent } from './results/results.component';
import { AnalysisBatchesComponent } from './analysis-batches/analysis-batches.component';

@NgModule({
  declarations: [
    AppComponent,
    StudiesComponent,
    SamplesComponent,
    ReportsComponent,
    ResultsComponent,
    AnalysisBatchesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdSidenavModule,
    MdListModule,
    MdIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
