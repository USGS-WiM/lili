import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';

//imports below are granular to mimimize package bloat from primeng library.
//alternative import from primeng docs is:" import {DataTableModule,SharedModule} from 'primeng/primeng' " which brings in whole primeng library
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { SharedModule } from 'primeng/components/common/shared';

import { AppComponent } from './app.component';
import { ROUTING } from "./app.routing";
import { HomeComponent } from "./home/home.component";
import { StudiesComponent } from './studies/studies.component';
import { SamplesComponent } from './samples/samples.component';
import { AnalysisBatchesComponent } from './analysis-batches/analysis-batches.component';
import { ResultsComponent } from './results/results.component';
import { ReportsComponent } from './reports/reports.component';

//to be removed
import { StudiesFormComponent } from './studies/studies-form/studies-form.component';
//to be removed
import { StudiesTableComponent } from './studies/studies-table/studies-table.component';
import { AdminComponent } from './admin/admin.component';
import { DisplayValuePipe } from './SHARED/display-value.pipe';
import { StudyFilter } from './FILTERS/study-filter/study-filter.component';
import { SampleTypeFilter } from './FILTERS/sample-type-filter/sample-type-filter.component';
import { MatrixTypeFilter } from './FILTERS/matrix-type-filter/matrix-type-filter.component';
import { SamplerNameFilter } from './FILTERS/sampler-name-filter/sampler-name-filter.component';
import { FilterTypeFilter } from './FILTERS/filter-type-filter/filter-type-filter.component';
import { RangeFilter } from './FILTERS/range-filter/range-filter.component';
import { CollectionStartDateFilter } from './FILTERS/collection-start-date-filter/collection-start-date-filter.component';
import { CollectionEndDateFilter } from './FILTERS/collection-end-date-filter/collection-end-date-filter.component';
import { FilterBornOnDateFilter } from './FILTERS/filter-born-on-date-filter/filter-born-on-date-filter.component';
import { DateAddedFilter} from './FILTERS/date-added-filter/date-added-filter.component';
import { DateUpdatedFilter } from './FILTERS/date-updated-filter/date-updated-filter.component';
import { AnalysisBatchDetailComponent } from './analysis-batches/analysis-batch-detail/analysis-batch-detail.component';
import { ExtractWizardComponent } from './analysis-batches/extract-wizard/extract-wizard.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        StudiesComponent,
        SamplesComponent,
        AnalysisBatchesComponent,
        ResultsComponent,
        ReportsComponent,
        //to be removed
        StudiesFormComponent,
        //to be removed
        StudiesTableComponent,
        AdminComponent,
        DisplayValuePipe,
        StudyFilter,
        SampleTypeFilter,
        MatrixTypeFilter,
        SamplerNameFilter,
        FilterTypeFilter,
        RangeFilter,
        CollectionStartDateFilter,
        CollectionEndDateFilter,
        FilterBornOnDateFilter,
        DateAddedFilter,
        DateUpdatedFilter,
        AnalysisBatchDetailComponent,
        ExtractWizardComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        DataTableModule,
        SharedModule,
        ClarityModule.forRoot(),
        ROUTING
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
