import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

@Injectable()
export class APP_SETTINGS {

    private static _environment: string = 'development';
    private static _API_ENDPOINT: string = APP_SETTINGS._environment === 'production' ? 'https://lidedev.wim.usgs.gov/lideservices/' : 'https://lidedev.wim.usgs.gov/lideservices/';
    public static set environment(env: string) { this._environment = env };
    public static get API_USERNAME(): string { return 'admin' };
    public static get API_PASSWORD(): string { return 'lideadmin' };

    public static get AUTH_URL(): string { return this._API_ENDPOINT + 'auth/' };
    public static get STUDIES_URL(): string { return this._API_ENDPOINT + 'studies/' };
    public static get SAMPLES_URL(): string { return this._API_ENDPOINT + 'samples/' };
    public static get SAMP_TYPES_URL(): string { return this._API_ENDPOINT + 'sampletypes/' };
    public static get MATRIX_TYPES_URL(): string { return this._API_ENDPOINT + 'matrixtypes/' };
    public static get SAMPLE_ENV_URL(): string { return this._API_ENDPOINT + 'sampleenvironments/' };
    public static get UNITS_URL(): string { return this._API_ENDPOINT + 'units/' };
    public static get SAMP_LOC_URL(): string { return this._API_ENDPOINT + 'samplelocations/' };
    public static get FCSV_URL(): string { return this._API_ENDPOINT + 'finalconcentratedsamplevolumes/' };
    public static get FILTER_TYPES_URL(): string { return this._API_ENDPOINT + 'filtertypes/' };
    public static get WATER_TYPES_URL(): string { return this._API_ENDPOINT + 'watertypes/' };
    public static get ANALYSIS_BATCH_URL(): string { return this._API_ENDPOINT + 'analysisbatches/' };
    public static get ANALYSIS_BATCH_DETAIL_URL(): string { return this._API_ENDPOINT + 'analysisbatchdetail/' };
    public static get ANALYSIS_BATCH_SUMMARY_URL(): string { return this._API_ENDPOINT + 'analysisbatchsummary/' };
    public static get EXTRACTIONS_URL(): string { return this._API_ENDPOINT + 'extractions/'; };
    public static get EXTRACTION_BATCHES_URL(): string { return this._API_ENDPOINT + 'extractionbatches/'};
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

    public static get NUCLEIC_ACID_TYPES() {
        return [
        { "id": 1, "name": "DNA" },
        { "id": 2, "name": "RNA" }
        ]
    };

    public static get MIN_JSON_HEADERS() { return new Headers({ 'Accept': 'application/json' }) };
    public static get JSON_HEADERS() { return new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }) };
    // line below is for headers stored in local storage. todo: revisit and implement this
    // public static get AUTH_HEADERS() { return new Headers({ 'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password'))}) };
    public static get AUTH_HEADERS() { return new Headers({ 'Authorization': 'Basic ' + btoa(this.API_USERNAME + ':' + this.API_PASSWORD) }); };
    public static get MIN_AUTH_JSON_HEADERS() {
        return new Headers({
            'Authorization': 'Basic ' + btoa(this.API_USERNAME + ':' + this.API_PASSWORD),
            'Accept': 'application/json'
        }
        );
    };
    public static get AUTH_JSON_HEADERS() {
        return new Headers({
            'Authorization': 'Basic ' + btoa(this.API_USERNAME + ':' + this.API_PASSWORD),
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }
        );
    };
}