import { Component, OnInit } from '@angular/core';
import { IConcentrationType } from '../concentration-types/concentration-type';
import { ActivatedRoute } from '@angular/router';
import { IUnit } from '../units/unit';
import { IExtractionMethod } from '../extractions/extraction-method';
import { IFilterType } from '../SHARED/filter-type';
import { IMatrix } from 'app/SHARED/matrix';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public ctypes: Array<IConcentrationType>;
  public units: Array<IUnit>;
  public extractions: Array<IExtractionMethod>;
  public filters: Array<IFilterType>;
  public matrices: Array<IMatrix>;
  
  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.data.subscribe((data: { concentrationTypes: Array<IConcentrationType> }) => {
      this.ctypes = data.concentrationTypes;  
    });
    this._route.data.subscribe((data: { units: Array<IUnit> }) => {
      this.units = data.units;  
    });
    this._route.data.subscribe((data: { extractionMethods: Array<IExtractionMethod> }) => {
      this.extractions = data.extractionMethods;  
    });
    this._route.data.subscribe((data: { filterTypes: Array<IFilterType> }) => {
      this.filters = data.filterTypes;  
    });

    this._route.data.subscribe((data: { matrixTypes: Array<IMatrix> }) => {
      this.matrices = data.matrixTypes;  
    });
  }

}
