import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SETTINGS } from '../app.settings';

@Injectable()
export class PcrReplicateBatchService {

  constructor(private _http: Http) { }

  public getID(analysisBatchID, extractionNo, targetID, replicateNo): Observable<any> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.REPLICATE_BATCH_URL +
      '?analysis_batch=' + analysisBatchID +
      '&extraction_number=' + extractionNo +
      '&target=' + targetID +
      '&replicate_number=' + replicateNo, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  public update(pcrBatchID, targetResults): Observable<any> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.put(APP_SETTINGS.REPLICATE_BATCH_URL + pcrBatchID + '/', targetResults, options)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
