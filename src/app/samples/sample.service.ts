import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { ISample } from './sample';

@Injectable()
export class SampleService {
    private _samplesUrl = 'https://raw.githubusercontent.com/USGS-WiM/lide-lims/master/src/app/demo-services/samples.json';
    private _sampleFormConfigUrl = 'https://raw.githubusercontent.com/USGS-WiM/lide-lims/master/src/app/samples/sampleFormConfig.json';

  constructor(private _http: Http) { }

  //check return from server - may need to adjust response.json below with further dot notation
  getSamples(): Observable<ISample[]> {
    return this._http.get(this._samplesUrl)
                .map((response: Response) => <ISample[]>response.json())
                //.do(data => console.log('Samples data: ' + JSON.stringify(data)))
                .catch(this.handleError);
  }

  getSampleFormConfig(selectedMatrix): Observable<any[]> {
    return this._http.get(this._sampleFormConfigUrl)
                .map((response: Response) => <any>response.json())
                .do(data => console.log('Display config data: ' + JSON.stringify(data)))
                .catch(this.handleError);
  }


   private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }




}
