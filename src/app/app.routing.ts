/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { HomeComponent } from './home/home.component';
import { StudiesComponent } from './studies/studies.component';
import { SamplesComponent } from './samples/samples.component';
import { AnalysisBatchesComponent } from './analysis-batches/analysis-batches.component'
import { ResultsComponent } from './results/results.component';
import { ReportsComponent } from './reports/reports.component';
import { AdminComponent } from './admin/admin.component';
import { ConcentrationResolve } from './concentration-types/concentration-types.resolve';
import { UnitResolve } from './units/unit.resolve';
import { ExtractionResolve } from './extraction-batches/extraction-method.resolve';
import { FilterResolve } from './SHARED/filter-type.resolve';
import { MatrixResolve } from './SHARED/matrix.resolve';
import { SampleTypeResolve } from './SHARED/sample-type.resolve';
import { TargetResolve } from './targets/target.resolve';
import { UserResolve } from './SHARED/user.resolve';
import { AnalysisBatchWorksheetComponent } from './analysis-batches/analysis-batch-worksheet/analysis-batch-worksheet.component';
import { DataUploadComponent } from './data-upload/data-upload.component';


export const ROUTES: Routes = [
    { path: 'login', component: AuthenticationComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
    { path: 'studies', component: StudiesComponent, canActivate: [AuthenticationGuard] },
    { path: 'samples', component: SamplesComponent, canActivate: [AuthenticationGuard] },
    { path: 'analysisbatches', component: AnalysisBatchesComponent, canActivate: [AuthenticationGuard] },
    { path: 'analysisbatchworksheet/:id', component: AnalysisBatchWorksheetComponent, canActivate: [AuthenticationGuard] },
    { path: 'dataupload', component: DataUploadComponent, canActivate: [AuthenticationGuard] },
    { path: 'results', component: ResultsComponent, canActivate: [AuthenticationGuard] },
    { path: 'reports', component: ReportsComponent, canActivate: [AuthenticationGuard] },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthenticationGuard],
        resolve: {
            concentrationTypes: ConcentrationResolve,
            units: UnitResolve,
            extractionMethods: ExtractionResolve,
            filterTypes: FilterResolve,
            matrixTypes: MatrixResolve,
            sampleTypes: SampleTypeResolve,
            targets: TargetResolve,
            users: UserResolve
        }
    }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
