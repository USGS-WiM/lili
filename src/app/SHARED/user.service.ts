import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SETTINGS } from '../app.settings'

import { IUser } from './user';

@Injectable()
export class UserService {

  constructor(private _http: Http) { }

  getUsers(): Observable<IUser[]> {
    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.get(APP_SETTINGS.USERS_URL, options)
      .map((response: Response) => <IUser[]>response.json())
      // .do(data => console.log('Users data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }


  public create(formValue: IUser): Observable<IUser> {
    let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS });

    return this._http.post(APP_SETTINGS.USERS_URL, formValue, options)
      .map((response: Response) => <IUser>response.json())
      .catch(this.handleError);
  }

  public update(formValue: IUser): Observable<IUser> {
    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.put(APP_SETTINGS.USERS_URL + formValue.id + '/', formValue, options)
      .map((response: Response) => <IUser>response.json())
      .catch(this.handleError);
  }

  public delete(id: number): Observable<IUser> {
    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.delete(APP_SETTINGS.USERS_URL + id, options)
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(JSON.stringify(error.json()) || 'Server error');
  }


}
