import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { IStudy } from './study';

@Injectable()
export class StudyService {
  private _studiesUrl = 'https://raw.githubusercontent.com/USGS-WiM/lide-lims/master/src/app/demo-services/studies.json';

  constructor(private _http: Http) {}

//check return from server - may need to adjust response.json below with further dot notation
  getStudies(): Observable<IStudy[]> {
    return this._http.get(this._studiesUrl)
                .map((response: Response) => <IStudy[]>response.json())
                //.do(data => console.log('Studies data: ' + JSON.stringify(data)))
                .catch(this.handleError);
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
 

}
