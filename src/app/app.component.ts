import { Component } from '@angular/core';

import {StudiesComponent} from './studies/studies.component';
import {SamplesComponent} from './samples/samples.component';
import {AnalysisBatchesComponent} from './analysis-batches/analysis-batches.component';
import {ResultsComponent} from './results/results.component';
import {ReportsComponent} from './reports/reports.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  pages: Array<{title: string, component: any}>;

  constructor() {
     this.pages = [
      { title: 'Studies', component: StudiesComponent },
      { title: 'Samples', component: SamplesComponent },
      { title: 'Analysis Batches', component: AnalysisBatchesComponent },
      { title: 'Results', component: ResultsComponent },
      { title: 'Reports', component: ReportsComponent }
    ];
  }
 
}
