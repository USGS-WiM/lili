import { Component, OnInit } from '@angular/core';
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
import { ExtractionMethodService } from './extraction-batches/extraction-method.service';
import { ConcentrationTypeService } from './concentration-types/concentration-types.service';
import { ServerTestService } from './SHARED/server-test.service';

import { APP_SETTINGS } from './app.settings';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        StudyService,
        SampleService,
        AnalysisBatchService
    ]
})
export class AppComponent implements OnInit {
    servicesFailFlag: boolean = false;

    public liliVersion: string = '';

    constructor(private router: Router, private _serverTestService: ServerTestService) {
    }

    ngOnInit() {
        this.liliVersion = APP_SETTINGS.VERSION;

        this._serverTestService.testLIDEServices()
            .subscribe(
                (response) => {
                    // console.log(response);
                },
                error => {
                    console.log(error);
                    this.servicesFailFlag = true;
                }
            )

    }
}
