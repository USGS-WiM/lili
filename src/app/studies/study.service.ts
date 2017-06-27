import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SETTINGS } from '../app.settings'

import { IStudy } from './study';

@Injectable()
export class StudyService {
    private _studiesUrl = 'https://raw.githubusercontent.com/USGS-WiM/lide-lims/master/src/app/demo-services/studies.json';

    constructor(private _http: Http) {}

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    //check return from server - may need to adjust response.json below with further dot notation
    public getStudies(): Observable < IStudy[] > {

        let options = new RequestOptions({
            headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
        });

        return this._http.get(APP_SETTINGS.STUDIES_URL, options)
            //return this._http.get(this._studiesUrl)
            .map((response: Response) => < IStudy[] > response.json())
            .catch(this.handleError);
    }

    public create(formValue: Object): Observable < IStudy > {

        let options = new RequestOptions({
            headers: APP_SETTINGS.AUTH_JSON_HEADERS
        });

        return this._http.post(APP_SETTINGS.STUDIES_URL, formValue, options)
            .map(this.extractData)
            .catch(this.handleError);

    }

    public update(formValue: IStudy): Observable < IStudy > {

        let options = new RequestOptions({
            headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
        });

        return this._http.put(APP_SETTINGS.STUDIES_URL + formValue.id + '/', formValue, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}
