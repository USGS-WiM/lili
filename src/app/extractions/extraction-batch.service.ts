import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SETTINGS } from '../app.settings';

import { IExtractionBatchSubmission } from './extraction-batch-submission';

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

      private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
      }

}
