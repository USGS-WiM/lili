import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SETTINGS } from '../app.settings'

import { IAnalysisBatch } from './analysis-batch'



@Injectable()
export class AnalysisBatchService {

  constructor(private _http: Http) { }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  //**********************************************Temporary**************************************************** */
  //temporary function to return AB details, in place until AB endpoint is functional
  public getAnalysisBatchData(abID): IAnalysisBatch {
    switch (abID) {
      case 1000:
        return {
          "id": 1000,
          "analysis_batch_description": "Sunt tempor nulla enim fugiat exercitation nostrud esse Lorem.",
          "analysis_batch_notes": "Enim nostrud aliqua et et ut.",
          "studies": [
            10,
            0
          ],
          "extractions": [
            {
              "id": 1022,
              "extraction_no": 1,
              "extraction_volume": 0.93,
              "elution_volume": 2.84,
              "extraction_method": 1,
              "reverse_transcriptions": [
                {
                  "id": 1085,
                  "extraction_id": 1195,
                  "vol_in": 0.87,
                  "vol_out": 0.79,
                  "rt_cq": 1.17
                },
                {
                  "id": 1071,
                  "extraction_id": 1860,
                  "vol_in": 1.44,
                  "vol_out": 0.38,
                  "rt_cq": 2.42
                }
              ],
              "inhibitions": [
                {
                  "id": 1042,
                  "dilution": 17,
                  "type": "DNA"
                },
                {
                  "id": 1008,
                  "dilution": 19,
                  "type": "DNA"
                }
              ],
              "targets": [
                {
                  "id": 1901,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "SS",
                  "type": "RNA"
                },
                {
                  "id": 1065,
                  "name": "Bovine Flu",
                  "abbreviation": "F",
                  "type": "RNA"
                }
              ]
            },
            {
              "id": 1067,
              "extraction_no": 2,
              "extraction_volume": 1,
              "elution_volume": 1.36,
              "extraction_method": 1,
              "reverse_transcriptions": [
                {
                  "id": 1022,
                  "extraction_id": 1284,
                  "vol_in": 1.07,
                  "vol_out": 0.3,
                  "rt_cq": 0.95
                },
                {
                  "id": 1040,
                  "extraction_id": 1776,
                  "vol_in": 0.8,
                  "vol_out": 1.31,
                  "rt_cq": 1.1
                }
              ],
              "inhibitions": [
                {
                  "id": 1061,
                  "dilution": 46,
                  "type": "DNA"
                },
                {
                  "id": 1077,
                  "dilution": 42,
                  "type": "RNA"
                }
              ],
              "targets": [
                {
                  "id": 1349,
                  "name": "Bovine Flu",
                  "abbreviation": "E",
                  "type": "RNA"
                },
                {
                  "id": 1875,
                  "name": "Salmonella",
                  "abbreviation": "GB",
                  "type": "DNA"
                }
              ]
            }
          ],
          "insert_date": "2015-09-17",
          "insert_user": "jpstokdyk",
          "update_date": "2014-09-29",
          "update_user": "sspencer"
        }
      case 1001:
        return {
          "id": 1001,
          "analysis_batch_description": "Fugiat eu cupidatat amet deserunt eu magna incididunt eu aute laborum veniam aliqua.",
          "analysis_batch_notes": "Anim elit dolor eiusmod voluptate nisi elit enim ex dolor.",
          "studies": [
            2,
            0
          ],
          "extractions": [
            {
              "id": 1030,
              "extraction_no": 1,
              "extraction_volume": 1.35,
              "elution_volume": 1.72,
              "extraction_method": 2,
              "reverse_transcriptions": [
                {
                  "id": 1095,
                  "extraction_id": 1911,
                  "vol_in": 0,
                  "vol_out": 2.54,
                  "rt_cq": 1.31
                },
                {
                  "id": 1065,
                  "extraction_id": 1559,
                  "vol_in": 0.15,
                  "vol_out": 0.98,
                  "rt_cq": 1.59
                }
              ],
              "inhibitions": [
                {
                  "id": 1097,
                  "dilution": 23,
                  "type": "RNA"
                },
                {
                  "id": 1029,
                  "dilution": 11,
                  "type": "DNA"
                }
              ],
              "targets": [
                {
                  "id": 1554,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "GB",
                  "type": "DNA"
                },
                {
                  "id": 1286,
                  "name": "Bovine Flu",
                  "abbreviation": "E",
                  "type": "RNA"
                }
              ]
            },
            {
              "id": 1095,
              "extraction_no": 2,
              "extraction_volume": 1.33,
              "elution_volume": 2.92,
              "extraction_method": 2,
              "reverse_transcriptions": [
                {
                  "id": 1024,
                  "extraction_id": 1444,
                  "vol_in": 0.58,
                  "vol_out": 0.25,
                  "rt_cq": 2.59
                },
                {
                  "id": 1084,
                  "extraction_id": 1537,
                  "vol_in": 1.34,
                  "vol_out": 3,
                  "rt_cq": 2.78
                }
              ],
              "inhibitions": [
                {
                  "id": 1098,
                  "dilution": 18,
                  "type": "RNA"
                },
                {
                  "id": 1020,
                  "dilution": 17,
                  "type": "DNA"
                }
              ],
              "targets": [
                {
                  "id": 1220,
                  "name": "E.Coli",
                  "abbreviation": "F",
                  "type": "DNA"
                },
                {
                  "id": 1321,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "E",
                  "type": "DNA"
                }
              ]
            }
          ],
          "insert_date": "2017-08-22",
          "insert_user": "legacy data upload",
          "update_date": "2016-05-25",
          "update_user": "sspencer"
        }
      case 1002:
        return {
          "id": 1002,
          "analysis_batch_description": "Cillum minim elit excepteur consequat anim ipsum in ad non anim excepteur pariatur.",
          "analysis_batch_notes": "Do aute dolore laboris nostrud ex nulla ex.",
          "studies": [
            7,
            4
          ],
          "extractions": [
            {
              "id": 1062,
              "extraction_no": 1,
              "extraction_volume": 1.2,
              "elution_volume": 2.28,
              "extraction_method": 1,
              "reverse_transcriptions": [
                {
                  "id": 1100,
                  "extraction_id": 1873,
                  "vol_in": 0.32,
                  "vol_out": 2.64,
                  "rt_cq": 1.72
                },
                {
                  "id": 1001,
                  "extraction_id": 1989,
                  "vol_in": 0.4,
                  "vol_out": 2.5,
                  "rt_cq": 2.32
                }
              ],
              "inhibitions": [
                {
                  "id": 1037,
                  "dilution": 28,
                  "type": "RNA"
                },
                {
                  "id": 1089,
                  "dilution": 25,
                  "type": "RNA"
                }
              ],
              "targets": [
                {
                  "id": 1191,
                  "name": "E.Coli",
                  "abbreviation": "SS",
                  "type": "RNA"
                },
                {
                  "id": 1805,
                  "name": "Bovine Flu",
                  "abbreviation": "GB",
                  "type": "DNA"
                }
              ]
            },
            {
              "id": 1046,
              "extraction_no": 2,
              "extraction_volume": 1.05,
              "elution_volume": 1.37,
              "extraction_method": 1,
              "reverse_transcriptions": [
                {
                  "id": 1050,
                  "extraction_id": 1699,
                  "vol_in": 0.36,
                  "vol_out": 2.86,
                  "rt_cq": 3
                },
                {
                  "id": 1013,
                  "extraction_id": 1166,
                  "vol_in": 0.99,
                  "vol_out": 2.58,
                  "rt_cq": 1.14
                }
              ],
              "inhibitions": [
                {
                  "id": 1078,
                  "dilution": 16,
                  "type": "RNA"
                },
                {
                  "id": 1059,
                  "dilution": 46,
                  "type": "RNA"
                }
              ],
              "targets": [
                {
                  "id": 1634,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "GB",
                  "type": "DNA"
                },
                {
                  "id": 1477,
                  "name": "Salmonella",
                  "abbreviation": "GB",
                  "type": "RNA"
                }
              ]
            }
          ],
          "insert_date": "2013-09-28",
          "insert_user": "jpstokdyk",
          "update_date": "2012-06-21",
          "update_user": "sspencer"
        }
      case 1003:
        return {
          "id": 1003,
          "analysis_batch_description": "Exercitation enim exercitation adipisicing adipisicing non duis aliqua magna commodo magna.",
          "analysis_batch_notes": "Magna ut amet irure fugiat exercitation Lorem aliquip qui amet sit.",
          "studies": [
            9,
            4
          ],
          "extractions": [
            {
              "id": 1073,
              "extraction_no": 1,
              "extraction_volume": 1,
              "elution_volume": 2.07,
              "extraction_method": 1,
              "reverse_transcriptions": [
                {
                  "id": 1030,
                  "extraction_id": 1249,
                  "vol_in": 0.45,
                  "vol_out": 0.67,
                  "rt_cq": 2.31
                },
                {
                  "id": 1009,
                  "extraction_id": 1152,
                  "vol_in": 1.34,
                  "vol_out": 2.41,
                  "rt_cq": 1.74
                }
              ],
              "inhibitions": [
                {
                  "id": 1059,
                  "dilution": 17,
                  "type": "DNA"
                },
                {
                  "id": 1091,
                  "dilution": 23,
                  "type": "DNA"
                }
              ],
              "targets": [
                {
                  "id": 1004,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "E",
                  "type": "RNA"
                },
                {
                  "id": 1581,
                  "name": "E.Coli",
                  "abbreviation": "SS",
                  "type": "DNA"
                }
              ]
            },
            {
              "id": 1042,
              "extraction_no": 2,
              "extraction_volume": 0.33,
              "elution_volume": 2.35,
              "extraction_method": 2,
              "reverse_transcriptions": [
                {
                  "id": 1033,
                  "extraction_id": 1654,
                  "vol_in": 0.66,
                  "vol_out": 2.83,
                  "rt_cq": 1.95
                },
                {
                  "id": 1079,
                  "extraction_id": 1671,
                  "vol_in": 0.43,
                  "vol_out": 0.88,
                  "rt_cq": 1.71
                }
              ],
              "inhibitions": [
                {
                  "id": 1071,
                  "dilution": 45,
                  "type": "RNA"
                },
                {
                  "id": 1089,
                  "dilution": 6,
                  "type": "DNA"
                }
              ],
              "targets": [
                {
                  "id": 1208,
                  "name": "Salmonella",
                  "abbreviation": "F",
                  "type": "DNA"
                },
                {
                  "id": 1511,
                  "name": "E.Coli",
                  "abbreviation": "F",
                  "type": "DNA"
                }
              ]
            }
          ],
          "insert_date": "2015-05-22",
          "insert_user": "afirnstahl",
          "update_date": "2014-12-20",
          "update_user": "jpstokdyk"
        } 
      case 1004:
        return {
          "id": 1004,
          "analysis_batch_description": "Ipsum sit occaecat laborum qui deserunt amet mollit laborum laboris nostrud ea nostrud.",
          "analysis_batch_notes": "Ullamco reprehenderit ex commodo et fugiat elit velit minim ad.",
          "studies": [
            10,
            7
          ],
          "extractions": [
            {
              "id": 1025,
              "extraction_no": 1,
              "extraction_volume": 0.03,
              "elution_volume": 1.88,
              "extraction_method": 1,
              "reverse_transcriptions": [
                {
                  "id": 1047,
                  "extraction_id": 1798,
                  "vol_in": 0.49,
                  "vol_out": 1.69,
                  "rt_cq": 0.06
                },
                {
                  "id": 1034,
                  "extraction_id": 1365,
                  "vol_in": 1.43,
                  "vol_out": 0.44,
                  "rt_cq": 0.26
                }
              ],
              "inhibitions": [
                {
                  "id": 1044,
                  "dilution": 40,
                  "type": "DNA"
                },
                {
                  "id": 1062,
                  "dilution": 24,
                  "type": "RNA"
                }
              ],
              "targets": [
                {
                  "id": 1953,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "F",
                  "type": "DNA"
                },
                {
                  "id": 1713,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "GB",
                  "type": "DNA"
                }
              ]
            },
            {
              "id": 1021,
              "extraction_no": 2,
              "extraction_volume": 1.38,
              "elution_volume": 0.46,
              "extraction_method": 2,
              "reverse_transcriptions": [
                {
                  "id": 1038,
                  "extraction_id": 1894,
                  "vol_in": 0.16,
                  "vol_out": 2.51,
                  "rt_cq": 1.72
                },
                {
                  "id": 1095,
                  "extraction_id": 1248,
                  "vol_in": 0.91,
                  "vol_out": 1.34,
                  "rt_cq": 2.93
                }
              ],
              "inhibitions": [
                {
                  "id": 1064,
                  "dilution": 37,
                  "type": "RNA"
                },
                {
                  "id": 1073,
                  "dilution": 41,
                  "type": "DNA"
                }
              ],
              "targets": [
                {
                  "id": 1270,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "SS",
                  "type": "DNA"
                },
                {
                  "id": 1249,
                  "name": "Bovine Flu",
                  "abbreviation": "GB",
                  "type": "DNA"
                }
              ]
            }
          ],
          "insert_date": "2015-05-07",
          "insert_user": "jpstokdyk",
          "update_date": "2016-08-02",
          "update_user": "sspencer"
        }
      case 1005:
        return {
          "id": 1005,
          "analysis_batch_description": "Amet commodo occaecat nulla minim in ut irure ullamco.",
          "analysis_batch_notes": "Commodo incididunt voluptate ipsum reprehenderit amet laboris consequat ad pariatur consectetur sunt exercitation consequat.",
          "studies": [
            5,
            7
          ],
          "extractions": [
            {
              "id": 1034,
              "extraction_no": 1,
              "extraction_volume": 1.35,
              "elution_volume": 0.21,
              "extraction_method": 1,
              "reverse_transcriptions": [
                {
                  "id": 1089,
                  "extraction_id": 1871,
                  "vol_in": 0.7,
                  "vol_out": 1.88,
                  "rt_cq": 2.31
                },
                {
                  "id": 1020,
                  "extraction_id": 1558,
                  "vol_in": 0.72,
                  "vol_out": 0.02,
                  "rt_cq": 2.64
                }
              ],
              "inhibitions": [
                {
                  "id": 1024,
                  "dilution": 30,
                  "type": "RNA"
                },
                {
                  "id": 1021,
                  "dilution": 13,
                  "type": "DNA"
                }
              ],
              "targets": [
                {
                  "id": 1839,
                  "name": "Bovine Flu",
                  "abbreviation": "GB",
                  "type": "DNA"
                },
                {
                  "id": 1085,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "SS",
                  "type": "DNA"
                }
              ]
            },
            {
              "id": 1015,
              "extraction_no": 2,
              "extraction_volume": 0.95,
              "elution_volume": 2.66,
              "extraction_method": 2,
              "reverse_transcriptions": [
                {
                  "id": 1092,
                  "extraction_id": 1015,
                  "vol_in": 0.71,
                  "vol_out": 0.59,
                  "rt_cq": 2.76
                },
                {
                  "id": 1073,
                  "extraction_id": 1842,
                  "vol_in": 0.47,
                  "vol_out": 0.61,
                  "rt_cq": 2.07
                }
              ],
              "inhibitions": [
                {
                  "id": 1100,
                  "dilution": 42,
                  "type": "DNA"
                },
                {
                  "id": 1065,
                  "dilution": 38,
                  "type": "DNA"
                }
              ],
              "targets": [
                {
                  "id": 1698,
                  "name": "Bovine Flu",
                  "abbreviation": "SS",
                  "type": "DNA"
                },
                {
                  "id": 1792,
                  "name": "Bovine Flu",
                  "abbreviation": "E",
                  "type": "DNA"
                }
              ]
            }
          ],
          "insert_date": "2015-06-23",
          "insert_user": "legacy data upload",
          "update_date": "2017-04-27",
          "update_user": "sspencer"
        }
      case 1006:
        return {
          "id": 1006,
          "analysis_batch_description": "Commodo laboris incididunt magna et proident nisi cillum Lorem ea.",
          "analysis_batch_notes": "Eu culpa excepteur dolore consequat amet laborum culpa.",
          "studies": [
            2,
            1
          ],
          "extractions": [
            {
              "id": 1040,
              "extraction_no": 1,
              "extraction_volume": 0.72,
              "elution_volume": 1.37,
              "extraction_method": 2,
              "reverse_transcriptions": [
                {
                  "id": 1030,
                  "extraction_id": 1138,
                  "vol_in": 0.65,
                  "vol_out": 1.36,
                  "rt_cq": 2.32
                },
                {
                  "id": 1068,
                  "extraction_id": 1725,
                  "vol_in": 0.92,
                  "vol_out": 2.51,
                  "rt_cq": 3
                }
              ],
              "inhibitions": [
                {
                  "id": 1006,
                  "dilution": 23,
                  "type": "RNA"
                },
                {
                  "id": 1057,
                  "dilution": 28,
                  "type": "RNA"
                }
              ],
              "targets": [
                {
                  "id": 1037,
                  "name": "Salmonella",
                  "abbreviation": "F",
                  "type": "RNA"
                },
                {
                  "id": 1304,
                  "name": "E.Coli",
                  "abbreviation": "E",
                  "type": "DNA"
                }
              ]
            },
            {
              "id": 1047,
              "extraction_no": 2,
              "extraction_volume": 1.26,
              "elution_volume": 0.47,
              "extraction_method": 1,
              "reverse_transcriptions": [
                {
                  "id": 1083,
                  "extraction_id": 1764,
                  "vol_in": 0.89,
                  "vol_out": 2.67,
                  "rt_cq": 1.52
                },
                {
                  "id": 1072,
                  "extraction_id": 1660,
                  "vol_in": 0.61,
                  "vol_out": 2.11,
                  "rt_cq": 1.53
                }
              ],
              "inhibitions": [
                {
                  "id": 1012,
                  "dilution": 26,
                  "type": "DNA"
                },
                {
                  "id": 1012,
                  "dilution": 39,
                  "type": "RNA"
                }
              ],
              "targets": [
                {
                  "id": 1348,
                  "name": "Salmonella",
                  "abbreviation": "F",
                  "type": "RNA"
                },
                {
                  "id": 1320,
                  "name": "Salmonella",
                  "abbreviation": "F",
                  "type": "RNA"
                }
              ]
            }
          ],
          "insert_date": "2016-04-12",
          "insert_user": "sspencer",
          "update_date": "2014-04-15",
          "update_user": "afirnstahl"
        }
      case 1007:
        return {
          "id": 1007,
          "analysis_batch_description": "Id pariatur dolor ea proident.",
          "analysis_batch_notes": "Proident aute quis officia cupidatat dolor minim consectetur in adipisicing occaecat reprehenderit.",
          "studies": [
            6,
            13
          ],
          "extractions": [
            {
              "id": 1100,
              "extraction_no": 1,
              "extraction_volume": 0.62,
              "elution_volume": 1.59,
              "extraction_method": 2,
              "reverse_transcriptions": [
                {
                  "id": 1077,
                  "extraction_id": 1234,
                  "vol_in": 1.1,
                  "vol_out": 0.6,
                  "rt_cq": 2.48
                },
                {
                  "id": 1073,
                  "extraction_id": 1045,
                  "vol_in": 0.32,
                  "vol_out": 0.91,
                  "rt_cq": 1.32
                }
              ],
              "inhibitions": [
                {
                  "id": 1071,
                  "dilution": 16,
                  "type": "RNA"
                },
                {
                  "id": 1046,
                  "dilution": 12,
                  "type": "DNA"
                }
              ],
              "targets": [
                {
                  "id": 1152,
                  "name": "Bovine Flu",
                  "abbreviation": "SS",
                  "type": "DNA"
                },
                {
                  "id": 1072,
                  "name": "Bovine Flu",
                  "abbreviation": "SS",
                  "type": "DNA"
                }
              ]
            },
            {
              "id": 1057,
              "extraction_no": 2,
              "extraction_volume": 0.27,
              "elution_volume": 2.8,
              "extraction_method": 1,
              "reverse_transcriptions": [
                {
                  "id": 1054,
                  "extraction_id": 1148,
                  "vol_in": 1.47,
                  "vol_out": 2.63,
                  "rt_cq": 2.15
                },
                {
                  "id": 1006,
                  "extraction_id": 1176,
                  "vol_in": 0.89,
                  "vol_out": 1.12,
                  "rt_cq": 1.55
                }
              ],
              "inhibitions": [
                {
                  "id": 1073,
                  "dilution": 15,
                  "type": "DNA"
                },
                {
                  "id": 1097,
                  "dilution": 26,
                  "type": "RNA"
                }
              ],
              "targets": [
                {
                  "id": 1562,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "E",
                  "type": "RNA"
                },
                {
                  "id": 1686,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "F",
                  "type": "DNA"
                }
              ]
            }
          ],
          "insert_date": "2014-09-19",
          "insert_user": "afirnstahl",
          "update_date": "2016-04-01",
          "update_user": "afirnstahl"
        }
      case 1008:
        return {
          "id": 1008,
          "analysis_batch_description": "Labore pariatur fugiat irure dolore culpa et.",
          "analysis_batch_notes": "Lorem qui dolore aliquip do incididunt velit pariatur cillum magna.",
          "studies": [
            12,
            11
          ],
          "extractions": [
            {
              "id": 1051,
              "extraction_no": 1,
              "extraction_volume": 0.4,
              "elution_volume": 0.81,
              "extraction_method": 2,
              "reverse_transcriptions": [
                {
                  "id": 1010,
                  "extraction_id": 1867,
                  "vol_in": 0.56,
                  "vol_out": 2.93,
                  "rt_cq": 1.46
                },
                {
                  "id": 1019,
                  "extraction_id": 1578,
                  "vol_in": 0.8,
                  "vol_out": 0.92,
                  "rt_cq": 2.72
                }
              ],
              "inhibitions": [
                {
                  "id": 1040,
                  "dilution": 36,
                  "type": "RNA"
                },
                {
                  "id": 1051,
                  "dilution": 36,
                  "type": "RNA"
                }
              ],
              "targets": [
                {
                  "id": 1571,
                  "name": "Bovine Flu",
                  "abbreviation": "E",
                  "type": "RNA"
                },
                {
                  "id": 1624,
                  "name": "Salmonella",
                  "abbreviation": "F",
                  "type": "RNA"
                }
              ]
            },
            {
              "id": 1012,
              "extraction_no": 2,
              "extraction_volume": 1.36,
              "elution_volume": 0.69,
              "extraction_method": 1,
              "reverse_transcriptions": [
                {
                  "id": 1066,
                  "extraction_id": 1177,
                  "vol_in": 0.45,
                  "vol_out": 2.43,
                  "rt_cq": 0.58
                },
                {
                  "id": 1038,
                  "extraction_id": 1531,
                  "vol_in": 0.47,
                  "vol_out": 0.47,
                  "rt_cq": 0.05
                }
              ],
              "inhibitions": [
                {
                  "id": 1097,
                  "dilution": 48,
                  "type": "DNA"
                },
                {
                  "id": 1037,
                  "dilution": 14,
                  "type": "DNA"
                }
              ],
              "targets": [
                {
                  "id": 1126,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "GB",
                  "type": "RNA"
                },
                {
                  "id": 1029,
                  "name": "Bovine Flu",
                  "abbreviation": "GB",
                  "type": "DNA"
                }
              ]
            }
          ],
          "insert_date": "2015-04-30",
          "insert_user": "sspencer",
          "update_date": "2012-01-23",
          "update_user": "sspencer"
        }
      case 1009:
        return {
          "id": 1009,
          "analysis_batch_description": "Laborum consequat occaecat Lorem Lorem.",
          "analysis_batch_notes": "Nulla culpa irure deserunt veniam culpa est ipsum consequat veniam excepteur incididunt nostrud magna.",
          "studies": [
            12,
            14
          ],
          "extractions": [
            {
              "id": 1027,
              "extraction_no": 1,
              "extraction_volume": 0.63,
              "elution_volume": 2.78,
              "extraction_method": 2,
              "reverse_transcriptions": [
                {
                  "id": 1024,
                  "extraction_id": 1298,
                  "vol_in": 0.45,
                  "vol_out": 2.69,
                  "rt_cq": 0.79
                },
                {
                  "id": 1065,
                  "extraction_id": 1094,
                  "vol_in": 0.37,
                  "vol_out": 0.45,
                  "rt_cq": 0.32
                }
              ],
              "inhibitions": [
                {
                  "id": 1031,
                  "dilution": 11,
                  "type": "DNA"
                },
                {
                  "id": 1085,
                  "dilution": 14,
                  "type": "DNA"
                }
              ],
              "targets": [
                {
                  "id": 1861,
                  "name": "Salmonella",
                  "abbreviation": "SS",
                  "type": "DNA"
                },
                {
                  "id": 1782,
                  "name": "E.Coli",
                  "abbreviation": "GB",
                  "type": "RNA"
                }
              ]
            },
            {
              "id": 1057,
              "extraction_no": 2,
              "extraction_volume": 1.01,
              "elution_volume": 0.38,
              "extraction_method": 2,
              "reverse_transcriptions": [
                {
                  "id": 1012,
                  "extraction_id": 1002,
                  "vol_in": 1.17,
                  "vol_out": 1.38,
                  "rt_cq": 2.61
                },
                {
                  "id": 1031,
                  "extraction_id": 1242,
                  "vol_in": 0.21,
                  "vol_out": 2.91,
                  "rt_cq": 2.98
                }
              ],
              "inhibitions": [
                {
                  "id": 1058,
                  "dilution": 34,
                  "type": "RNA"
                },
                {
                  "id": 1018,
                  "dilution": 41,
                  "type": "RNA"
                }
              ],
              "targets": [
                {
                  "id": 1784,
                  "name": "E.Coli",
                  "abbreviation": "E",
                  "type": "DNA"
                },
                {
                  "id": 1746,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "E",
                  "type": "DNA"
                }
              ]
            }
          ],
          "insert_date": "2016-08-31",
          "insert_user": "sspencer",
          "update_date": "2013-01-21",
          "update_user": "afirnstahl"
        }
      default:
        break;
    }

  }
  //**********************************************Temporary**************************************************** */


  //getAnalysisBatches function  - makes request to lide web services
  getAnalysisBatches(): Observable<IAnalysisBatch[]> {

    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.get(APP_SETTINGS.ANALYSIS_BATCHES_URL, options)
      .map((response: Response) => <IAnalysisBatch[]>response.json())
      //.do(data => console.log('Analysis Batch data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  public create(formValue: IAnalysisBatch): Observable<IAnalysisBatch[]> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.ANALYSIS_BATCHES_URL, formValue, options)
      .map(this.extractData)
      .catch(this.handleError)

  }

  public update(formValue: IAnalysisBatch): Observable<IAnalysisBatch> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.put(APP_SETTINGS.ANALYSIS_BATCHES_URL + formValue.id + '/', formValue, options)
      .map(this.extractData)
      .catch(this.handleError);

  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
