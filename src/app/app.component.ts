import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StudyService } from './studies/study.service';
import { SampleService } from './samples/sample.service';
import { AnalysisBatchService } from './analysis-batches/analysis-batch.service'
import { SampleTypeService } from './SHARED/sample-type.service';
import { FilterTypeService } from './SHARED/filter-type.service';
import { MatrixService } from './SHARED/matrix.service';
import { UnitService } from './units/unit.service';
import { UserService } from './SHARED/user.service';
import { TargetService } from './targets/target.service';
import { ExtractionMethodService } from './extractions/extraction-method.service'

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ StudyService, SampleService, AnalysisBatchService, SampleTypeService, FilterTypeService, MatrixService, UnitService, UserService, TargetService, ExtractionMethodService]
})
export class AppComponent {
    constructor(private router: Router) {
    }
}
