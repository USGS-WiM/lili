import { Injectable } from '@angular/core';

import { IAnalysisBatchSummary } from './analysis-batches/analysis-batch-summary';
import { IAnalysisBatch } from './analysis-batches/analysis-batch';
import { ITarget } from './targets/target';

@Injectable()
export class APP_UTILITIES {

    public static get TODAY(): string { return new Date().toISOString().substr(0, 10); }

    public static get TIME(): string { return new Date().toISOString().substr(14, 22); }

    // SAMPLE_FORM_CONFIG is the config JSON object for the sample form, based on matrix selection
    // object keys match the matrix ID
    public static get SAMPLE_FORM_CONFIG(): Object {
        return {
            "6": { // air
                "matrix": false,
                "study": false,
                "sample_type": false,
                "collaborator_sample_id": false,
                "filter_flag": false,
                "secondary_concentration_flag": false,
                "study_site_name": false,
                "sample_description": false,
                "sampler_name": false,
                "sample_notes": false,
                "arrival_date": false,
                "arrival_notes": false,
                "collection_start_date": false,
                "collection_start_time": false,
                "collection_end_date": false,
                "collection_end_time": false,
                "meter_reading_initial": true,
                "meter_reading_final": true,
                "meter_reading_unit": true,
                "total_volume_sampled_initial": false,
                "total_volume_sampled_unit_initial": false,
                "post_dilution_volume": true,
                "filter_type": false,
                "filter_born_on_date": true,
                "dissolution_volume": false,
                "elution_notes": true,
                "technician_initials": true,
                "sample_volume_initial": true
            },
            "4": { // Forage or sediment
                "matrix": false,
                "study": false,
                "sample_type": false,
                "collaborator_sample_id": false,
                "filter_flag": false,
                "secondary_concentration_flag": false,
                "study_site_name": false,
                "sample_description": false,
                "sampler_name": false,
                "sample_notes": false,
                "arrival_date": false,
                "arrival_notes": false,
                "collection_start_date": false,
                "collection_start_time": true,
                "collection_end_date": true,
                "collection_end_time": true,
                "meter_reading_initial": true,
                "meter_reading_final": true,
                "meter_reading_unit": true,
                "total_volume_sampled_initial": false,
                "total_volume_sampled_unit_initial": false,
                "post_dilution_volume": true,
                "filter_type": true,
                "filter_born_on_date": true,
                "dissolution_volume": true,
                "elution_notes": false,
                "technician_initials": false,
                "sample_volume_initial": false
            },
            "5": {  // Liquid Manure
                "matrix": false,
                "study": false,
                "sample_type": false,
                "collaborator_sample_id": false,
                "filter_flag": false,
                "secondary_concentration_flag": false,
                "study_site_name": false,
                "sample_description": false,
                "sampler_name": false,
                "sample_notes": false,
                "arrival_date": false,
                "arrival_notes": false,
                "collection_start_date": false,
                "collection_start_time": true,
                "collection_end_date": true,
                "collection_end_time": true,
                "meter_reading_initial": false,
                "meter_reading_final": false,
                "meter_reading_unit": false,
                "total_volume_sampled_initial": false,
                "total_volume_sampled_unit_initial": false,
                "post_dilution_volume": true,
                "filter_type": true,
                "filter_born_on_date": true,
                "dissolution_volume": true,
                "elution_notes": true,
                "technician_initials": true,
                "sample_volume_initial": true
            },
            "3": { // Solid Manure
                "matrix": false,
                "study": false,
                "sample_type": false,
                "collaborator_sample_id": false,
                "filter_flag": false,
                "secondary_concentration_flag": false,
                "study_site_name": false,
                "sample_description": false,
                "sampler_name": false,
                "sample_notes": false,
                "arrival_date": false,
                "arrival_notes": false,
                "collection_start_date": false,
                "collection_start_time": true,
                "collection_end_date": true,
                "collection_end_time": true,
                "meter_reading_initial": true,
                "meter_reading_final": true,
                "meter_reading_unit": true,
                "total_volume_sampled_initial": false,
                "total_volume_sampled_unit_initial": false,
                "post_dilution_volume": false,
                "filter_type": true,
                "filter_born_on_date": true,
                "dissolution_volume": true,
                "elution_notes": true,
                "technician_initials": true,
                "sample_volume_initial": true
            },
            "2": { // wastewater
                "matrix": false,
                "study": false,
                "sample_type": false,
                "collaborator_sample_id": false,
                "filter_flag": false,
                "secondary_concentration_flag": false,
                "study_site_name": false,
                "sample_description": false,
                "sampler_name": false,
                "sample_notes": false,
                "arrival_date": false,
                "arrival_notes": false,
                "collection_start_date": false,
                "collection_start_time": false,
                "collection_end_date": false,
                "collection_end_time": false,
                "meter_reading_initial": true,
                "meter_reading_final": true,
                "meter_reading_unit": true,
                "total_volume_sampled_initial": false,
                "total_volume_sampled_unit_initial": false,
                "post_dilution_volume": true,
                "filter_type": true,
                "filter_born_on_date": true,
                "dissolution_volume": true,
                "elution_notes": true,
                "technician_initials": true,
                "sample_volume_initial": true
            },
            "1": { // water
                "matrix": false,
                "study": false,
                "sample_type": false,
                "collaborator_sample_id": false,
                "filter_flag": false,
                "secondary_concentration_flag": false,
                "study_site_name": false,
                "sample_description": false,
                "sampler_name": false,
                "sample_notes": false,
                "arrival_date": false,
                "arrival_notes": false,
                "collection_start_date": false,
                "collection_start_time": false,
                "collection_end_date": false,
                "collection_end_time": false,
                "meter_reading_initial": false,
                "meter_reading_final": false,
                "meter_reading_unit": false,
                "total_volume_sampled_initial": false,
                "total_volume_sampled_unit_initial": false,
                "post_dilution_volume": true,
                "filter_type": false,
                "filter_born_on_date": false,
                "dissolution_volume": true,
                "elution_notes": false,
                "technician_initials": false,
                "sample_volume_initial": false
            }
        }
    }

    public static mapOrder(array, order, key) {

        array.sort(function (a, b) {
            const A = a[key], B = b[key];

            if (order.indexOf(A) > order.indexOf(B)) {
                return 1;
            } else {
                return -1;
            }

        });

        return array;
    };


    public static convertArrayOfObjectsToCSV(args: any) {
        let result, counter, keys = [], columnDelimiter, lineDelimiter, data, headers, unorderedKeys;

        headers = [];

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        unorderedKeys = Object.keys(data[0]);

        args.headers.forEach(function (col) {
            let found = false;
            unorderedKeys = unorderedKeys.filter(function (item) {
                if (!found && item === col.fieldName) {
                    keys.push(item);
                    found = true;
                    return false;
                } else {
                    return true;
                }
            })
        })

        // put the headers array in the same order as the data keys
        keys.forEach(function (item) {
            const obj = args.headers.filter(function (o) {
                return o.fieldName === item;
            })[0];
            if (obj) {
                headers.push(obj.colName);
            }

        });

        // remove keys that aren't in the headers array, ensuring those data columns won't be exported
        // keys.forEach(function (item) {
        //     if (headers.indexOf(item) < 0) {
        //         let ndx = keys.indexOf(item);
        //         keys.splice(ndx, 1);
        //     }
        // });
        result = '';
        result += (args.headers) ? headers.join(columnDelimiter) : keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function (item) {
            counter = 0;
            keys.forEach(function (key) {
                if (counter > 0) {
                    result += columnDelimiter;
                }
                if (item[key] == null) {
                    result += '';
                } else if (typeof item[key] === 'string' && item[key].includes(',')) {
                    result += '"' + item[key] + '"';
                } else {
                    result += item[key];
                }
                counter++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    public static generateCSV(args: any) {
        let data, filename, link;
        let csv = this.convertArrayOfObjectsToCSV({
            data: args.data,
            headers: args.headers
        });
        if (csv == null) { return; }

        filename = args.filename || 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }
}