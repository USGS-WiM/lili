import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { environment } from 'environments/environment';

@Injectable()
export class APP_SETTINGS {

    private static _environment: string = 'development';
    private static production: boolean = false;
    private static _API_ENDPOINT: string = APP_SETTINGS._environment === 'production' ? 'https://lidedev.wim.usgs.gov/api/' : 'https://lidedev.wim.usgs.gov/api/';
    // private static _API_ENDPOINT: string = APP_SETTINGS._environment === 'production' ? 'https://lidetest.wim.usgs.gov/lideservices/' : 'https://lidetest.wim.usgs.gov/lideservices/';
    public static set environment(env: string) { this._environment = env };
    public static get API_USERNAME(): string { return 'admin' };
    public static get API_PASSWORD(): string { return 'lideadmin' };

    public static get IS_LOGGEDIN(): boolean { return (!!sessionStorage.getItem('username') && !!sessionStorage.getItem('password')); };

    public static get QUERY_COUNT_LIMIT(): number { return 2000 };

    public static get ROOT_URL(): string { return this._API_ENDPOINT };
    public static get AUTH_URL(): string { return this._API_ENDPOINT + 'auth/' };
    public static get STUDIES_URL(): string { return this._API_ENDPOINT + 'studies/' };
    public static get SAMPLES_URL(): string { return this._API_ENDPOINT + 'samples/' };
    public static get FREEZERS_URL(): string { return this._API_ENDPOINT + 'freezers/' };
    public static get FREEZER_LOCATIONS_URL(): string { return this._API_ENDPOINT + 'freezerlocations/' };
    public static get ALIQUOTS_URL(): string { return this._API_ENDPOINT + 'aliquots/' };
    public static get SAMP_TYPES_URL(): string { return this._API_ENDPOINT + 'sampletypes/' };
    public static get MATRICES_URL(): string { return this._API_ENDPOINT + 'matrices/' };
    public static get SAMPLE_ENV_URL(): string { return this._API_ENDPOINT + 'sampleenvironments/' };
    public static get UNITS_URL(): string { return this._API_ENDPOINT + 'units/' };
    public static get SAMP_LOC_URL(): string { return this._API_ENDPOINT + 'samplelocations/' };
    public static get FCSV_URL(): string { return this._API_ENDPOINT + 'finalconcentratedsamplevolumes/' };
    public static get FILTER_TYPES_URL(): string { return this._API_ENDPOINT + 'filtertypes/' };
    public static get RECORD_TYPES_URL(): string { return this._API_ENDPOINT + 'recordtypes/' };
    public static get WATER_TYPES_URL(): string { return this._API_ENDPOINT + 'watertypes/' };
    public static get ANALYSIS_BATCH_URL(): string { return this._API_ENDPOINT + 'analysisbatches/' };
    public static get ANALYSIS_BATCH_DETAIL_URL(): string { return this._API_ENDPOINT + 'analysisbatchdetail/' };
    public static get ANALYSIS_BATCH_SUMMARY_URL(): string { return this._API_ENDPOINT + 'analysisbatchsummary/' };
    public static get EXTRACTIONS_URL(): string { return this._API_ENDPOINT + 'sampleextractions/'; };
    public static get EXTRACTION_BATCHES_URL(): string { return this._API_ENDPOINT + 'extractionbatches/' };
    public static get EXTRACTION_METHODS_URL(): string { return this._API_ENDPOINT + 'extractionmethods/' };
    public static get INHIBITIONS_URL(): string { return this._API_ENDPOINT + 'inhibitions/' };
    public static get SAMPLE_INHIBITIONS_URL(): string { return this._API_ENDPOINT + 'sampleinhibitions' };
    public static get INHIBITIONS_RAW_RESULTS_URL(): string { return this._API_ENDPOINT + 'inhibitionscalculatedilutionfactor/' };
    public static get CONCENTRATION_TYPES_URL(): string { return this._API_ENDPOINT + 'concentrationtype/' };
    public static get RT_URL(): string { return this._API_ENDPOINT + 'reversetranscriptions/' };
    public static get REPLICATES_URL(): string { return this._API_ENDPOINT + 'pcrreplicates/' };
    public static get REPLICATE_BATCH_URL(): string { return this._API_ENDPOINT + 'pcrreplicatebatches/' };
    public static get STANDARD_CURVES_URL(): string { return this._API_ENDPOINT + 'standardcurves/' };
    public static get TARGETS_URL(): string { return this._API_ENDPOINT + 'targets/' };
    public static get CONTROLS_URL(): string { return this._API_ENDPOINT + 'controls/' };
    public static get OTHER_ANALYSES_URL(): string { return this._API_ENDPOINT + 'otheranalyses/' };
    public static get USERS_URL(): string { return this._API_ENDPOINT + 'users/' };
    public static get FINALSAMPLEMEANCONCENTRATIONS_URL(): string { return this._API_ENDPOINT + 'finalsamplemeanconcentrations/' };
    public static get QUALITY_CONTROL_REPORT_URL(): string { return this._API_ENDPOINT + 'qualitycontrolreport/' };
    public static get CONTROL_RESULTS_REPORT_URL(): string { return this._API_ENDPOINT + 'controlresultsreport/' };
    public static get REPORT_FILES_URL(): string { return this._API_ENDPOINT + 'reportfiles/' };
    public static get REPORT_TYPES_URL(): string { return this._API_ENDPOINT + 'reporttypes/' };
    public static get REPORT_STATUSES_URL(): string { return this._API_ENDPOINT + 'statuses/' };

    public static get VERSION() {
        // return require('../../package.json').version
        return environment.version;
    }

    public static get NUCLEIC_ACID_TYPES() {
        return [
            { "id": 1, "name": "DNA" },
            { "id": 2, "name": "RNA" }
        ]
    };

    public static get SAMPLE_RECORD_TYPES() {
        return [
            { "id": 1, "name": "Data" },
            { "id": 2, "name": "Control" }
        ]
    };

    public static get PEGNEG_FIELD_VALUES() {
        return {
            "study": 1,
            "matrix": 1,
            // "filter_type": 8,
            "sample_type": 4,
            // "collection_start_time": '00:00',
            // "collection_end_time": '00:00'
        }
    }

    public static get MIN_JSON_HEADERS() { return new Headers({ 'Accept': 'application/json' }) };
    public static get JSON_HEADERS() { return new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }) };

    public static get AUTH_HEADERS() {
        return new Headers({
            'Authorization': 'Basic ' +
                btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password'))
        })
    };
    public static get MIN_AUTH_JSON_HEADERS() {
        return new Headers({
            'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')),
            'Accept': 'application/json'
        }
        )
    };
    public static get AUTH_JSON_HEADERS() {
        return new Headers({
            'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')),
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }
        )
    };

    // public static get WATER_MATRIX_ID() {
    //     return 1;
    // }

    // public static get ULTRAFILTER_FILTER_TYPE_ID() {
    //     return 8;
    // }

    // public static get QC_SAMPLE_TYPE_ID() {
    //     return 4;
    // }

    // line below is for headers stored in local storage. todo: revisit and implement this
    // public static get AUTH_HEADERS() { return new Headers({ 'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password'))}) };
    // public static get AUTH_HEADERS() {
    //     return new Headers({
    //         'Authorization': 'Basic ' + btoa(this.API_USERNAME + ':' + this.API_PASSWORD)
    //     });
    // };
    public static get ADMIN_MIN_AUTH_JSON_HEADERS() {
        return new Headers({
            'Authorization': 'Basic ' + btoa(this.API_USERNAME + ':' + this.API_PASSWORD),
            'Accept': 'application/json'
        }
        );
    };
    public static get ADMIN_AUTH_JSON_HEADERS() {
        return new Headers({
            'Authorization': 'Basic ' + btoa(this.API_USERNAME + ':' + this.API_PASSWORD),
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }
        );
    };

}
