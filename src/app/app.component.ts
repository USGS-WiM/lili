import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StudyService } from './studies/study.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ StudyService ]
})
export class AppComponent {
    constructor(private router: Router) {
    }
}
