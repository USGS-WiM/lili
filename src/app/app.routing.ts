/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { StudiesComponent } from './studies/studies.component';
import { SamplesComponent } from './samples/samples.component';
import { AnalysisBatchesComponent} from './analysis-batches/analysis-batches.component'
import { ResultsComponent } from './results/results.component';
import { ReportsComponent } from './reports/reports.component';
import { AdminComponent } from './admin/admin.component';


export const ROUTES: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'studies', component: StudiesComponent},
    {path: 'samples', component: SamplesComponent},
    {path: 'analysisbatches', component: AnalysisBatchesComponent},
    {path: 'results', component: ResultsComponent},
    {path: 'reports', component: ReportsComponent},
    {path: 'admin', component: AdminComponent}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
