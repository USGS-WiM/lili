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
				"analysis_batch_description": "Sit elit veniam nisi ad magna proident consequat tempor.",
				"samples": [
					8,
					13,
					9
				],
				"peg_negs": [
					6
				],
				"studies": [
					7,
					4
				]
			},
			{
				"id": 1001,
				"analysis_batch_description": "Cillum mollit labore voluptate sit qui sunt nostrud consequat cillum enim irure culpa officia.",
				"samples": [
					9,
					6,
					10
				],
				"peg_negs": [
					1
				],
				"studies": [
					6,
					3
				]
			},
			{
				"id": 1002,
				"analysis_batch_description": "Culpa laboris proident proident aliqua pariatur ipsum.",
				"samples": [
					0,
					5,
					10
				],
				"peg_negs": [
					10
				],
				"studies": [
					6,
					11
				]
			},
			{
				"id": 1003,
				"analysis_batch_description": "Aute qui ad duis adipisicing.",
				"samples": [
					14,
					4,
					1
				],
				"peg_negs": [
					3
				],
				"studies": [
					13,
					5
				]
			},
			{
				"id": 1004,
				"analysis_batch_description": "Exercitation aliquip ipsum est ad velit ut incididunt voluptate ipsum occaecat quis culpa ullamco.",
				"samples": [
					11,
					3,
					1
				],
				"peg_negs": [
					8
				],
				"studies": [
					3,
					3
				]
			},
			{
				"id": 1005,
				"analysis_batch_description": "Officia aute eu nostrud ex elit consectetur.",
				"samples": [
					9,
					2,
					11
				],
				"peg_negs": [
					14
				],
				"studies": [
					2,
					8
				]
			},
			{
				"id": 1006,
				"analysis_batch_description": "Magna aliqua labore minim laborum nulla anim consectetur aliqua ad proident.",
				"samples": [
					8,
					1,
					1
				],
				"peg_negs": [
					10
				],
				"studies": [
					13,
					9
				]
			},
			{
				"id": 1007,
				"analysis_batch_description": "Cupidatat qui magna id aliqua nisi incididunt laboris ullamco cupidatat laborum veniam.",
				"samples": [
					9,
					4,
					5
				],
				"peg_negs": [
					5
				],
				"studies": [
					8,
					12
				]
			},
			{
				"id": 1008,
				"analysis_batch_description": "Lorem quis cupidatat aliquip Lorem consequat ea esse dolore et et ex fugiat.",
				"samples": [
					5,
					12,
					10
				],
				"peg_negs": [
					7
				],
				"studies": [
					11,
					10
				]
			},
			{
				"id": 1009,
				"analysis_batch_description": "Reprehenderit deserunt adipisicing minim ipsum.",
				"samples": [
					12,
					5,
					13
				],
				"peg_negs": [
					6
				],
				"studies": [
					11,
					1
				]
			}
		]

	}


}