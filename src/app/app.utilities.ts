import {Injectable}     from '@angular/core';

@Injectable()
export class APP_UTILITIES {

	//SAMPLE_FORM_CONFIG is the config JSON object for the sample form, based on matrix selection
	//object keys match the matrix ID
    public static get SAMPLE_FORM_CONFIG(): Object { return {
 	"6": {
 		"collection_start_time": false,
 		"collection_end_date": false,
 		"collection_end_time": false,
 		"pump_flow_rate": false,
 		"meter_reading_initial": true,
 		"meter_reading_final": true,
 		"total_volume_sampled_initial": false,
 		"post_dilution_volume": true,
 		"filter_type": false,
 		"filter_born_on_date": true,
 		"air_subsample_volume": false,
 		"elution_date": true,
 		"elution_notes": true,
 		"technician_initials": true,
 		"sample_volume_initial": true
 	},
 	"4": {
 		"collection_start_time": true,
 		"collection_end_date": true,
 		"collection_end_time": true,
 		"pump_flow_rate": true,
 		"meter_reading_initial": true,
 		"meter_reading_final": true,
 		"total_volume_sampled_initial": false,
 		"post_dilution_volume": true,
 		"filter_type": true,
 		"filter_born_on_date": true,
 		"air_subsample_volume": true,
 		"elution_date": false,
 		"elution_notes": false,
 		"technician_initials": false,
 		"sample_volume_initial": false
 	},
 	"5": {
 		"collection_start_time": true,
 		"collection_end_date": true,
 		"collection_end_time": true,
 		"pump_flow_rate": true,
 		"meter_reading_initial": true,
 		"meter_reading_final": true,
 		"total_volume_sampled_initial": true,
 		"post_dilution_volume": true,
 		"filter_type": true,
 		"filter_born_on_date": true,
 		"air_subsample_volume": true,
 		"elution_date": true,
 		"elution_notes": true,
 		"technician_initials": true,
 		"sample_volume_initial": true
 	},
 	"3": {
 		"collection_start_time": true,
 		"collection_end_date": true,
 		"collection_end_time": true,
 		"pump_flow_rate": true,
 		"meter_reading_initial": true,
 		"meter_reading_final": true,
 		"total_volume_sampled_initial": false,
 		"post_dilution_volume": false,
 		"filter_type": true,
 		"filter_born_on_date": true,
 		"air_subsample_volume": true,
 		"elution_date": true,
 		"elution_notes": true,
 		"technician_initials": true,
 		"sample_volume_initial": true
 	},
 	"2": {
 		"collection_start_time": false,
 		"collection_end_date": false,
 		"collection_end_time": false,
 		"pump_flow_rate": true,
 		"meter_reading_initial": true,
 		"meter_reading_final": true,
 		"total_volume_sampled_initial": false,
 		"post_dilution_volume": true,
 		"filter_type": true,
 		"filter_born_on_date": true,
 		"air_subsample_volume": true,
 		"elution_date": true,
 		"elution_notes": true,
 		"technician_initials": true,
 		"sample_volume_initial": true
 	},
 	"1": {
 		"collection_start_time": false,
 		"collection_end_date": false,
 		"collection_end_time": false,
 		"pump_flow_rate": true,
 		"meter_reading_initial": false,
 		"meter_reading_final": false,
 		"total_volume_sampled_initial": false,
 		"post_dilution_volume": true,
 		"filter_type": false,
 		"filter_born_on_date": false,
 		"air_subsample_volume": true,
 		"elution_date": false,
 		"elution_notes": false,
 		"technician_initials": false,
 		"sample_volume_initial": false
 	}
	}

 }

}