import { Component, OnInit } from '@angular/core';

import { IStudy } from '../study';
import { StudyService } from '../study.service';

//import { Comparator } from 'clarity-angular'

import {State} from "clarity-angular";

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
  //selectedStudies: IStudy[];
  loading: boolean = true;


  //////attempted clarity UI datagrid here, but the sorting requires writing custom comparator functions. abandoned for now in favor of PrimeNg simplicty and out of the box functionality.

  constructor(private _studyService: StudyService) { 

  }



  

  ngOnInit():void {
      this._studyService.getStudies()
        .subscribe(studies => this.allStudies = studies,
                    error => this.errorMessage = <any>error);
  }

  

}
