import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SETTINGS } from '../app.settings';

import { IExtractionBatchSubmission } from './extraction-batch-submission';
import { IExtractionBatch } from 'app/extraction-batches/extraction-batch';

@Injectable()
export class ExtractionBatchService {

  constructor(private _http: Http) { }

  public create(formValue: IExtractionBatchSubmission): Observable<any[]> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.EXTRACTION_BATCHES_URL, formValue, options)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);

  }

  public update(formValue): Observable<IExtractionBatch> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.patch(APP_SETTINGS.EXTRACTION_BATCHES_URL + formValue.id + '/', formValue, options)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);

  }

  public delete(id: number): Observable<any> {
    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.delete(APP_SETTINGS.EXTRACTION_BATCHES_URL + id, options)
      .catch(this.handleError);
  }

  public bulkUpdate(ebSubmissionArray): Observable<IExtractionBatch> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.patch(APP_SETTINGS.EXTRACTION_BATCHES_URL, ebSubmissionArray, options)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);

  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(JSON.stringify(error.json()) || 'Server error');
  }

}
