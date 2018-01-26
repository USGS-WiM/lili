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
import { DateAddedFilter } from './FILTERS/date-added-filter/date-added-filter.component';
import { DateUpdatedFilter } from './FILTERS/date-updated-filter/date-updated-filter.component';
import { AnalysisBatchDetailComponent } from './analysis-batches/analysis-batch-detail/analysis-batch-detail.component';
import { ConcentrationTypesComponent } from './admin/concentration-types/concentration-types.component';
import { ConcentrationResolve } from "./concentration-types/concentration-types.resolve";
import { ConcentrationTypeService } from "./concentration-types/concentration-types.service";
import { UnitsComponent } from './admin/units/units.component';
import { ExtractionMethodsComponent } from './admin/extraction-methods/extraction-methods.component';
import { MatrixTypesComponent } from './admin/matrix-types/matrix-types.component';
import { SampleTypesComponent } from './admin/sample-types/sample-types.component';
import { FilterTypesComponent } from './admin/filter-types/filter-types.component';
import { TargetsComponent } from './admin/targets/targets.component';
import { UsersComponent } from './admin/users/users.component';
import { UnitResolve } from "./units/unit.resolve";
import { UnitService } from "./units/unit.service";
import { ExtractionMethodService } from "./extractions/extraction-method.service";
import { ExtractionResolve } from "./extractions/extraction-method.resolve";
import { FilterTypeService } from "./SHARED/filter-type.service";
import { FilterResolve } from "./SHARED/filter-type.resolve";
import { MatrixResolve } from "./SHARED/matrix.resolve";
import { MatrixService } from "./SHARED/matrix.service";
import { SampleTypeResolve } from "./SHARED/sample-type.resolve";
import { SampleTypeService } from "./SHARED/sample-type.service";
import { TargetService } from "./targets/target.service";
import { TargetResolve } from "./targets/target.resolve";
import { UserService } from "./SHARED/user.service";
import { UserResolve } from "./SHARED/user.resolve";
import { AnalysisBatchWorksheetComponent } from './analysis-batches/analysis-batch-worksheet/analysis-batch-worksheet.component';
import { InhibitionService } from "./inhibitions/inhibition.service";
import { ExtractionBatchService } from "app/extractions/extraction-batch.service";
import { PcrReplicateBatchService } from "app/pcr-replicates/pcr-replicate-batch.service";
import { FinalConcentratedSampleVolumeService } from "app/fcsv/final-concentrated-sample-volume.service";
import { AliquotService } from "app/aliquots/aliquot.service";
import { FreezerLocationsService } from "app/aliquots/freezer-locations.service";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        StudiesComponent,
        SamplesComponent,
        AnalysisBatchesComponent,
        ResultsComponent,
        ReportsComponent,
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
        ConcentrationTypesComponent,
        UnitsComponent,
        ExtractionMethodsComponent,
        MatrixTypesComponent,
        SampleTypesComponent,
        FilterTypesComponent,
        TargetsComponent,
        UsersComponent,
        AnalysisBatchWorksheetComponent
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
    providers: [ConcentrationTypeService,
        ConcentrationResolve,
        UnitService,
        UnitResolve,
        InhibitionService,
        ExtractionMethodService,
        ExtractionBatchService,
        AliquotService,
        FreezerLocationsService,
        ExtractionResolve,
        FilterTypeService,
        PcrReplicateBatchService,
        FinalConcentratedSampleVolumeService,
        FilterResolve,
        MatrixService,
        MatrixResolve,
        SampleTypeService,
        SampleTypeResolve,
        TargetService,
        TargetResolve,
        UserService,
        UserResolve
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
