import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StudyService } from './studies/study.service';
import { SampleService } from './samples/sample.service';
import { SampleTypeService } from './samples/sample-type.service';
import { MatrixService } from './samples/matrix.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ StudyService, SampleService, SampleTypeService, MatrixService ]
})
export class AppComponent {
    constructor(private router: Router) {
    }
}
