import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SETTINGS } from '../app.settings'

import { IMatrix } from './matrix'

@Injectable()
export class MatrixService {
  private _matricesUrl = 'https://raw.githubusercontent.com/USGS-WiM/lide-lims/master/src/app/demo-services/matrix.json'

  constructor(private _http: Http) { }

   getMatrices(): Observable<IMatrix[]> {
    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.get(APP_SETTINGS.MATRICES_URL, options)
    //return this._http.get(this._matricesUrl)
      .map((response: Response) => <IMatrix[]>response.json())
      //.do(data => console.log('Matricies data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  public create(formValue: IMatrix): Observable<IMatrix> {
    let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS });

    return this._http.post(APP_SETTINGS.MATRICES_URL, formValue, options)
      .map((response: Response) => <IMatrix>response.json())
      .catch(this.handleError);
  }

  public update(formValue: IMatrix): Observable<IMatrix> {
    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.put(APP_SETTINGS.MATRICES_URL + formValue.id + '/', formValue, options)
      .map((response: Response) => <IMatrix>response.json())
      .catch(this.handleError);
  }

  public delete(id: number): Observable<IMatrix> {
    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS});

    return this._http.delete(APP_SETTINGS.MATRICES_URL + id, options)
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }


}
