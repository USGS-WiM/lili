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
				"analysis_batch_description": "Quis occaecat ad mollit quis velit eu occaecat aliqua non proident incididunt veniam.",
				"studies": [
					7,
					9
				],
				"extractions": [
					{
						"id": 1441,
						"extraction_no": 2,
						"extraction_volume": 0.93,
						"elution_volume": 1.37,
						"extraction_method": 1
					},
					{
						"id": 1597,
						"extraction_no": 1,
						"extraction_volume": 0.49,
						"elution_volume": 2.84,
						"extraction_method": 1
					}
				],
				"reverse_transcriptions": [
					{
						"id": 1844,
						"extraction_id": 1578,
						"vol_in": 0.29,
						"vol_out": 0.81,
						"rt_cq": 0.05
					},
					{
						"id": 1534,
						"extraction_id": 1294,
						"vol_in": 0.5,
						"vol_out": 2.81,
						"rt_cq": 1.97
					}
				],
				"inhibitions": [
					{
						"id": 1905,
						"dilution": 44,
						"type": "DNA"
					},
					{
						"id": 1347,
						"dilution": 47,
						"type": "DNA"
					}
				],
				"targets": [
					{
						"id": 1815,
						"name": "Salmonella",
						"abbreviation": "GB",
						"type": "DNA"
					},
					{
						"id": 1005,
						"name": "Crazy Cow-itis",
						"abbreviation": "GB",
						"type": "DNA"
					}
				],
				"analysis_batch_notes": "Pariatur occaecat in elit enim id.",
				"insert_date": "2012-09-13",
				"insert_user": "sspencer",
				"update_date": "2014-04-27",
				"update_user": "sspencer"
			},
			{
				"id": 1001,
				"analysis_batch_description": "Veniam nostrud velit esse officia enim excepteur ea labore in velit irure elit eu.",
				"studies": [
					13,
					6
				],
				"extractions": [
					{
						"id": 1341,
						"extraction_no": 1,
						"extraction_volume": 0.21,
						"elution_volume": 0.53,
						"extraction_method": 2
					},
					{
						"id": 1528,
						"extraction_no": 2,
						"extraction_volume": 0.42,
						"elution_volume": 1.23,
						"extraction_method": 1
					}
				],
				"reverse_transcriptions": [
					{
						"id": 1047,
						"extraction_id": 1138,
						"vol_in": 0.32,
						"vol_out": 2.02,
						"rt_cq": 1.84
					},
					{
						"id": 1094,
						"extraction_id": 1951,
						"vol_in": 0.4,
						"vol_out": 1.16,
						"rt_cq": 2.49
					}
				],
				"inhibitions": [
					{
						"id": 1497,
						"dilution": 30,
						"type": "DNA"
					},
					{
						"id": 1343,
						"dilution": 37,
						"type": "RNA"
					}
				],
				"targets": [
					{
						"id": 1143,
						"name": "E.Coli",
						"abbreviation": "GB",
						"type": "DNA"
					},
					{
						"id": 1698,
						"name": "Crazy Cow-itis",
						"abbreviation": "F",
						"type": "DNA"
					}
				],
				"analysis_batch_notes": "Proident in eiusmod mollit eiusmod duis voluptate et eu quis incididunt dolore ad qui minim.",
				"insert_date": "2014-05-21",
				"insert_user": "jpstokdyk",
				"update_date": "2012-08-27",
				"update_user": "afirnstahl"
			},
			{
				"id": 1002,
				"analysis_batch_description": "Ipsum irure deserunt anim occaecat exercitation labore ex excepteur dolore mollit.",
				"studies": [
					7,
					11
				],
				"extractions": [
					{
						"id": 1400,
						"extraction_no": 1,
						"extraction_volume": 0.38,
						"elution_volume": 2.9,
						"extraction_method": 1
					},
					{
						"id": 1270,
						"extraction_no": 1,
						"extraction_volume": 1.04,
						"elution_volume": 2.86,
						"extraction_method": 1
					}
				],
				"reverse_transcriptions": [
					{
						"id": 1985,
						"extraction_id": 1839,
						"vol_in": 0.89,
						"vol_out": 0.88,
						"rt_cq": 1.78
					},
					{
						"id": 1647,
						"extraction_id": 1965,
						"vol_in": 0.06,
						"vol_out": 2.04,
						"rt_cq": 2.26
					}
				],
				"inhibitions": [
					{
						"id": 1723,
						"dilution": 31,
						"type": "DNA"
					},
					{
						"id": 1441,
						"dilution": 30,
						"type": "RNA"
					}
				],
				"targets": [
					{
						"id": 1680,
						"name": "E.Coli",
						"abbreviation": "E",
						"type": "RNA"
					},
					{
						"id": 1119,
						"name": "Salmonella",
						"abbreviation": "SS",
						"type": "RNA"
					}
				],
				"analysis_batch_notes": "Exercitation et Lorem dolore anim ex occaecat pariatur elit occaecat.",
				"insert_date": "2013-07-19",
				"insert_user": "jpstokdyk",
				"update_date": "2013-04-01",
				"update_user": "sspencer"
			},
			{
				"id": 1003,
				"analysis_batch_description": "Elit aliqua dolore consectetur magna cillum velit aliqua proident nisi est.",
				"studies": [
					8,
					4
				],
				"extractions": [
					{
						"id": 1548,
						"extraction_no": 1,
						"extraction_volume": 0.11,
						"elution_volume": 1.92,
						"extraction_method": 1
					},
					{
						"id": 1782,
						"extraction_no": 2,
						"extraction_volume": 0.61,
						"elution_volume": 0.34,
						"extraction_method": 1
					}
				],
				"reverse_transcriptions": [
					{
						"id": 1897,
						"extraction_id": 1097,
						"vol_in": 1.31,
						"vol_out": 0.22,
						"rt_cq": 2.16
					},
					{
						"id": 1755,
						"extraction_id": 1223,
						"vol_in": 0.47,
						"vol_out": 0.98,
						"rt_cq": 2.51
					}
				],
				"inhibitions": [
					{
						"id": 1315,
						"dilution": 34,
						"type": "RNA"
					},
					{
						"id": 1091,
						"dilution": 36,
						"type": "RNA"
					}
				],
				"targets": [
					{
						"id": 1458,
						"name": "Crazy Cow-itis",
						"abbreviation": "F",
						"type": "RNA"
					},
					{
						"id": 1217,
						"name": "Crazy Cow-itis",
						"abbreviation": "E",
						"type": "DNA"
					}
				],
				"analysis_batch_notes": "Aute velit dolor voluptate dolore consectetur irure sint eiusmod.",
				"insert_date": "2014-05-02",
				"insert_user": "jpstokdyk",
				"update_date": "2012-05-02",
				"update_user": "sspencer"
			},
			{
				"id": 1004,
				"analysis_batch_description": "Non laborum fugiat aliqua veniam occaecat ex laboris duis.",
				"studies": [
					14,
					0
				],
				"extractions": [
					{
						"id": 1686,
						"extraction_no": 2,
						"extraction_volume": 0.15,
						"elution_volume": 2.12,
						"extraction_method": 1
					},
					{
						"id": 1755,
						"extraction_no": 2,
						"extraction_volume": 0.78,
						"elution_volume": 2.44,
						"extraction_method": 1
					}
				],
				"reverse_transcriptions": [
					{
						"id": 1332,
						"extraction_id": 1984,
						"vol_in": 0.68,
						"vol_out": 2.4,
						"rt_cq": 0.77
					},
					{
						"id": 1738,
						"extraction_id": 1801,
						"vol_in": 1.01,
						"vol_out": 2.99,
						"rt_cq": 0.3
					}
				],
				"inhibitions": [
					{
						"id": 1976,
						"dilution": 20,
						"type": "RNA"
					},
					{
						"id": 1284,
						"dilution": 33,
						"type": "RNA"
					}
				],
				"targets": [
					{
						"id": 1882,
						"name": "Bovine Flu",
						"abbreviation": "E",
						"type": "DNA"
					},
					{
						"id": 1999,
						"name": "Salmonella",
						"abbreviation": "GB",
						"type": "DNA"
					}
				],
				"analysis_batch_notes": "Nulla aute deserunt ea do occaecat culpa qui aliquip.",
				"insert_date": "2013-05-31",
				"insert_user": "afirnstahl",
				"update_date": "2014-03-03",
				"update_user": "afirnstahl"
			},
			{
				"id": 1005,
				"analysis_batch_description": "In fugiat qui nulla reprehenderit.",
				"studies": [
					4,
					11
				],
				"extractions": [
					{
						"id": 1058,
						"extraction_no": 1,
						"extraction_volume": 1.27,
						"elution_volume": 1.43,
						"extraction_method": 2
					},
					{
						"id": 1173,
						"extraction_no": 2,
						"extraction_volume": 1.16,
						"elution_volume": 2.99,
						"extraction_method": 2
					}
				],
				"reverse_transcriptions": [
					{
						"id": 1487,
						"extraction_id": 1192,
						"vol_in": 0.84,
						"vol_out": 0.19,
						"rt_cq": 0.6
					},
					{
						"id": 1110,
						"extraction_id": 1692,
						"vol_in": 0.08,
						"vol_out": 1.94,
						"rt_cq": 2.96
					}
				],
				"inhibitions": [
					{
						"id": 1647,
						"dilution": 25,
						"type": "DNA"
					},
					{
						"id": 1324,
						"dilution": 47,
						"type": "DNA"
					}
				],
				"targets": [
					{
						"id": 1388,
						"name": "E.Coli",
						"abbreviation": "F",
						"type": "DNA"
					},
					{
						"id": 1055,
						"name": "E.Coli",
						"abbreviation": "SS",
						"type": "DNA"
					}
				],
				"analysis_batch_notes": "Qui cillum quis elit reprehenderit voluptate eu.",
				"insert_date": "2014-01-31",
				"insert_user": "jpstokdyk",
				"update_date": "2012-02-17",
				"update_user": "jpstokdyk"
			},
			{
				"id": 1006,
				"analysis_batch_description": "Eu ad anim incididunt ipsum.",
				"studies": [
					7,
					1
				],
				"extractions": [
					{
						"id": 1737,
						"extraction_no": 2,
						"extraction_volume": 0.61,
						"elution_volume": 0.04,
						"extraction_method": 1
					},
					{
						"id": 1651,
						"extraction_no": 1,
						"extraction_volume": 1.22,
						"elution_volume": 2.57,
						"extraction_method": 2
					}
				],
				"reverse_transcriptions": [
					{
						"id": 1520,
						"extraction_id": 1994,
						"vol_in": 0.16,
						"vol_out": 2.51,
						"rt_cq": 1.34
					},
					{
						"id": 1955,
						"extraction_id": 1741,
						"vol_in": 1.09,
						"vol_out": 0.89,
						"rt_cq": 1.2
					}
				],
				"inhibitions": [
					{
						"id": 1680,
						"dilution": 12,
						"type": "RNA"
					},
					{
						"id": 1886,
						"dilution": 43,
						"type": "DNA"
					}
				],
				"targets": [
					{
						"id": 1666,
						"name": "Bovine Flu",
						"abbreviation": "E",
						"type": "RNA"
					},
					{
						"id": 1898,
						"name": "Bovine Flu",
						"abbreviation": "GB",
						"type": "DNA"
					}
				],
				"analysis_batch_notes": "Occaecat officia excepteur anim ea deserunt laboris consectetur culpa velit eu non proident veniam.",
				"insert_date": "2016-06-22",
				"insert_user": "legacy data upload",
				"update_date": "2012-09-21",
				"update_user": "jpstokdyk"
			},
			{
				"id": 1007,
				"analysis_batch_description": "Elit veniam do do consequat pariatur dolor.",
				"studies": [
					11,
					9
				],
				"extractions": [
					{
						"id": 1514,
						"extraction_no": 2,
						"extraction_volume": 1.5,
						"elution_volume": 2.08,
						"extraction_method": 2
					},
					{
						"id": 1294,
						"extraction_no": 2,
						"extraction_volume": 0.94,
						"elution_volume": 2.09,
						"extraction_method": 1
					}
				],
				"reverse_transcriptions": [
					{
						"id": 1053,
						"extraction_id": 1730,
						"vol_in": 0.11,
						"vol_out": 1.53,
						"rt_cq": 2.46
					},
					{
						"id": 1947,
						"extraction_id": 1944,
						"vol_in": 0.29,
						"vol_out": 1.14,
						"rt_cq": 0.68
					}
				],
				"inhibitions": [
					{
						"id": 1568,
						"dilution": 12,
						"type": "RNA"
					},
					{
						"id": 1875,
						"dilution": 18,
						"type": "DNA"
					}
				],
				"targets": [
					{
						"id": 1593,
						"name": "E.Coli",
						"abbreviation": "GB",
						"type": "RNA"
					},
					{
						"id": 1858,
						"name": "Bovine Flu",
						"abbreviation": "GB",
						"type": "DNA"
					}
				],
				"analysis_batch_notes": "Reprehenderit mollit nostrud culpa reprehenderit minim eiusmod incididunt velit officia tempor velit cupidatat.",
				"insert_date": "2016-12-11",
				"insert_user": "jpstokdyk",
				"update_date": "2012-06-06",
				"update_user": "jpstokdyk"
			},
			{
				"id": 1008,
				"analysis_batch_description": "Laboris nisi voluptate ea officia ut laborum incididunt est voluptate labore et nisi.",
				"studies": [
					2,
					2
				],
				"extractions": [
					{
						"id": 1430,
						"extraction_no": 1,
						"extraction_volume": 1.21,
						"elution_volume": 1.15,
						"extraction_method": 1
					},
					{
						"id": 1587,
						"extraction_no": 2,
						"extraction_volume": 1.3,
						"elution_volume": 0.33,
						"extraction_method": 1
					}
				],
				"reverse_transcriptions": [
					{
						"id": 1621,
						"extraction_id": 1395,
						"vol_in": 1.07,
						"vol_out": 2.15,
						"rt_cq": 2.07
					},
					{
						"id": 1247,
						"extraction_id": 1685,
						"vol_in": 0.87,
						"vol_out": 0.52,
						"rt_cq": 0.25
					}
				],
				"inhibitions": [
					{
						"id": 1290,
						"dilution": 33,
						"type": "DNA"
					},
					{
						"id": 1821,
						"dilution": 11,
						"type": "RNA"
					}
				],
				"targets": [
					{
						"id": 1932,
						"name": "E.Coli",
						"abbreviation": "E",
						"type": "RNA"
					},
					{
						"id": 1393,
						"name": "Crazy Cow-itis",
						"abbreviation": "GB",
						"type": "DNA"
					}
				],
				"analysis_batch_notes": "Anim nostrud cupidatat ex pariatur amet magna occaecat exercitation culpa enim aliqua voluptate aliquip.",
				"insert_date": "2014-09-22",
				"insert_user": "afirnstahl",
				"update_date": "2012-02-25",
				"update_user": "sspencer"
			},
			{
				"id": 1009,
				"analysis_batch_description": "Et ullamco ullamco ex cupidatat qui nisi veniam aute exercitation quis.",
				"studies": [
					10,
					10
				],
				"extractions": [
					{
						"id": 1087,
						"extraction_no": 2,
						"extraction_volume": 0.56,
						"elution_volume": 2.43,
						"extraction_method": 2
					},
					{
						"id": 1033,
						"extraction_no": 1,
						"extraction_volume": 0.67,
						"elution_volume": 0.24,
						"extraction_method": 2
					}
				],
				"reverse_transcriptions": [
					{
						"id": 1918,
						"extraction_id": 1322,
						"vol_in": 1,
						"vol_out": 2.07,
						"rt_cq": 0.99
					},
					{
						"id": 1931,
						"extraction_id": 1567,
						"vol_in": 0.33,
						"vol_out": 1.38,
						"rt_cq": 2.71
					}
				],
				"inhibitions": [
					{
						"id": 1586,
						"dilution": 38,
						"type": "DNA"
					},
					{
						"id": 1667,
						"dilution": 26,
						"type": "RNA"
					}
				],
				"targets": [
					{
						"id": 1730,
						"name": "Salmonella",
						"abbreviation": "GB",
						"type": "DNA"
					},
					{
						"id": 1813,
						"name": "Salmonella",
						"abbreviation": "E",
						"type": "RNA"
					}
				],
				"analysis_batch_notes": "Aliqua ipsum ea anim exercitation ullamco consequat veniam minim do occaecat non consequat ad aliquip.",
				"insert_date": "2013-06-20",
				"insert_user": "sspencer",
				"update_date": "2013-01-25",
				"update_user": "sspencer"
			}
		]

	}


}