import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SETTINGS } from '../app.settings';

import { IAnalysisBatch } from './analysis-batch';
import { IAnalysisBatchSummary } from './analysis-batch-summary';
import { IAnalysisBatchDetail } from './analysis-batch-detail';



@Injectable()
export class AnalysisBatchService {

  constructor(private _http: Http) { }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  //**********************************************Temporary**************************************************** */
  //temporary function to return AB details, in place until AB endpoint is functional
  public getAnalysisBatchData(abID): IAnalysisBatchDetail {
    switch (abID) {
      case 1000:
        return {
          "id": 1000,
          "analysis_batch_description": "1st dummy analysis batch.",
          "analysis_batch_notes": "Dummy AB for exploring lili",
          "samples": [
            {
              "id": 10,
              "sample_type": 2,
              "sample_description": "Dolor ipsum ipsum amet non reprehenderit officia Lorem deserunt cupidatat ex."
            },
            {
              "id": 4,
              "sample_type": 4,
              "sample_description": "Aliquip amet adipisicing duis adipisicing velit quis id qui Lorem qui labore."
            },
            {
              "id": 7,
              "sample_type": 4,
              "sample_description": "In irure duis proident ullamco irure ex commodo."
            },
            {
              "id": 3,
              "sample_type": 1,
              "sample_description": "Ullamco eu aute sint eu amet exercitation sunt fugiat voluptate pariatur."
            }
          ],
          "studies": [
            {
              "id": 4,
              "name": "Kewuanee County Study",
              "description": "Laboris consequat est incididunt ut duis."
            }
          ],
          "extractions": [
            {
              "id": 1027,
              "extraction_no": 1,
              "extraction_volume": 1.44,
              "elution_volume": 2.35,
              "extraction_method": 1,
              "extraction_date": "2013-07-25",
              "inhibitions": [
                {
                  "id": 1090,
                  "inhibition_no": 1,
                  "dilution_factor": 32,
                  "type": "RNA",
                  "inhibition_date": "2013-04-17",
                  "created_date": "2014-12-02",
                  "created_by": "legacy data upload",
                  "modified_date": "2016-04-05",
                  "modified_by": "sspencer"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1006,
                  "rt_no": 1,
                  "extraction_id": 1516,
                  "template_volume": 0.76,
                  "reaction_volume": 0.27,
                  "rt_cq": 1.51,
                  "rt_date": "2016-09-14",
                  "created_date": "2014-08-19",
                  "created_by": "legacy data upload",
                  "modified_date": "2017-09-01",
                  "modified_by": "jpstokdyk"
                }
              ],
              "targets": [
                {
                  "id": 2,
                  "name": "Enterovirus",
                  "code": "E",
                  "type": "RNA",
                  "replicates": 3
                },
                {
                  "id": 8,
                  "name": "HAV",
                  "code": "H",
                  "type": "RNA",
                  "replicates": 8
                }
              ]
            },
            {
              "id": 1019,
              "extraction_no": 2,
              "extraction_volume": 0.02,
              "elution_volume": 2.44,
              "extraction_method": 2,
              "extraction_date": "2016-12-09",
              "inhibitions": [
                {
                  "id": 1031,
                  "inhibition_no": 1,
                  "dilution_factor": 8,
                  "type": "RNA",
                  "inhibition_date": "2016-09-17",
                  "created_date": "2015-10-09",
                  "created_by": "legacy data upload",
                  "modified_date": "2017-01-12",
                  "modified_by": "jpstokdyk"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1008,
                  "rt_no": 2,
                  "extraction_id": 1730,
                  "template_volume": 0.87,
                  "reaction_volume": 0.18,
                  "rt_cq": 0.96,
                  "rt_date": "2014-03-05",
                  "created_date": "2014-12-04",
                  "created_by": "sspencer",
                  "modified_date": "2016-05-16",
                  "modified_by": "sspencer"
                }
              ],
              "targets": [
                {
                  "id": 2,
                  "name": "Enterovirus",
                  "code": "E",
                  "type": "RNA",
                  "replicates": 2
                },
                {
                  "id": 9,
                  "name": "Human rotavirus",
                  "code": "R",
                  "type": "RNA",
                  "replicates": 3
                }
              ]
            }
          ],
          "created_date": "2016-06-12",
          "created_by": "sspencer",
          "modified_date": "2017-05-07",
          "modified_by": "jpstokdyk"
        };
      case 1001:
        return {
          "id": 1001,
          "analysis_batch_description": "Lorem commodo est quis cillum duis mollit incididunt ea incididunt laboris enim culpa.",
          "analysis_batch_notes": "Labore eiusmod id esse excepteur dolore.",
          "samples": [
            {
              "id": 4,
              "sample_type": 1,
              "sample_description": "Fugiat ut eu sunt deserunt sit minim sit proident sint culpa dolore id adipisicing."
            },
            {
              "id": 14,
              "sample_type": 2,
              "sample_description": "Deserunt magna labore consectetur cillum nulla excepteur laborum sit amet irure deserunt."
            },
            {
              "id": 7,
              "sample_type": 5,
              "sample_description": "Aute velit commodo laboris aliqua cillum cupidatat quis ipsum quis amet in cillum."
            },
            {
              "id": 8,
              "sample_type": 5,
              "sample_description": "Sit dolore eiusmod cupidatat id."
            }
          ],
          "studies": [
            {
              "id": 14,
              "name": "Kewuanee County Study",
              "description": "Dolore irure id ut nostrud labore."
            },
            {
              "id": 5,
              "name": "Iowa Well Monitoring Study 2016",
              "description": "Eiusmod deserunt mollit Lorem adipisicing ullamco ad incididunt sunt proident."
            }
          ],
          "extractions": [
            {
              "id": 1079,
              "extraction_no": 1,
              "extraction_volume": 0.24,
              "elution_volume": 0.92,
              "extraction_method": 2,
              "extraction_date": "2013-12-09",
              "inhibitions": [
                {
                  "id": 1049,
                  "inhibition_no": 1,
                  "dilution_factor": 45,
                  "type": "DNA",
                  "inhibition_date": "2015-07-01",
                  "created_date": "2016-12-03",
                  "created_by": "afirnstahl",
                  "modified_date": "2013-05-26",
                  "modified_by": "afirnstahl"
                },
                {
                  "id": 1014,
                  "inhibition_no": 2,
                  "dilution_factor": 31,
                  "type": "RNA",
                  "inhibition_date": "2016-04-11",
                  "created_date": "2014-06-17",
                  "created_by": "legacy data upload",
                  "modified_date": "2015-05-28",
                  "modified_by": "sspencer"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1081,
                  "rt_no": 1,
                  "extraction_id": 1634,
                  "template_volume": 1.23,
                  "reaction_volume": 1.29,
                  "rt_cq": 0.85,
                  "rt_date": "2012-11-30",
                  "created_date": "2015-03-20",
                  "created_by": "legacy data upload",
                  "modified_date": "2012-08-20",
                  "modified_by": "afirnstahl"
                },
                {
                  "id": 1066,
                  "rt_no": 2,
                  "extraction_id": 1087,
                  "template_volume": 1.42,
                  "reaction_volume": 0.31,
                  "rt_cq": 0.61,
                  "rt_date": "2015-02-10",
                  "created_date": "2016-07-24",
                  "created_by": "jpstokdyk",
                  "modified_date": "2017-04-21",
                  "modified_by": "sspencer"
                }
              ],
              "targets": [
                {
                  "id": 3,
                  "name": "G1 Norovirus",
                  "code": "G1",
                  "type": "DNA",
                  "replicates": 6
                },
                {
                  "id": 8,
                  "name": "HAV",
                  "code": "H",
                  "type": "RNA",
                  "replicates": 8
                }
              ]
            },
            {
              "id": 1092,
              "extraction_no": 2,
              "extraction_volume": 1.32,
              "elution_volume": 1.62,
              "extraction_method": 1,
              "extraction_date": "2015-11-28",
              "inhibitions": [
                {
                  "id": 1100,
                  "inhibition_no": 1,
                  "dilution_factor": 1,
                  "type": "RNA",
                  "inhibition_date": "2015-11-21",
                  "created_date": "2012-05-25",
                  "created_by": "afirnstahl",
                  "modified_date": "2016-03-19",
                  "modified_by": "afirnstahl"
                },
                {
                  "id": 1012,
                  "inhibition_no": 2,
                  "dilution_factor": 5,
                  "type": "RNA",
                  "inhibition_date": "2015-04-08",
                  "created_date": "2015-08-23",
                  "created_by": "sspencer",
                  "modified_date": "2014-03-07",
                  "modified_by": "sspencer"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1060,
                  "rt_no": 1,
                  "extraction_id": 1895,
                  "template_volume": 0.76,
                  "reaction_volume": 1.1,
                  "rt_cq": 1.24,
                  "rt_date": "2017-08-13",
                  "created_date": "2016-04-21",
                  "created_by": "afirnstahl",
                  "modified_date": "2016-04-20",
                  "modified_by": "jpstokdyk"
                },
                {
                  "id": 1048,
                  "rt_no": 2,
                  "extraction_id": 1312,
                  "template_volume": 0.24,
                  "reaction_volume": 1.55,
                  "rt_cq": 1.5,
                  "rt_date": "2014-07-25",
                  "created_date": "2013-02-07",
                  "created_by": "jpstokdyk",
                  "modified_date": "2016-11-25",
                  "modified_by": "afirnstahl"
                }
              ],
              "targets": [
                {
                  "id": 9,
                  "name": "Human rotavirus",
                  "code": "R",
                  "type": "RNA",
                  "replicates": 6
                },
                {
                  "id": 2,
                  "name": "Enterovirus",
                  "code": "E",
                  "type": "RNA",
                  "replicates": 7
                }
              ]
            }
          ],
          "created_date": "2013-03-02",
          "created_by": "jpstokdyk",
          "modified_date": "2014-01-20",
          "modified_by": "jpstokdyk"
        }
      case 1002:
        return {
          "id": 1002,
          "analysis_batch_description": "Dolore nisi velit sunt eu labore dolore ex non reprehenderit esse cupidatat.",
          "analysis_batch_notes": "Proident consequat voluptate aliqua est et do proident reprehenderit adipisicing.",
          "samples": [
            {
              "id": 1490,
              "sample_type": 3,
              "sample_description": "Proident eiusmod elit elit incididunt magna exercitation consectetur cupidatat."
            },
            {
              "id": 1270,
              "sample_type": 5,
              "sample_description": "Do elit fugiat duis laborum irure mollit cillum adipisicing quis eu in."
            },
            {
              "id": 1056,
              "sample_type": 5,
              "sample_description": "Quis enim nisi tempor ex minim."
            },
            {
              "id": 1166,
              "sample_type": 4,
              "sample_description": "In laboris sint ea mollit sunt do culpa eiusmod anim incididunt dolor eu cillum."
            }
          ],
          "studies": [
            {
              "id": 10,
              "name": "Iowa DNR Beach Study 2016",
              "description": "Id ea et qui est."
            },
            {
              "id": 4,
              "name": "Iowa Well Monitoring Study 2016",
              "description": "Nostrud qui sunt voluptate veniam pariatur elit do duis aute."
            }
          ],
          "extractions": [
            {
              "id": 1006,
              "extraction_no": 1,
              "extraction_volume": 0.65,
              "elution_volume": 0.25,
              "extraction_method": 1,
              "extraction_date": "2012-07-23",
              "inhibitions": [
                {
                  "id": 1071,
                  "inhibition_no": 1,
                  "dilution_factor": 1,
                  "type": "RNA",
                  "inhibition_date": "2015-10-22",
                  "created_date": "2015-05-04",
                  "created_by": "legacy data upload",
                  "modified_date": "2013-07-07",
                  "modified_by": "afirnstahl"
                },
                {
                  "id": 1056,
                  "inhibition_no": 2,
                  "dilution_factor": 10,
                  "type": "RNA",
                  "inhibition_date": "2017-01-19",
                  "created_date": "2012-04-17",
                  "created_by": "afirnstahl",
                  "modified_date": "2015-04-21",
                  "modified_by": "jpstokdyk"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1066,
                  "rt_no": 1,
                  "extraction_id": 1332,
                  "template_volume": 0.86,
                  "reaction_volume": 2.02,
                  "rt_cq": 1.2,
                  "rt_date": "2013-05-27",
                  "created_date": "2012-02-04",
                  "created_by": "afirnstahl",
                  "modified_date": "2015-04-01",
                  "modified_by": "afirnstahl"
                },
                {
                  "id": 1084,
                  "rt_no": 2,
                  "extraction_id": 1989,
                  "template_volume": 0.57,
                  "reaction_volume": 1.82,
                  "rt_cq": 1.52,
                  "rt_date": "2015-12-12",
                  "created_date": "2013-12-22",
                  "created_by": "jpstokdyk",
                  "modified_date": "2016-11-14",
                  "modified_by": "afirnstahl"
                }
              ],
              "targets": [
                {
                  "id": 9,
                  "name": "Human rotavirus",
                  "code": "R",
                  "type": "RNA",
                  "replicates": 8
                },
                {
                  "id": 2,
                  "name": "Enterovirus",
                  "code": "E",
                  "type": "RNA",
                  "replicates": 4
                }
              ]
            },
            {
              "id": 1044,
              "extraction_no": 2,
              "extraction_volume": 0.73,
              "elution_volume": 1.24,
              "extraction_method": 1,
              "extraction_date": "2016-11-11",
              "inhibitions": [
                {
                  "id": 1016,
                  "inhibition_no": 1,
                  "dilution_factor": 5,
                  "type": "DNA",
                  "inhibition_date": "2014-09-15",
                  "created_date": "2017-09-07",
                  "created_by": "sspencer",
                  "modified_date": "2014-10-11",
                  "modified_by": "sspencer"
                },
                {
                  "id": 1019,
                  "inhibition_no": 2,
                  "dilution_factor": 5,
                  "type": "RNA",
                  "inhibition_date": "2017-05-24",
                  "created_date": "2017-02-20",
                  "created_by": "sspencer",
                  "modified_date": "2013-04-15",
                  "modified_by": "sspencer"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1025,
                  "rt_no": 1,
                  "extraction_id": 1830,
                  "template_volume": 1.39,
                  "reaction_volume": 1.36,
                  "rt_cq": 2.18,
                  "rt_date": "2016-04-12",
                  "created_date": "2013-12-03",
                  "created_by": "legacy data upload",
                  "modified_date": "2012-08-24",
                  "modified_by": "sspencer"
                },
                {
                  "id": 1094,
                  "rt_no": 2,
                  "extraction_id": 1010,
                  "template_volume": 1.46,
                  "reaction_volume": 0.92,
                  "rt_cq": 0.46,
                  "rt_date": "2016-06-21",
                  "created_date": "2013-06-29",
                  "created_by": "sspencer",
                  "modified_date": "2017-05-23",
                  "modified_by": "afirnstahl"
                }
              ],
              "targets": [
                {
                  "id": 2,
                  "name": "Enterovirus",
                  "code": "E",
                  "type": "RNA",
                  "replicates": 2
                },
                {
                  "id": 3,
                  "name": "G1 Norovirus",
                  "code": "G1",
                  "type": "DNA",
                  "replicates": 2
                }
              ]
            }
          ],
          "created_date": "2014-09-28",
          "created_by": "jpstokdyk",
          "modified_date": "2014-02-13",
          "modified_by": "jpstokdyk"
        }
      case 1003:
        return {
          "id": 1003,
          "analysis_batch_description": "Sit esse id adipisicing voluptate irure aute deserunt reprehenderit qui cillum culpa reprehenderit nostrud.",
          "analysis_batch_notes": "Excepteur irure laboris excepteur est esse.",
          "samples": [
            {
              "id": 1252,
              "sample_type": 3,
              "sample_description": "Ut proident ipsum reprehenderit laborum excepteur est fugiat aute fugiat excepteur amet cupidatat."
            },
            {
              "id": 1376,
              "sample_type": 5,
              "sample_description": "Amet dolor aliqua consectetur dolor sunt excepteur veniam excepteur irure sint cupidatat nisi nulla exercitation."
            },
            {
              "id": 1315,
              "sample_type": 3,
              "sample_description": "Deserunt incididunt cupidatat nulla nulla id."
            },
            {
              "id": 1041,
              "sample_type": 1,
              "sample_description": "Sit dolor cupidatat Lorem incididunt consectetur reprehenderit minim exercitation exercitation mollit sunt ipsum deserunt."
            }
          ],
          "studies": [
            {
              "id": 4,
              "name": "Iowa DNR Beach Study 2016",
              "description": "Eiusmod laborum fugiat laboris fugiat commodo non magna."
            },
            {
              "id": 14,
              "name": "Iowa DNR Beach Study 2016",
              "description": "Mollit culpa ex id aliqua proident labore ex irure."
            }
          ],
          "extractions": [
            {
              "id": 1063,
              "extraction_no": 1,
              "extraction_volume": 1.09,
              "elution_volume": 0.21,
              "extraction_method": 1,
              "extraction_date": "2013-01-30",
              "inhibitions": [
                {
                  "id": 1008,
                  "inhibition_no": 1,
                  "dilution_factor": 29,
                  "type": "RNA",
                  "inhibition_date": "2012-10-27",
                  "created_date": "2012-02-05",
                  "created_by": "sspencer",
                  "modified_date": "2016-02-18",
                  "modified_by": "afirnstahl"
                },
                {
                  "id": 1058,
                  "inhibition_no": 2,
                  "dilution_factor": 6,
                  "type": "RNA",
                  "inhibition_date": "2012-10-01",
                  "created_date": "2013-05-19",
                  "created_by": "legacy data upload",
                  "modified_date": "2016-02-18",
                  "modified_by": "afirnstahl"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1098,
                  "rt_no": 1,
                  "extraction_id": 1551,
                  "template_volume": 0.3,
                  "reaction_volume": 2.06,
                  "rt_cq": 2.86,
                  "rt_date": "2016-03-02",
                  "created_date": "2013-09-15",
                  "created_by": "jpstokdyk",
                  "modified_date": "2014-04-12",
                  "modified_by": "afirnstahl"
                },
                {
                  "id": 1032,
                  "rt_no": 2,
                  "extraction_id": 1831,
                  "template_volume": 0.85,
                  "reaction_volume": 1.82,
                  "rt_cq": 2.78,
                  "rt_date": "2015-06-11",
                  "created_date": "2015-10-09",
                  "created_by": "afirnstahl",
                  "modified_date": "2016-08-05",
                  "modified_by": "sspencer"
                }
              ],
              "targets": [
                {
                  "id": 8,
                  "name": "HAV",
                  "code": "H",
                  "type": "RNA",
                  "replicates": 7
                },
                {
                  "id": 2,
                  "name": "Enterovirus",
                  "code": "E",
                  "type": "RNA",
                  "replicates": 8
                }
              ]
            },
            {
              "id": 1031,
              "extraction_no": 2,
              "extraction_volume": 1.43,
              "elution_volume": 0.43,
              "extraction_method": 2,
              "extraction_date": "2017-09-04",
              "inhibitions": [
                {
                  "id": 1070,
                  "inhibition_no": 1,
                  "dilution_factor": 26,
                  "type": "DNA",
                  "inhibition_date": "2013-10-18",
                  "created_date": "2012-03-08",
                  "created_by": "jpstokdyk",
                  "modified_date": "2013-09-23",
                  "modified_by": "jpstokdyk"
                },
                {
                  "id": 1030,
                  "inhibition_no": 2,
                  "dilution_factor": 49,
                  "type": "RNA",
                  "inhibition_date": "2017-05-09",
                  "created_date": "2015-02-21",
                  "created_by": "jpstokdyk",
                  "modified_date": "2013-12-22",
                  "modified_by": "afirnstahl"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1025,
                  "rt_no": 1,
                  "extraction_id": 1185,
                  "template_volume": 0.1,
                  "reaction_volume": 0.66,
                  "rt_cq": 1.02,
                  "rt_date": "2015-10-28",
                  "created_date": "2012-12-22",
                  "created_by": "sspencer",
                  "modified_date": "2015-05-30",
                  "modified_by": "sspencer"
                },
                {
                  "id": 1058,
                  "rt_no": 2,
                  "extraction_id": 1128,
                  "template_volume": 1.44,
                  "reaction_volume": 2.13,
                  "rt_cq": 0.73,
                  "rt_date": "2017-08-22",
                  "created_date": "2016-05-05",
                  "created_by": "afirnstahl",
                  "modified_date": "2017-03-06",
                  "modified_by": "sspencer"
                }
              ],
              "targets": [
                {
                  "id": 3,
                  "name": "G1 Norovirus",
                  "code": "F",
                  "type": "RNA",
                  "replicates": 5
                },
                {
                  "id": 4,
                  "name": "G2 Norovirus",
                  "code": "G2",
                  "type": "DNA",
                  "replicates": 3
                }
              ]
            }
          ],
          "created_date": "2012-12-29",
          "created_by": "afirnstahl",
          "modified_date": "2012-04-08",
          "modified_by": "jpstokdyk"
        }
      case 1004:
        return {
          "id": 1004,
          "analysis_batch_description": "Laborum est aliquip proident nostrud excepteur ex culpa enim nostrud nisi.",
          "analysis_batch_notes": "Ex in sit commodo sit mollit incididunt dolor mollit labore sit cupidatat.",
          "samples": [
            {
              "id": 1075,
              "sample_type": 3,
              "sample_description": "Nisi aliqua qui commodo et."
            },
            {
              "id": 1188,
              "sample_type": 4,
              "sample_description": "Et laboris velit non exercitation velit ex voluptate sunt ipsum."
            },
            {
              "id": 1329,
              "sample_type": 2,
              "sample_description": "Veniam nostrud ipsum esse anim magna deserunt."
            },
            {
              "id": 1032,
              "sample_type": 5,
              "sample_description": "Elit non dolore magna cillum."
            }
          ],
          "studies": [
            {
              "id": 4,
              "name": "MDH Storm Water Irrigation",
              "description": "Tempor mollit quis cupidatat qui magna Lorem magna ipsum excepteur officia proident."
            },
            {
              "id": 3,
              "name": "Kewuanee County Study",
              "description": "Officia ut fugiat exercitation excepteur ex reprehenderit sit."
            }
          ],
          "extractions": [
            {
              "id": 1076,
              "extraction_no": 1,
              "extraction_volume": 1.26,
              "elution_volume": 0.13,
              "extraction_method": 1,
              "extraction_date": "2012-10-22",
              "inhibitions": [
                {
                  "id": 1029,
                  "inhibition_no": 1,
                  "dilution_factor": 18,
                  "type": "RNA",
                  "inhibition_date": "2013-11-29",
                  "created_date": "2016-08-05",
                  "created_by": "legacy data upload",
                  "modified_date": "2016-04-02",
                  "modified_by": "jpstokdyk"
                },
                {
                  "id": 1077,
                  "inhibition_no": 2,
                  "dilution_factor": 25,
                  "type": "RNA",
                  "inhibition_date": "2016-05-13",
                  "created_date": "2015-11-14",
                  "created_by": "jpstokdyk",
                  "modified_date": "2016-07-25",
                  "modified_by": "afirnstahl"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1015,
                  "rt_no": 1,
                  "extraction_id": 1138,
                  "template_volume": 0.56,
                  "reaction_volume": 2.65,
                  "rt_cq": 1,
                  "rt_date": "2017-03-29",
                  "created_date": "2013-04-11",
                  "created_by": "legacy data upload",
                  "modified_date": "2014-01-13",
                  "modified_by": "sspencer"
                },
                {
                  "id": 1028,
                  "rt_no": 2,
                  "extraction_id": 1291,
                  "template_volume": 1.34,
                  "reaction_volume": 2.9,
                  "rt_cq": 1.6,
                  "rt_date": "2017-08-10",
                  "created_date": "2012-11-25",
                  "created_by": "legacy data upload",
                  "modified_date": "2015-12-05",
                  "modified_by": "afirnstahl"
                }
              ],
              "targets": [
                {
                  "id": 8,
                  "name": "HAV",
                  "code": "H",
                  "type": "RNA",
                  "replicates": 2
                }
              ]
            },
            {
              "id": 1091,
              "extraction_no": 2,
              "extraction_volume": 1.47,
              "elution_volume": 2.89,
              "extraction_method": 1,
              "extraction_date": "2012-10-18",
              "inhibitions": [
                {
                  "id": 1034,
                  "inhibition_no": 1,
                  "dilution_factor": 15,
                  "type": "DNA",
                  "inhibition_date": "2014-10-17",
                  "created_date": "2015-10-21",
                  "created_by": "afirnstahl",
                  "modified_date": "2013-09-14",
                  "modified_by": "sspencer"
                },
                {
                  "id": 1096,
                  "inhibition_no": 2,
                  "dilution_factor": 28,
                  "type": "RNA",
                  "inhibition_date": "2013-05-04",
                  "created_date": "2015-09-27",
                  "created_by": "jpstokdyk",
                  "modified_date": "2012-08-16",
                  "modified_by": "afirnstahl"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1019,
                  "rt_no": 1,
                  "extraction_id": 1870,
                  "template_volume": 0.02,
                  "reaction_volume": 0.03,
                  "rt_cq": 2.55,
                  "rt_date": "2016-10-07",
                  "created_date": "2012-10-22",
                  "created_by": "jpstokdyk",
                  "modified_date": "2014-05-22",
                  "modified_by": "sspencer"
                },
                {
                  "id": 1064,
                  "rt_no": 2,
                  "extraction_id": 1633,
                  "template_volume": 1.37,
                  "reaction_volume": 2.43,
                  "rt_cq": 0.82,
                  "rt_date": "2017-01-11",
                  "created_date": "2015-04-03",
                  "created_by": "jpstokdyk",
                  "modified_date": "2012-12-30",
                  "modified_by": "jpstokdyk"
                }
              ],
              "targets": [
                {
                  "id": 9,
                  "name": "Human rotavirus",
                  "code": "R",
                  "type": "RNA",
                  "replicates": 7
                },
                {
                  "id": 8,
                  "name": "HAV",
                  "code": "H",
                  "type": "RNA",
                  "replicates": 3
                }
              ]
            }
          ],
          "created_date": "2014-05-19",
          "created_by": "sspencer",
          "modified_date": "2017-03-01",
          "modified_by": "jpstokdyk"
        }
      case 1005:
        return {
          "id": 1005,
          "analysis_batch_description": "Anim est et duis adipisicing excepteur non enim adipisicing aliquip pariatur non pariatur.",
          "analysis_batch_notes": "Consectetur deserunt nostrud ut deserunt velit.",
          "samples": [
            {
              "id": 1360,
              "sample_type": 3,
              "sample_description": "Dolor voluptate cupidatat esse duis fugiat mollit excepteur exercitation duis eu exercitation deserunt voluptate."
            },
            {
              "id": 1228,
              "sample_type": 4,
              "sample_description": "Sint deserunt ea adipisicing enim fugiat Lorem et excepteur ex amet qui."
            },
            {
              "id": 1422,
              "sample_type": 2,
              "sample_description": "Nulla deserunt ad et elit."
            },
            {
              "id": 1335,
              "sample_type": 4,
              "sample_description": "Dolor aute incididunt culpa duis sit laborum proident anim pariatur ipsum ullamco."
            }
          ],
          "studies": [
            {
              "id": 4,
              "name": "Kewuanee County Study",
              "description": "Adipisicing eiusmod magna elit aliquip sunt incididunt pariatur deserunt elit occaecat commodo."
            },
            {
              "id": 7,
              "name": "Kewuanee County Study",
              "description": "Officia eiusmod culpa ullamco consequat enim in."
            }
          ],
          "extractions": [
            {
              "id": 1054,
              "extraction_no": 1,
              "extraction_volume": 1.2,
              "elution_volume": 2.56,
              "extraction_method": 1,
              "extraction_date": "2017-03-23",
              "inhibitions": [
                {
                  "id": 1063,
                  "inhibition_no": 1,
                  "dilution_factor": 9,
                  "type": "RNA",
                  "inhibition_date": "2014-03-02",
                  "created_date": "2012-09-13",
                  "created_by": "afirnstahl",
                  "modified_date": "2017-05-10",
                  "modified_by": "sspencer"
                },
                {
                  "id": 1012,
                  "inhibition_no": 2,
                  "dilution_factor": 22,
                  "type": "DNA",
                  "inhibition_date": "2016-05-15",
                  "created_date": "2012-12-02",
                  "created_by": "afirnstahl",
                  "modified_date": "2017-08-11",
                  "modified_by": "afirnstahl"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1063,
                  "rt_no": 1,
                  "extraction_id": 1990,
                  "template_volume": 0.85,
                  "reaction_volume": 2.39,
                  "rt_cq": 2.96,
                  "rt_date": "2012-03-14",
                  "created_date": "2016-08-18",
                  "created_by": "legacy data upload",
                  "modified_date": "2013-06-05",
                  "modified_by": "afirnstahl"
                },
                {
                  "id": 1054,
                  "rt_no": 2,
                  "extraction_id": 1511,
                  "template_volume": 1.32,
                  "reaction_volume": 1.49,
                  "rt_cq": 1.99,
                  "rt_date": "2013-04-04",
                  "created_date": "2015-01-09",
                  "created_by": "afirnstahl",
                  "modified_date": "2015-04-19",
                  "modified_by": "sspencer"
                }
              ],
              "targets": [
                {
                  "id": 8,
                  "name": "HAV",
                  "code": "H",
                  "type": "RNA",
                  "replicates": 5
                },
                {
                  "id": 3,
                  "name": "G1 Norovirus",
                  "code": "G1",
                  "type": "DNA",
                  "replicates": 5
                }
              ]
            },
            {
              "id": 1044,
              "extraction_no": 2,
              "extraction_volume": 0.3,
              "elution_volume": 2.44,
              "extraction_method": 1,
              "extraction_date": "2012-09-02",
              "inhibitions": [
                {
                  "id": 1090,
                  "inhibition_no": 1,
                  "dilution_factor": 47,
                  "type": "DNA",
                  "inhibition_date": "2017-03-23",
                  "created_date": "2013-04-08",
                  "created_by": "afirnstahl",
                  "modified_date": "2014-02-09",
                  "modified_by": "afirnstahl"
                },
                {
                  "id": 1048,
                  "inhibition_no": 2,
                  "dilution_factor": 13,
                  "type": "DNA",
                  "inhibition_date": "2017-05-20",
                  "created_date": "2015-01-28",
                  "created_by": "sspencer",
                  "modified_date": "2016-08-07",
                  "modified_by": "afirnstahl"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1051,
                  "rt_no": 1,
                  "extraction_id": 1776,
                  "template_volume": 0.68,
                  "reaction_volume": 1.28,
                  "rt_cq": 1.9,
                  "rt_date": "2017-01-09",
                  "created_date": "2017-01-08",
                  "created_by": "jpstokdyk",
                  "modified_date": "2012-04-17",
                  "modified_by": "afirnstahl"
                },
                {
                  "id": 1001,
                  "rt_no": 2,
                  "extraction_id": 1824,
                  "template_volume": 1.01,
                  "reaction_volume": 0.14,
                  "rt_cq": 2.6,
                  "rt_date": "2015-06-20",
                  "created_date": "2017-09-05",
                  "created_by": "jpstokdyk",
                  "modified_date": "2013-09-20",
                  "modified_by": "afirnstahl"
                }
              ],
              "targets": [
                {
                  "id": 2,
                  "name": "Enterovirus",
                  "code": "E",
                  "type": "RNA",
                  "replicates": 8
                },
                {
                  "id": 8,
                  "name": "HAV",
                  "code": "H",
                  "type": "RNA",
                  "replicates": 4
                }
              ]
            }
          ],
          "created_date": "2016-12-10",
          "created_by": "legacy data upload",
          "modified_date": "2015-03-29",
          "modified_by": "afirnstahl"
        }
      case 1006:
        return {
          "id": 1006,
          "analysis_batch_description": "Et laboris aliquip reprehenderit cupidatat fugiat ea.",
          "analysis_batch_notes": "Commodo ut pariatur tempor reprehenderit proident incididunt excepteur dolore culpa ullamco mollit.",
          "samples": [
            {
              "id": 1393,
              "sample_type": 1,
              "sample_description": "Aliquip nisi id id duis sint officia sint non officia."
            },
            {
              "id": 1436,
              "sample_type": 2,
              "sample_description": "Aliquip nulla ad culpa aliqua irure veniam ex esse exercitation deserunt culpa ex officia."
            },
            {
              "id": 1007,
              "sample_type": 4,
              "sample_description": "Aliqua deserunt velit sunt exercitation et nisi ut anim Lorem."
            },
            {
              "id": 1424,
              "sample_type": 2,
              "sample_description": "Adipisicing exercitation quis quis dolore eu."
            }
          ],
          "studies": [
            {
              "id": 3,
              "name": "Iowa DNR Beach Study 2016",
              "description": "Aute minim cupidatat Lorem laboris sit id proident nostrud non tempor eu."
            },
            {
              "id": 8,
              "name": "Kewuanee County Study",
              "description": "Cupidatat incididunt dolor velit laboris nulla."
            }
          ],
          "extractions": [
            {
              "id": 1014,
              "extraction_no": 1,
              "extraction_volume": 0.53,
              "elution_volume": 0.23,
              "extraction_method": 1,
              "extraction_date": "2016-04-03",
              "inhibitions": [
                {
                  "id": 1083,
                  "inhibition_no": 1,
                  "dilution_factor": 8,
                  "type": "RNA",
                  "inhibition_date": "2013-03-23",
                  "created_date": "2014-06-17",
                  "created_by": "sspencer",
                  "modified_date": "2012-04-10",
                  "modified_by": "jpstokdyk"
                },
                {
                  "id": 1077,
                  "inhibition_no": 2,
                  "dilution_factor": 11,
                  "type": "DNA",
                  "inhibition_date": "2015-10-05",
                  "created_date": "2013-08-19",
                  "created_by": "jpstokdyk",
                  "modified_date": "2016-12-29",
                  "modified_by": "afirnstahl"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1051,
                  "rt_no": 1,
                  "extraction_id": 1259,
                  "template_volume": 0.31,
                  "reaction_volume": 2.1,
                  "rt_cq": 0.29,
                  "rt_date": "2016-09-25",
                  "created_date": "2016-07-13",
                  "created_by": "legacy data upload",
                  "modified_date": "2014-10-18",
                  "modified_by": "sspencer"
                },
                {
                  "id": 1031,
                  "rt_no": 2,
                  "extraction_id": 1957,
                  "template_volume": 0.44,
                  "reaction_volume": 2.31,
                  "rt_cq": 2.3,
                  "rt_date": "2014-12-11",
                  "created_date": "2015-07-29",
                  "created_by": "sspencer",
                  "modified_date": "2012-02-22",
                  "modified_by": "jpstokdyk"
                }
              ],
              "targets": [
                {
                  "id": 3,
                  "name": "G1 Norovirus",
                  "code": "G1",
                  "type": "DNA",
                  "replicates": 6
                },
                {
                  "id": 18,
                  "name": "HAV",
                  "code": "H",
                  "type": "RNA",
                  "replicates": 5
                }
              ]
            },
            {
              "id": 1066,
              "extraction_no": 2,
              "extraction_volume": 0.46,
              "elution_volume": 1.36,
              "extraction_method": 1,
              "extraction_date": "2017-06-26",
              "inhibitions": [
                {
                  "id": 1028,
                  "inhibition_no": 1,
                  "dilution_factor": 32,
                  "type": "DNA",
                  "inhibition_date": "2013-07-21",
                  "created_date": "2014-07-05",
                  "created_by": "afirnstahl",
                  "modified_date": "2016-08-21",
                  "modified_by": "sspencer"
                },
                {
                  "id": 1085,
                  "inhibition_no": 2,
                  "dilution_factor": 8,
                  "type": "RNA",
                  "inhibition_date": "2017-05-24",
                  "created_date": "2013-07-10",
                  "created_by": "jpstokdyk",
                  "modified_date": "2013-08-11",
                  "modified_by": "sspencer"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1048,
                  "rt_no": 1,
                  "extraction_id": 1808,
                  "template_volume": 0.58,
                  "reaction_volume": 1.31,
                  "rt_cq": 2.46,
                  "rt_date": "2013-01-11",
                  "created_date": "2014-05-04",
                  "created_by": "jpstokdyk",
                  "modified_date": "2013-07-17",
                  "modified_by": "afirnstahl"
                },
                {
                  "id": 1064,
                  "rt_no": 2,
                  "extraction_id": 1627,
                  "template_volume": 0.1,
                  "reaction_volume": 1.37,
                  "rt_cq": 0.45,
                  "rt_date": "2013-11-05",
                  "created_date": "2015-11-23",
                  "created_by": "jpstokdyk",
                  "modified_date": "2016-03-18",
                  "modified_by": "jpstokdyk"
                }
              ],
              "targets": [
                {
                  "id": 3,
                  "name": "G1 Norovirus",
                  "code": "G1",
                  "type": "DNA",
                  "replicates": 7
                },
                {
                  "id": 2,
                  "name": "Enterovirus",
                  "code": "E",
                  "type": "RNA",
                  "replicates": 6
                }
              ]
            }
          ],
          "created_date": "2016-09-29",
          "created_by": "jpstokdyk",
          "modified_date": "2015-08-29",
          "modified_by": "jpstokdyk"
        }
      case 1007:
        return {
          "id": 1007,
          "analysis_batch_description": "Non qui consectetur Lorem dolore officia anim velit sunt fugiat est ad.",
          "analysis_batch_notes": "Sint eu aliqua aute Lorem mollit proident in officia amet et.",
          "samples": [
            {
              "id": 1386,
              "sample_type": 1,
              "sample_description": "Esse veniam aliqua culpa excepteur duis et reprehenderit in Lorem qui reprehenderit consectetur ea."
            },
            {
              "id": 1356,
              "sample_type": 1,
              "sample_description": "Enim est non dolore labore nulla aliquip et ad est nulla dolore."
            },
            {
              "id": 1262,
              "sample_type": 3,
              "sample_description": "Ut minim consequat ad cupidatat sit pariatur reprehenderit magna culpa veniam tempor."
            },
            {
              "id": 1098,
              "sample_type": 5,
              "sample_description": "Fugiat nostrud proident officia in enim esse occaecat ullamco id."
            }
          ],
          "studies": [
            {
              "id": 5,
              "name": "MDH Storm Water Irrigation",
              "description": "Et aliquip consequat quis ut fugiat nostrud fugiat minim nisi."
            },
            {
              "id": 3,
              "name": "Iowa DNR Beach Study 2016",
              "description": "Ea anim in nostrud ipsum eiusmod minim esse fugiat voluptate proident exercitation reprehenderit."
            }
          ],
          "extractions": [
            {
              "id": 1086,
              "extraction_no": 1,
              "extraction_volume": 1.05,
              "elution_volume": 0,
              "extraction_method": 2,
              "extraction_date": "2012-05-28",
              "inhibitions": [
                {
                  "id": 1071,
                  "inhibition_no": 1,
                  "dilution_factor": 19,
                  "type": "RNA",
                  "inhibition_date": "2012-12-15",
                  "created_date": "2015-04-30",
                  "created_by": "afirnstahl",
                  "modified_date": "2014-04-09",
                  "modified_by": "sspencer"
                },
                {
                  "id": 1013,
                  "inhibition_no": 2,
                  "dilution_factor": 30,
                  "type": "RNA",
                  "inhibition_date": "2014-02-04",
                  "created_date": "2012-01-16",
                  "created_by": "legacy data upload",
                  "modified_date": "2015-10-14",
                  "modified_by": "jpstokdyk"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1090,
                  "rt_no": 1,
                  "extraction_id": 1335,
                  "template_volume": 0.13,
                  "reaction_volume": 2.53,
                  "rt_cq": 0.06,
                  "rt_date": "2015-11-27",
                  "created_date": "2012-07-13",
                  "created_by": "sspencer",
                  "modified_date": "2012-03-04",
                  "modified_by": "jpstokdyk"
                },
                {
                  "id": 1006,
                  "rt_no": 2,
                  "extraction_id": 1370,
                  "template_volume": 0.46,
                  "reaction_volume": 1.51,
                  "rt_cq": 2.51,
                  "rt_date": "2014-02-17",
                  "created_date": "2013-09-08",
                  "created_by": "sspencer",
                  "modified_date": "2012-01-03",
                  "modified_by": "sspencer"
                }
              ],
              "targets": [
                {
                  "id": 2,
                  "name": "Enterovirus",
                  "code": "E",
                  "type": "RNA",
                  "replicates": 4
                },
                {
                  "id": 3,
                  "name": "G1 Norovirus",
                  "code": "G1",
                  "type": "DNA",
                  "replicates": 3
                }
              ]
            },
            {
              "id": 1011,
              "extraction_no": 2,
              "extraction_volume": 0.75,
              "elution_volume": 0.89,
              "extraction_method": 2,
              "extraction_date": "2012-09-27",
              "inhibitions": [
                {
                  "id": 1035,
                  "inhibition_no": 1,
                  "dilution_factor": 16,
                  "type": "DNA",
                  "inhibition_date": "2013-12-07",
                  "created_date": "2013-01-16",
                  "created_by": "afirnstahl",
                  "modified_date": "2017-02-24",
                  "modified_by": "jpstokdyk"
                },
                {
                  "id": 1039,
                  "inhibition_no": 2,
                  "dilution_factor": 45,
                  "type": "RNA",
                  "inhibition_date": "2012-02-13",
                  "created_date": "2014-04-12",
                  "created_by": "legacy data upload",
                  "modified_date": "2013-07-20",
                  "modified_by": "sspencer"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1029,
                  "rt_no": 1,
                  "extraction_id": 1075,
                  "template_volume": 1.21,
                  "reaction_volume": 0.46,
                  "rt_cq": 1.81,
                  "rt_date": "2015-10-08",
                  "created_date": "2014-04-05",
                  "created_by": "sspencer",
                  "modified_date": "2012-04-20",
                  "modified_by": "jpstokdyk"
                },
                {
                  "id": 1053,
                  "rt_no": 2,
                  "extraction_id": 1176,
                  "template_volume": 0.23,
                  "reaction_volume": 0.69,
                  "rt_cq": 1.36,
                  "rt_date": "2015-04-01",
                  "created_date": "2014-10-22",
                  "created_by": "legacy data upload",
                  "modified_date": "2015-10-11",
                  "modified_by": "sspencer"
                }
              ],
              "targets": [
                {
                  "id": 8,
                  "name": "HAV",
                  "code": "H",
                  "type": "RNA",
                  "replicates": 8
                },
                {
                  "id": 3,
                  "name": "G1 Norovirus",
                  "code": "G1",
                  "type": "DNA",
                  "replicates": 8
                }
              ]
            }
          ],
          "created_date": "2013-05-03",
          "created_by": "afirnstahl",
          "modified_date": "2013-08-09",
          "modified_by": "sspencer"
        }
      case 1008:
        return {
          "id": 1008,
          "analysis_batch_description": "Reprehenderit occaecat ea pariatur pariatur adipisicing pariatur eiusmod velit velit officia est qui.",
          "analysis_batch_notes": "Velit sunt irure ipsum ipsum tempor labore laborum sunt ex reprehenderit aliquip ut fugiat veniam.",
          "samples": [
            {
              "id": 1425,
              "sample_type": 1,
              "sample_description": "Dolore id commodo anim mollit commodo ut commodo qui pariatur quis sit."
            },
            {
              "id": 1335,
              "sample_type": 3,
              "sample_description": "Elit quis commodo laboris ad esse deserunt."
            },
            {
              "id": 1336,
              "sample_type": 2,
              "sample_description": "Est esse in quis mollit ut minim minim nulla ipsum sit ullamco eu."
            },
            {
              "id": 1136,
              "sample_type": 2,
              "sample_description": "Nulla veniam elit et est magna laboris non nulla elit dolore."
            }
          ],
          "studies": [
            {
              "id": 13,
              "name": "MDH Storm Water Irrigation",
              "description": "Quis magna nulla minim cupidatat reprehenderit nulla do consequat quis dolore deserunt mollit veniam sunt."
            },
            {
              "id": 10,
              "name": "MDH Storm Water Irrigation",
              "description": "Anim tempor nisi laboris sint non irure cupidatat."
            }
          ],
          "extractions": [
            {
              "id": 1056,
              "extraction_no": 1,
              "extraction_volume": 0.66,
              "elution_volume": 2.88,
              "extraction_method": 2,
              "extraction_date": "2017-02-21",
              "inhibitions": [
                {
                  "id": 1028,
                  "inhibition_no": 1,
                  "dilution_factor": 22,
                  "type": "DNA",
                  "inhibition_date": "2014-11-29",
                  "created_date": "2016-06-17",
                  "created_by": "sspencer",
                  "modified_date": "2016-10-05",
                  "modified_by": "jpstokdyk"
                },
                {
                  "id": 1032,
                  "inhibition_no": 2,
                  "dilution_factor": 6,
                  "type": "RNA",
                  "inhibition_date": "2016-12-08",
                  "created_date": "2012-09-30",
                  "created_by": "jpstokdyk",
                  "modified_date": "2016-06-21",
                  "modified_by": "afirnstahl"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1047,
                  "rt_no": 1,
                  "extraction_id": 1110,
                  "template_volume": 0.9,
                  "reaction_volume": 1.79,
                  "rt_cq": 1.26,
                  "rt_date": "2013-11-07",
                  "created_date": "2015-12-15",
                  "created_by": "jpstokdyk",
                  "modified_date": "2014-07-23",
                  "modified_by": "sspencer"
                },
                {
                  "id": 1003,
                  "rt_no": 2,
                  "extraction_id": 1499,
                  "template_volume": 0.8,
                  "reaction_volume": 2.2,
                  "rt_cq": 2.44,
                  "rt_date": "2017-07-25",
                  "created_date": "2015-11-10",
                  "created_by": "sspencer",
                  "modified_date": "2016-10-19",
                  "modified_by": "jpstokdyk"
                }
              ],
              "targets": [
                {
                  "id": 3,
                  "name": "G1 Norovirus",
                  "code": "G1",
                  "type": "DNA",
                  "replicates": 4
                },
                {
                  "id": 8,
                  "name": "HAV",
                  "code": "H",
                  "type": "RNA",
                  "replicates": 6
                }
              ]
            },
            {
              "id": 1020,
              "extraction_no": 2,
              "extraction_volume": 0.08,
              "elution_volume": 1.64,
              "extraction_method": 2,
              "extraction_date": "2016-10-24",
              "inhibitions": [
                {
                  "id": 1091,
                  "inhibition_no": 1,
                  "dilution_factor": 39,
                  "type": "RNA",
                  "inhibition_date": "2013-10-05",
                  "created_date": "2017-06-23",
                  "created_by": "jpstokdyk",
                  "modified_date": "2015-05-09",
                  "modified_by": "afirnstahl"
                },
                {
                  "id": 1013,
                  "inhibition_no": 2,
                  "dilution_factor": 9,
                  "type": "RNA",
                  "inhibition_date": "2013-08-01",
                  "created_date": "2012-01-04",
                  "created_by": "afirnstahl",
                  "modified_date": "2016-10-05",
                  "modified_by": "sspencer"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1001,
                  "rt_no": 1,
                  "extraction_id": 1989,
                  "template_volume": 0.75,
                  "reaction_volume": 2.68,
                  "rt_cq": 1.29,
                  "rt_date": "2015-11-24",
                  "created_date": "2016-02-08",
                  "created_by": "sspencer",
                  "modified_date": "2013-01-03",
                  "modified_by": "jpstokdyk"
                },
                {
                  "id": 1001,
                  "rt_no": 2,
                  "extraction_id": 1141,
                  "template_volume": 1.36,
                  "reaction_volume": 2.87,
                  "rt_cq": 2.23,
                  "rt_date": "2013-08-07",
                  "created_date": "2015-11-03",
                  "created_by": "legacy data upload",
                  "modified_date": "2013-12-15",
                  "modified_by": "jpstokdyk"
                }
              ],
              "targets": [
                {
                  "id": 2,
                  "name": "Enterovirus",
                  "code": "E",
                  "type": "RNA",
                  "replicates": 7
                }
              ]
            }
          ],
          "created_date": "2012-08-30",
          "created_by": "sspencer",
          "modified_date": "2017-03-25",
          "modified_by": "sspencer"
        }
      case 1009:
        return {
          "id": 1009,
          "analysis_batch_description": "Elit velit magna occaecat et consequat qui laboris ipsum reprehenderit labore.",
          "analysis_batch_notes": "Qui consequat culpa ad proident elit quis consectetur.",
          "samples": [
            {
              "id": 1425,
              "sample_type": 4,
              "sample_description": "Cupidatat amet esse irure in pariatur in exercitation occaecat exercitation est tempor velit."
            },
            {
              "id": 1389,
              "sample_type": 4,
              "sample_description": "Exercitation deserunt do officia enim veniam dolore elit Lorem ullamco."
            },
            {
              "id": 1307,
              "sample_type": 3,
              "sample_description": "Non voluptate ullamco eiusmod velit cillum pariatur voluptate."
            },
            {
              "id": 1176,
              "sample_type": 2,
              "sample_description": "Non nisi reprehenderit nostrud reprehenderit amet eiusmod laboris amet quis."
            }
          ],
          "studies": [
            {
              "id": 5,
              "name": "Iowa DNR Beach Study 2016",
              "description": "Eiusmod duis reprehenderit cupidatat cupidatat."
            },
            {
              "id": 5,
              "name": "Iowa DNR Beach Study 2016",
              "description": "Laborum occaecat magna labore in excepteur esse dolor velit eiusmod."
            }
          ],
          "extractions": [
            {
              "id": 1052,
              "extraction_no": 1,
              "extraction_volume": 1.45,
              "elution_volume": 2.05,
              "extraction_method": 2,
              "extraction_date": "2014-11-01",
              "inhibitions": [
                {
                  "id": 1072,
                  "inhibition_no": 1,
                  "dilution_factor": 49,
                  "type": "DNA",
                  "inhibition_date": "2013-08-30",
                  "created_date": "2013-07-26",
                  "created_by": "jpstokdyk",
                  "modified_date": "2015-08-13",
                  "modified_by": "sspencer"
                },
                {
                  "id": 1032,
                  "inhibition_no": 2,
                  "dilution_factor": 27,
                  "type": "DNA",
                  "inhibition_date": "2015-10-19",
                  "created_date": "2012-07-23",
                  "created_by": "afirnstahl",
                  "modified_date": "2016-04-25",
                  "modified_by": "afirnstahl"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1078,
                  "rt_no": 1,
                  "extraction_id": 1927,
                  "template_volume": 1.29,
                  "reaction_volume": 1.36,
                  "rt_cq": 1.06,
                  "rt_date": "2016-11-08",
                  "created_date": "2015-09-16",
                  "created_by": "afirnstahl",
                  "modified_date": "2014-05-14",
                  "modified_by": "jpstokdyk"
                },
                {
                  "id": 1035,
                  "rt_no": 2,
                  "extraction_id": 1678,
                  "template_volume": 0.57,
                  "reaction_volume": 2.51,
                  "rt_cq": 2.28,
                  "rt_date": "2015-12-15",
                  "created_date": "2016-11-14",
                  "created_by": "afirnstahl",
                  "modified_date": "2014-01-10",
                  "modified_by": "sspencer"
                }
              ],
              "targets": [
                {
                  "id": 3,
                  "name": "G1 Norovirus",
                  "code": "G1",
                  "type": "DNA",
                  "replicates": 8
                },
                {
                  "id": 9,
                  "name": "Human rotavirus",
                  "code": "R",
                  "type": "RNA",
                  "replicates": 8
                }
              ]
            },
            {
              "id": 1011,
              "extraction_no": 2,
              "extraction_volume": 0.62,
              "elution_volume": 0.2,
              "extraction_method": 1,
              "extraction_date": "2014-12-01",
              "inhibitions": [
                {
                  "id": 1044,
                  "inhibition_no": 1,
                  "dilution_factor": 21,
                  "type": "DNA",
                  "inhibition_date": "2014-09-13",
                  "created_date": "2017-07-01",
                  "created_by": "legacy data upload",
                  "modified_date": "2015-04-13",
                  "modified_by": "afirnstahl"
                },
                {
                  "id": 1095,
                  "inhibition_no": 2,
                  "dilution_factor": 48,
                  "type": "DNA",
                  "inhibition_date": "2013-11-04",
                  "created_date": "2012-04-05",
                  "created_by": "legacy data upload",
                  "modified_date": "2016-08-07",
                  "modified_by": "jpstokdyk"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1010,
                  "rt_no": 1,
                  "extraction_id": 1886,
                  "template_volume": 0.68,
                  "reaction_volume": 0.39,
                  "rt_cq": 1.1,
                  "rt_date": "2017-07-04",
                  "created_date": "2014-04-19",
                  "created_by": "sspencer",
                  "modified_date": "2016-10-08",
                  "modified_by": "jpstokdyk"
                },
                {
                  "id": 1054,
                  "rt_no": 2,
                  "extraction_id": 1515,
                  "template_volume": 0.79,
                  "reaction_volume": 2.76,
                  "rt_cq": 2.18,
                  "rt_date": "2012-08-26",
                  "created_date": "2017-07-01",
                  "created_by": "jpstokdyk",
                  "modified_date": "2015-12-26",
                  "modified_by": "sspencer"
                }
              ],
              "targets": [
                {
                  "id": 9,
                  "name": "Human rotavirus",
                  "code": "R",
                  "type": "RNA",
                  "replicates": 3
                }
              ]
            }
          ],
          "created_date": "2013-07-08",
          "created_by": "afirnstahl",
          "modified_date": "2016-03-06",
          "modified_by": "jpstokdyk"
        }
      default:
        break;
    }

  }
  //**********************************************Temporary**************************************************** */


  //getAnalysisBatches function  - makes request to lide web services
  getAnalysisBatchSummaries(): Observable<IAnalysisBatchSummary[]> {

    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.get(APP_SETTINGS.ANALYSIS_BATCH_SUMMARY_URL, options)
      .map((response: Response) => <IAnalysisBatch[]>response.json())
      // .do(data => console.log('Analysis Batch data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  public create(formValue: IAnalysisBatch): Observable<IAnalysisBatch[]> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.ANALYSIS_BATCH_URL, formValue, options)
      .map(this.extractData)
      .catch(this.handleError)

  }

  public update(formValue: IAnalysisBatch): Observable<IAnalysisBatch> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.put(APP_SETTINGS.ANALYSIS_BATCH_URL + formValue.id + '/', formValue, options)
      .map(this.extractData)
      .catch(this.handleError);

  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
