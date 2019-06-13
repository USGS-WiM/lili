import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SETTINGS } from '../app.settings';


@Injectable()
export class FinalSampleMeanConcentrationService {

  constructor(private _http: Http) { }

  public queryFinalSampleMeanConcentrations(queryObject): Observable<any> {
    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    let queryString = '';
    queryString += '?sample=';
    for (let sample of queryObject.samples) {
      queryString += ((sample.toString()) + ',')
    }
    queryString = queryString.slice(0, -1);
    queryString += '&target=';
    for (let target of queryObject.targets) {
      queryString += ((target.toString()) + ',')
    }
    queryString = queryString.slice(0, -1);

    return this._http.get(APP_SETTINGS.FINALSAMPLEMEANCONCENTRATIONS_URL + queryString, options)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);


  }

  public queryFinalSampleMeanConcentrationsResults(queryObject): Observable<any> {
    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    let queryString = '';
    queryString += '?sample=';
    for (let sample of queryObject.samples) {
      queryString += ((sample.toString()) + ',')
    }
    queryString = queryString.slice(0, -1);
    queryString += '&target=';
    for (let target of queryObject.targets) {
      queryString += ((target.toString()) + ',')
    }
    queryString = queryString.slice(0, -1);

    return this._http.get(APP_SETTINGS.FINALSAMPLEMEANCONCENTRATIONS_URL + 'results/' + queryString, options)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);

  }

  getSummaryStatistics(queryObject): Observable<any> {
    let queryString = '';
    queryString += '?sample=';
    for (let sample of queryObject.samples) {
      queryString += ((sample.toString()) + ',')
    }
    queryString = queryString.slice(0, -1);
    queryString += '&target=';
    for (let target of queryObject.targets) {
      queryString += ((target.toString()) + ',')
    }
    queryString = queryString.slice(0, -1);

    if (queryObject.summary_stats.length > 0) {
      queryString += '&statistic=';
      for (let stat of queryObject.summary_stats) {
        queryString += ((stat.toString()) + ',')
      }
      queryString = queryString.slice(0, -1);
    }

    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.FINALSAMPLEMEANCONCENTRATIONS_URL + 'summary_statistics/' + queryString, options)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);

  }



  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(JSON.stringify(error.json()) || 'Server error');
  }

}
