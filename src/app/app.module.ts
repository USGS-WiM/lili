import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routing";
import { HomeComponent } from "./home/home.component";
import { StudiesComponent } from './studies/studies.component';
import { SamplesComponent } from './samples/samples.component';
import { AnalysisBatchesComponent } from './analysis-batches/analysis-batches.component';
import { ResultsComponent } from './results/results.component';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        StudiesComponent,
        SamplesComponent,
        AnalysisBatchesComponent,
        ResultsComponent,
        ReportsComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ClarityModule.forRoot(),
        ROUTING
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
