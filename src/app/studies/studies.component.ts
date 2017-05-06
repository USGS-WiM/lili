import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { StudiesFormComponent } from './studies-form/studies-form.component';
import { StudiesTableComponent } from './studies-table/studies-table.component';


@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.scss']
})
export class StudiesComponent implements OnInit { 

  constructor() { }



  ngOnInit() {
  }

}
