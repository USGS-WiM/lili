import { Component, OnInit } from '@angular/core';

//import { IStudy } from '../study';
import { StudyService } from '../study.service';

@Component({
  selector: 'app-studies-table',
  templateUrl: './studies-table.component.html',
  styleUrls: ['./studies-table.component.scss']
})
export class StudiesTableComponent implements OnInit {
  allStudies;


  constructor(private _studyService: StudyService) { 

  }

  ngOnInit() {
    this.allStudies = this._studyService.getStudies;
  }

}
