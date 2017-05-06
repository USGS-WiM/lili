import { Component, OnInit } from '@angular/core';

import { IStudy } from '../study';
import { StudyService } from '../study.service';

@Component({
  selector: 'app-studies-table',
  templateUrl: './studies-table.component.html',
  styleUrls: ['./studies-table.component.scss']
})
export class StudiesTableComponent implements OnInit {
  allStudies: IStudy[];
  errorMessage: string;


  constructor(private _studyService: StudyService) { 

  }

  ngOnInit():void {
      this._studyService.getStudies()
        .subscribe(studies => this.allStudies = studies,
                    error => this.errorMessage = <any>error);
  }

}
