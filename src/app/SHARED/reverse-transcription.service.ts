import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { IReverseTranscription } from '../reverse-transcriptions/reverse-transcription';

import { APP_SETTINGS } from '../app.settings'

@Injectable()
export class ReverseTranscriptionService {

  constructor(private _http: Http) { }

  public update(formValue: IReverseTranscription): Observable<IReverseTranscription> {
    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.patch(APP_SETTINGS.RT_URL + formValue.id + '/', formValue, options)
      .map((response: Response) => <IReverseTranscription>response.json())
      .catch(this.handleError);
  }

  public delete(id: number): Observable<IReverseTranscription> {
    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.delete(APP_SETTINGS.RT_URL + id, options)
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(JSON.stringify(error.json()) || 'Server error');
  }

}
