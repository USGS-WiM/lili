import { Injectable } from '@angular/core';

import { IAnalysisBatch } from './analysis-batches/analysis-batch';

@Injectable()
export class APP_UTILITIES {

	//SAMPLE_FORM_CONFIG is the config JSON object for the sample form, based on matrix selection
	//object keys match the matrix ID
	public static get SAMPLE_FORM_CONFIG(): Object {
		return {
			"6": {
				"matrix_type": false,
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
				"pump_flow_rate": false,
				"meter_reading_initial": true,
				"meter_reading_final": true,
				"meter_reading_unit": true,
				"total_volume_sampled_initial": false,
				"total_volume_sampled_unit_initial": false,
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
				"matrix_type": false,
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
				"pump_flow_rate": true,
				"meter_reading_initial": true,
				"meter_reading_final": true,
				"meter_reading_unit": true,
				"total_volume_sampled_initial": false,
				"total_volume_sampled_unit_initial": false,
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
				"matrix_type": false,
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
				"pump_flow_rate": true,
				"meter_reading_initial": true,
				"meter_reading_final": true,
				"meter_reading_unit": true,
				"total_volume_sampled_initial": true,
				"total_volume_sampled_unit_initial": true,
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
				"matrix_type": false,
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
				"pump_flow_rate": true,
				"meter_reading_initial": true,
				"meter_reading_final": true,
				"meter_reading_unit": true,
				"total_volume_sampled_initial": false,
				"total_volume_sampled_unit_initial": false,
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
				"matrix_type": false,
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
				"pump_flow_rate": true,
				"meter_reading_initial": true,
				"meter_reading_final": true,
				"meter_reading_unit": true,
				"total_volume_sampled_initial": false,
				"total_volume_sampled_unit_initial": false,
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
				"matrix_type": false,
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
				"pump_flow_rate": true,
				"meter_reading_initial": false,
				"meter_reading_final": false,
				"meter_reading_unit": false,
				"total_volume_sampled_initial": true,
				"total_volume_sampled_unit_initial": true,
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

	//temporary use hard-coded analysis batch sample data object
	public static get ANALYSIS_BATCH_SAMPLE_DATA(): IAnalysisBatch[] {
		return [
			{
			  "id": 1000,
			  "analysis_batch_description": "Veniam aute non exercitation aute reprehenderit ex Lorem ut.",
			  "samples": [
				6,
				13,
				4
			  ],
			  "peg_negs": [
				0
			  ],
			  "studies": [
				3,
				9
			  ],
			  "insert_date": "2015-09-27",
			  "insert_user": "sspencer",
			  "update_date": "2012-12-04",
			  "update_user": "jpstokdyk"
			},
			{
			  "id": 1001,
			  "analysis_batch_description": "Excepteur aliquip voluptate et eiusmod nulla nulla officia voluptate tempor nostrud sunt labore.",
			  "samples": [
				6,
				6,
				13
			  ],
			  "peg_negs": [
				12
			  ],
			  "studies": [
				12,
				2
			  ],
			  "insert_date": "2012-02-16",
			  "insert_user": "jpstokdyk",
			  "update_date": "2012-12-16",
			  "update_user": "jpstokdyk"
			},
			{
			  "id": 1002,
			  "analysis_batch_description": "Consectetur adipisicing exercitation est sit aute qui est velit nulla officia.",
			  "samples": [
				0,
				4,
				5
			  ],
			  "peg_negs": [
				14
			  ],
			  "studies": [
				13,
				3
			  ],
			  "insert_date": "2015-10-07",
			  "insert_user": "afirnstahl",
			  "update_date": "2016-05-04",
			  "update_user": "jpstokdyk"
			},
			{
			  "id": 1003,
			  "analysis_batch_description": "Incididunt dolor et ad id ad amet nulla dolore proident aliqua culpa.",
			  "samples": [
				3,
				12,
				8
			  ],
			  "peg_negs": [
				6
			  ],
			  "studies": [
				6,
				1
			  ],
			  "insert_date": "2014-01-29",
			  "insert_user": "legacy data upload",
			  "update_date": "2015-05-02",
			  "update_user": "sspencer"
			},
			{
			  "id": 1004,
			  "analysis_batch_description": "In velit reprehenderit reprehenderit officia cupidatat eiusmod amet excepteur adipisicing aute cupidatat do.",
			  "samples": [
				2,
				1,
				3
			  ],
			  "peg_negs": [
				13
			  ],
			  "studies": [
				5,
				4
			  ],
			  "insert_date": "2016-08-14",
			  "insert_user": "jpstokdyk",
			  "update_date": "2012-11-21",
			  "update_user": "afirnstahl"
			},
			{
			  "id": 1005,
			  "analysis_batch_description": "Commodo incididunt anim reprehenderit eiusmod pariatur eiusmod in pariatur magna cillum non eu.",
			  "samples": [
				5,
				3,
				5
			  ],
			  "peg_negs": [
				8
			  ],
			  "studies": [
				11,
				13
			  ],
			  "insert_date": "2012-01-09",
			  "insert_user": "jpstokdyk",
			  "update_date": "2015-09-24",
			  "update_user": "sspencer"
			},
			{
			  "id": 1006,
			  "analysis_batch_description": "Officia voluptate exercitation consequat cupidatat pariatur Lorem occaecat minim tempor pariatur anim cupidatat amet velit.",
			  "samples": [
				6,
				11,
				4
			  ],
			  "peg_negs": [
				0
			  ],
			  "studies": [
				7,
				9
			  ],
			  "insert_date": "2017-03-20",
			  "insert_user": "sspencer",
			  "update_date": "2015-02-26",
			  "update_user": "jpstokdyk"
			},
			{
			  "id": 1007,
			  "analysis_batch_description": "Eu eiusmod dolore laborum dolore sit dolore.",
			  "samples": [
				3,
				10,
				3
			  ],
			  "peg_negs": [
				9
			  ],
			  "studies": [
				11,
				4
			  ],
			  "insert_date": "2016-03-15",
			  "insert_user": "afirnstahl",
			  "update_date": "2017-06-07",
			  "update_user": "sspencer"
			},
			{
			  "id": 1008,
			  "analysis_batch_description": "Aliqua sit tempor eu voluptate aute.",
			  "samples": [
				14,
				13,
				8
			  ],
			  "peg_negs": [
				7
			  ],
			  "studies": [
				7,
				6
			  ],
			  "insert_date": "2016-01-31",
			  "insert_user": "legacy data upload",
			  "update_date": "2013-08-11",
			  "update_user": "jpstokdyk"
			},
			{
			  "id": 1009,
			  "analysis_batch_description": "Exercitation adipisicing ea proident veniam duis ullamco elit qui adipisicing commodo qui tempor.",
			  "samples": [
				7,
				5,
				5
			  ],
			  "peg_negs": [
				1
			  ],
			  "studies": [
				1,
				5
			  ],
			  "insert_date": "2013-03-29",
			  "insert_user": "jpstokdyk",
			  "update_date": "2016-03-21",
			  "update_user": "sspencer"
			}
		  ]

	}


}