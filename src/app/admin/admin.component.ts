import { Component, OnInit } from '@angular/core';
import { IConcentrationType } from '../concentration-types/concentration-type';
import { ActivatedRoute } from '@angular/router';
import { IUnit } from '../units/unit';
import { IExtractionMethod } from '../extractions/extraction-method';
import { IFilterType } from '../SHARED/filter-type';
import { IMatrix } from '../SHARED/matrix';
import { ISampleType } from '../SHARED/sample-type';
import { IControlType } from '../control-types/control-type';
import { ITarget } from '../targets/target';
import { IUser } from '../SHARED/user';

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
  public stypes: Array<ISampleType>;
  public conttypes: Array<IControlType>;
  public targets: Array<ITarget>;
  public users: Array<IUser>;
  
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

    this._route.data.subscribe((data: { sampleTypes: Array<IMatrix> }) => {
      this.stypes = data.sampleTypes;  
    });
    this._route.data.subscribe((data: { controlTypes: Array<IControlType> }) => {
      this.conttypes = data.controlTypes;  
    });
    this._route.data.subscribe((data: { targets: Array<ITarget> }) => {
      this.targets = data.targets;  
    });
    this._route.data.subscribe((data: { users: Array<IUser> }) => {
      this.users = data.users;  
    });
  }

}
