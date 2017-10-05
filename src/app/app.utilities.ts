import { Injectable } from '@angular/core';

import { IAnalysisBatchSummary } from './analysis-batches/analysis-batch-summary';
import { IAnalysisBatch } from './analysis-batches/analysis-batch';
import { ITarget } from './targets/target';

@Injectable()
export class APP_UTILITIES {

	// SAMPLE_FORM_CONFIG is the config JSON object for the sample form, based on matrix selection
	// object keys match the matrix ID
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

	public static get ANALYSIS_BATCH_SUMMARY_ENDPOINT(): IAnalysisBatchSummary[] {
		return [
			{
				"id": 1000,
				"analysis_batch_description": "Velit irure Lorem et reprehenderit.",
				"analysis_batch_notes": "Ipsum laboris reprehenderit eu laboris veniam.",
				"studies": [
					10
				],
				"extraction_count": 2,
				"inhibition_count": 4,
				"reverse_transcription_count": 4,
				"target_count": 8,
				"insert_date": "2017-06-11",
				"insert_user": "sspencer",
				"update_date": "2012-08-20",
				"update_user": "afirnstahl"
			},
			{
				"id": 1001,
				"analysis_batch_description": "Esse officia deserunt sit pariatur.",
				"analysis_batch_notes": "Aliquip Lorem qui quis dolore ullamco duis et ad nostrud.",
				"studies": [
					10,
					14
				],
				"extraction_count": 0,
				"inhibition_count": 0,
				"reverse_transcription_count": 0,
				"target_count": 0,
				"insert_date": "2013-04-14",
				"insert_user": "afirnstahl",
				"update_date": "2015-09-09",
				"update_user": "afirnstahl"
			},
			{
				"id": 1002,
				"analysis_batch_description": "Laborum consequat in exercitation ea amet velit fugiat anim et.",
				"analysis_batch_notes": "Dolore reprehenderit id quis amet.",
				"studies": [
					12,
					9
				],
				"extraction_count": 2,
				"inhibition_count": 4,
				"reverse_transcription_count": 4,
				"target_count": 10,
				"insert_date": "2017-06-13",
				"insert_user": "jpstokdyk",
				"update_date": "2012-03-08",
				"update_user": "jpstokdyk"
			},
			{
				"id": 1003,
				"analysis_batch_description": "Eu adipisicing sunt velit minim fugiat nostrud Lorem nulla non quis ad.",
				"analysis_batch_notes": "Cillum adipisicing amet occaecat duis qui velit ullamco elit esse ad ex velit excepteur anim.",
				"studies": [
					4,
					3
				],
				"extraction_count": 2,
				"inhibition_count": 4,
				"reverse_transcription_count": 4,
				"target_count": 11,
				"insert_date": "2016-11-16",
				"insert_user": "sspencer",
				"update_date": "2012-09-26",
				"update_user": "afirnstahl"
			},
			{
				"id": 1004,
				"analysis_batch_description": "Nulla ad velit dolore excepteur.",
				"analysis_batch_notes": "Ut do ea minim magna velit.",
				"studies": [
					10,
					0
				],
				"extraction_count": 2,
				"inhibition_count": 4,
				"reverse_transcription_count": 4,
				"target_count": 5,
				"insert_date": "2017-07-25",
				"insert_user": "sspencer",
				"update_date": "2017-03-27",
				"update_user": "sspencer"
			},
			{
				"id": 1005,
				"analysis_batch_description": "Tempor do aliqua reprehenderit ex cillum exercitation cillum in consectetur laborum aliqua in fugiat.",
				"analysis_batch_notes": "Amet commodo reprehenderit mollit consequat consectetur tempor ut voluptate id velit.",
				"studies": [
					7,
					13
				],
				"extraction_count": 2,
				"inhibition_count": 4,
				"reverse_transcription_count": 4,
				"target_count": 6,
				"insert_date": "2015-08-13",
				"insert_user": "afirnstahl",
				"update_date": "2016-05-16",
				"update_user": "jpstokdyk"
			},
			{
				"id": 1006,
				"analysis_batch_description": "Enim aliqua laborum incididunt labore eu fugiat aliqua et qui eu sit magna qui sunt.",
				"analysis_batch_notes": "Anim eiusmod non ad fugiat Lorem ipsum incididunt ad id.",
				"studies": [
					7,
					8
				],
				"extraction_count": 2,
				"inhibition_count": 4,
				"reverse_transcription_count": 4,
				"target_count": 5,
				"insert_date": "2016-02-16",
				"insert_user": "sspencer",
				"update_date": "2016-12-04",
				"update_user": "afirnstahl"
			},
			{
				"id": 1007,
				"analysis_batch_description": "Commodo reprehenderit laborum ullamco ea anim cupidatat esse dolor veniam nostrud et nostrud laboris ut.",
				"analysis_batch_notes": "Incididunt commodo aliqua velit qui pariatur id excepteur.",
				"studies": [
					6,
					0
				],
				"extraction_count": 2,
				"inhibition_count": 4,
				"reverse_transcription_count": 4,
				"target_count": 12,
				"insert_date": "2013-02-26",
				"insert_user": "legacy data upload",
				"update_date": "2014-03-18",
				"update_user": "sspencer"
			},
			{
				"id": 1008,
				"analysis_batch_description": "Laborum nostrud eu esse do et.",
				"analysis_batch_notes": "Veniam velit excepteur sint esse dolore tempor eiusmod sit ex.",
				"studies": [
					7,
					8
				],
				"extraction_count": 2,
				"inhibition_count": 4,
				"reverse_transcription_count": 4,
				"target_count": 15,
				"insert_date": "2015-06-26",
				"insert_user": "jpstokdyk",
				"update_date": "2014-02-25",
				"update_user": "jpstokdyk"
			},
			{
				"id": 1009,
				"analysis_batch_description": "Officia eu duis non aliquip sint Lorem.",
				"analysis_batch_notes": "Elit voluptate occaecat voluptate mollit quis officia pariatur velit voluptate amet enim velit.",
				"studies": [
					2,
					10
				],
				"extraction_count": 2,
				"inhibition_count": 4,
				"reverse_transcription_count": 4,
				"target_count": 2,
				"insert_date": "2012-04-11",
				"insert_user": "jpstokdyk",
				"update_date": "2017-01-19",
				"update_user": "jpstokdyk"
			}
		]

	}

	public static get ANALYSIS_BATCH_DETAIL_ENDPOINT(): IAnalysisBatch[] {
		return []
	}

	// temporary use hard-coded target sample data object
	public static get TARGETS_ENDPOINT(): ITarget[] {
		return [
			{
				"id": 0,
				"name": "Enterovirus",
				"code": "E",
				"medium": "Human",
				"type": "RNA"
			},
			{
				"id": 1,
				"name": "G1 Norovirus",
				"code": "G1",
				"medium": "Human",
				"type": "DNA"
			},
			{
				"id": 2,
				"name": "G2 Norovirus",
				"code": "G2",
				"medium": "Human",
				"type": "RNA"
			},
			{
				"id": 3,
				"name": "Adenovirus",
				"code": "A",
				"medium": "Human",
				"type": "DNA"
			},
			{
				"id": 4,
				"name": "Adenovirus AA",
				"code": "AA",
				"medium": "Human",
				"type": "DNA"
			},
			{
				"id": 5,
				"name": "Adenovirus AB",
				"code": "AB",
				"medium": "Human",
				"type": "DNA"
			},
			{
				"id": 6,
				"name": "HAV",
				"code": "H",
				"medium": "Human",
				"type": "RNA"
			},
			{
				"id": 7,
				"name": "Human rotavirus",
				"code": "R",
				"medium": "Human",
				"type": "RNA"
			}

		]

	}

	public static get INHIBITIONS_PER_SAMPLE_ENDPOINT() {
		return [
			{
				"id": 1003,
				"sample_type": 1,
				"sample_description": "test",
				"inhibitions": [
					{
						"id": 1877,
						"inhibition_number": 1,
						"type": "DNA",
						"dilution_factor": 10,
						"inhibition_date": "2017-09-13",
						"created_date": "2017-09-26",
						"created_by": 1,
						"modified_date": "2017-09-26",
						"modified_by": 1
					}
				]
			},
			{
				"id": 1237,
				"sample_type": 1,
				"sample_description": "test",
				"inhibitions": [
					{
						"id": 1547,
						"inhibition_number": 1,
						"type": "DNA",
						"dilution_factor": 5,
						"inhibition_date": "2017-09-13",
						"created_date": "2017-09-26",
						"created_by": 1,
						"modified_date": "2017-09-26",
						"modified_by": 1
					}
				]
			},
			{
				"id": 1678,
				"sample_type": 1,
				"sample_description": "test",
				"inhibitions": [
					{
						"id": 1888,
						"inhibition_number": 1,
						"type": "DNA",
						"dilution_factor": 5,
						"inhibition_date": "2017-09-13",
						"created_date": "2017-09-26",
						"created_by": 1,
						"modified_date": "2017-09-26",
						"modified_by": 1
					}
				]
			},
			{
				"id": 1456,
				"sample_type": 1,
				"sample_description": "test",
				"inhibitions": [
					{
						"id": 1654,
						"inhibition_number": 1,
						"type": "RNA",
						"dilution_factor": 1,
						"inhibition_date": "2017-09-13",
						"created_date": "2017-09-26",
						"created_by": 1,
						"modified_date": "2017-09-26",
						"modified_by": 1
					},
					{
						"id": 1655,
						"inhibition_number": 1,
						"type": "DNA",
						"dilution_factor": 5,
						"inhibition_date": "2017-09-13",
						"created_date": "2017-09-26",
						"created_by": 1,
						"modified_date": "2017-09-26",
						"modified_by": 1
					}
				]
			}
		]

	}
}
