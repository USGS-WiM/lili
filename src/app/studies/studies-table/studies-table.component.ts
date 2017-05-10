import { Component, OnInit } from '@angular/core';

import { IStudy } from '../study';
import { StudyService } from '../study.service';

//imports below are granular to mimimize package bloat from primeng library.
//alternative import from primeng docs is:" import {DataTableModule,SharedModule} from 'primeng/primeng' " which brings in whole primeng library
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { SharedModule } from 'primeng/components/common/shared';

@Component({
  selector: 'app-studies-table',
  templateUrl: './studies-table.component.html',
  styleUrls: ['./studies-table.component.scss']
})
export class StudiesTableComponent implements OnInit {
  allStudies: IStudy[];
  errorMessage: string;
  selectedStudies: IStudy[];
  editable = false;


  constructor(private _studyService: StudyService) { 

  }

  ngOnInit():void {
      this._studyService.getStudies()
        .subscribe(studies => this.allStudies = studies,
                    error => this.errorMessage = <any>error);
  }

  onRowSelect(event) {
        console.log(event.data.study_name)
        console.log(this.selectedStudies)
    }

    onRowUnselect(event){
      console.log("study unselected")
    }

}
