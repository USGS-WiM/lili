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
          "analysis_batch_description": "Ullamco et consectetur elit nisi tempor ut.",
          "analysis_batch_notes": "Lorem occaecat Lorem duis exercitation nulla enim nulla excepteur reprehenderit.",
          "samples": [
            1666,
            1108,
            1129,
            1811,
            1611,
            1716
          ],
          "studies": [
            5,
            14
          ],
          "extractions": [
            {
              "id": 1078,
              "extraction_no": 1,
              "extraction_volume": 0.38,
              "elution_volume": 0.16,
              "extraction_method": 1,
              "inhibitions": [
                {
                  "id": 1021,
                  "dilution": 10,
                  "type": "RNA",
                  "insert_date": "2016-10-04",
                  "insert_user": "jpstokdyk",
                  "update_date": "2015-05-08",
                  "update_user": "sspencer"
                },
                {
                  "id": 1067,
                  "dilution": 50,
                  "type": "RNA",
                  "insert_date": "2014-06-28",
                  "insert_user": "jpstokdyk",
                  "update_date": "2014-09-24",
                  "update_user": "sspencer"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1007,
                  "reverse_transcription_no": 1,
                  "vol_in": 0.07,
                  "vol_out": 0.12,
                  "rt_cq": 0.92,
                  "insert_date": "2015-08-23",
                  "insert_user": "sspencer",
                  "update_date": "2017-06-26",
                  "update_user": "afirnstahl"
                },
                {
                  "id": 1085,
                  "reverse_transcription_no": 2,
                  "vol_in": 1.09,
                  "vol_out": 1.36,
                  "rt_cq": 2.18,
                  "insert_date": "2014-01-28",
                  "insert_user": "legacy data upload",
                  "update_date": "2013-06-13",
                  "update_user": "sspencer"
                }
              ],
              "targets": [
                {
                  "id": 1214,
                  "name": "E.Coli",
                  "abbreviation": "GB",
                  "type": "RNA"
                },
                {
                  "id": 1159,
                  "name": "Bovine Flu",
                  "abbreviation": "E",
                  "type": "RNA"
                }
              ]
            },
            {
              "id": 1074,
              "extraction_no": 2,
              "extraction_volume": 0.7,
              "elution_volume": 1.58,
              "extraction_method": 1,
              "inhibitions": [
                {
                  "id": 1099,
                  "dilution": 42,
                  "type": "DNA",
                  "insert_date": "2015-07-04",
                  "insert_user": "jpstokdyk",
                  "update_date": "2017-08-29",
                  "update_user": "sspencer"
                },
                {
                  "id": 1092,
                  "dilution": 19,
                  "type": "RNA",
                  "insert_date": "2017-02-14",
                  "insert_user": "jpstokdyk",
                  "update_date": "2015-01-24",
                  "update_user": "afirnstahl"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1055,
                  "reverse_transcription_no": 1,
                  "vol_in": 1.49,
                  "vol_out": 2.51,
                  "rt_cq": 2.33,
                  "insert_date": "2016-06-30",
                  "insert_user": "afirnstahl",
                  "update_date": "2015-03-14",
                  "update_user": "afirnstahl"
                },
                {
                  "id": 1066,
                  "reverse_transcription_no": 2,
                  "vol_in": 0.93,
                  "vol_out": 1.32,
                  "rt_cq": 0.03,
                  "insert_date": "2013-08-11",
                  "insert_user": "legacy data upload",
                  "update_date": "2015-11-12",
                  "update_user": "afirnstahl"
                }
              ],
              "targets": [
                {
                  "id": 1256,
                  "name": "E.Coli",
                  "abbreviation": "F",
                  "type": "RNA"
                },
                {
                  "id": 1830,
                  "name": "E.Coli",
                  "abbreviation": "SS",
                  "type": "RNA"
                }
              ]
            }
          ],
          "insert_date": "2015-02-20",
          "insert_user": "sspencer",
          "update_date": "2013-04-02",
          "update_user": "afirnstahl"
        }
      case 1001:
        return {
          "id": 1001,
          "analysis_batch_description": "Voluptate magna et incididunt aute reprehenderit officia veniam non eu qui.",
          "analysis_batch_notes": "Dolore minim voluptate quis elit adipisicing incididunt.",
          "samples": [
            1514,
            1070,
            1327,
            1897,
            1691,
            1832
          ],
          "studies": [
            12,
            3
          ],
          "extractions": [
            {
              "id": 1089,
              "extraction_no": 1,
              "extraction_volume": 0.19,
              "elution_volume": 0.56,
              "extraction_method": 2,
              "inhibitions": [
                {
                  "id": 1010,
                  "dilution": 27,
                  "type": "DNA",
                  "insert_date": "2012-07-02",
                  "insert_user": "sspencer",
                  "update_date": "2015-03-15",
                  "update_user": "sspencer"
                },
                {
                  "id": 1054,
                  "dilution": 47,
                  "type": "DNA",
                  "insert_date": "2015-12-18",
                  "insert_user": "sspencer",
                  "update_date": "2012-06-18",
                  "update_user": "jpstokdyk"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1091,
                  "reverse_transcription_no": 1,
                  "vol_in": 1.39,
                  "vol_out": 0.31,
                  "rt_cq": 2.47,
                  "insert_date": "2013-11-07",
                  "insert_user": "jpstokdyk",
                  "update_date": "2012-04-19",
                  "update_user": "sspencer"
                },
                {
                  "id": 1030,
                  "reverse_transcription_no": 2,
                  "vol_in": 0.73,
                  "vol_out": 1.82,
                  "rt_cq": 0.53,
                  "insert_date": "2016-02-19",
                  "insert_user": "afirnstahl",
                  "update_date": "2016-05-20",
                  "update_user": "sspencer"
                }
              ],
              "targets": [
                {
                  "id": 1704,
                  "name": "Salmonella",
                  "abbreviation": "F",
                  "type": "RNA"
                },
                {
                  "id": 1978,
                  "name": "Bovine Flu",
                  "abbreviation": "E",
                  "type": "RNA"
                }
              ]
            },
            {
              "id": 1090,
              "extraction_no": 2,
              "extraction_volume": 0.03,
              "elution_volume": 1.37,
              "extraction_method": 2,
              "inhibitions": [
                {
                  "id": 1026,
                  "dilution": 18,
                  "type": "DNA",
                  "insert_date": "2014-12-19",
                  "insert_user": "afirnstahl",
                  "update_date": "2014-02-08",
                  "update_user": "afirnstahl"
                },
                {
                  "id": 1071,
                  "dilution": 45,
                  "type": "RNA",
                  "insert_date": "2013-07-14",
                  "insert_user": "afirnstahl",
                  "update_date": "2014-03-04",
                  "update_user": "jpstokdyk"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1043,
                  "reverse_transcription_no": 1,
                  "vol_in": 1.23,
                  "vol_out": 2.77,
                  "rt_cq": 2.54,
                  "insert_date": "2015-04-30",
                  "insert_user": "afirnstahl",
                  "update_date": "2013-06-09",
                  "update_user": "jpstokdyk"
                },
                {
                  "id": 1000,
                  "reverse_transcription_no": 2,
                  "vol_in": 1.48,
                  "vol_out": 2.51,
                  "rt_cq": 1.28,
                  "insert_date": "2017-05-26",
                  "insert_user": "afirnstahl",
                  "update_date": "2015-05-24",
                  "update_user": "afirnstahl"
                }
              ],
              "targets": [
                {
                  "id": 1525,
                  "name": "Salmonella",
                  "abbreviation": "GB",
                  "type": "DNA"
                },
                {
                  "id": 1759,
                  "name": "E.Coli",
                  "abbreviation": "GB",
                  "type": "RNA"
                }
              ]
            }
          ],
          "insert_date": "2017-01-13",
          "insert_user": "jpstokdyk",
          "update_date": "2015-12-05",
          "update_user": "sspencer"
        }
      case 1002:
        return {
          "id": 1002,
          "analysis_batch_description": "In nisi ex nostrud cillum laborum.",
          "analysis_batch_notes": "Excepteur veniam eiusmod cillum culpa.",
          "samples": [
            1230,
            1450,
            1717,
            1417,
            1574,
            1039
          ],
          "studies": [
            1,
            9
          ],
          "extractions": [
            {
              "id": 1003,
              "extraction_no": 1,
              "extraction_volume": 1.35,
              "elution_volume": 0.35,
              "extraction_method": 1,
              "inhibitions": [
                {
                  "id": 1078,
                  "dilution": 22,
                  "type": "DNA",
                  "insert_date": "2015-02-05",
                  "insert_user": "jpstokdyk",
                  "update_date": "2016-05-31",
                  "update_user": "afirnstahl"
                },
                {
                  "id": 1098,
                  "dilution": 19,
                  "type": "RNA",
                  "insert_date": "2013-03-06",
                  "insert_user": "sspencer",
                  "update_date": "2015-06-10",
                  "update_user": "afirnstahl"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1088,
                  "reverse_transcription_no": 1,
                  "vol_in": 0.73,
                  "vol_out": 0.11,
                  "rt_cq": 2.54,
                  "insert_date": "2013-09-19",
                  "insert_user": "jpstokdyk",
                  "update_date": "2017-03-03",
                  "update_user": "jpstokdyk"
                },
                {
                  "id": 1027,
                  "reverse_transcription_no": 2,
                  "vol_in": 1.27,
                  "vol_out": 0.29,
                  "rt_cq": 0.42,
                  "insert_date": "2017-09-05",
                  "insert_user": "legacy data upload",
                  "update_date": "2014-11-17",
                  "update_user": "jpstokdyk"
                }
              ],
              "targets": [
                {
                  "id": 1659,
                  "name": "E.Coli",
                  "abbreviation": "GB",
                  "type": "DNA"
                },
                {
                  "id": 1811,
                  "name": "Bovine Flu",
                  "abbreviation": "F",
                  "type": "RNA"
                }
              ]
            },
            {
              "id": 1071,
              "extraction_no": 2,
              "extraction_volume": 0.98,
              "elution_volume": 1.23,
              "extraction_method": 1,
              "inhibitions": [
                {
                  "id": 1056,
                  "dilution": 25,
                  "type": "RNA",
                  "insert_date": "2014-06-04",
                  "insert_user": "sspencer",
                  "update_date": "2013-06-28",
                  "update_user": "sspencer"
                },
                {
                  "id": 1076,
                  "dilution": 43,
                  "type": "DNA",
                  "insert_date": "2016-05-04",
                  "insert_user": "legacy data upload",
                  "update_date": "2013-03-25",
                  "update_user": "sspencer"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1034,
                  "reverse_transcription_no": 1,
                  "vol_in": 0.54,
                  "vol_out": 0.11,
                  "rt_cq": 2.38,
                  "insert_date": "2013-04-25",
                  "insert_user": "afirnstahl",
                  "update_date": "2013-11-20",
                  "update_user": "afirnstahl"
                },
                {
                  "id": 1009,
                  "reverse_transcription_no": 2,
                  "vol_in": 0.33,
                  "vol_out": 0.77,
                  "rt_cq": 2.13,
                  "insert_date": "2015-07-28",
                  "insert_user": "sspencer",
                  "update_date": "2015-07-08",
                  "update_user": "jpstokdyk"
                }
              ],
              "targets": [
                {
                  "id": 1382,
                  "name": "E.Coli",
                  "abbreviation": "E",
                  "type": "DNA"
                },
                {
                  "id": 1555,
                  "name": "E.Coli",
                  "abbreviation": "SS",
                  "type": "DNA"
                }
              ]
            }
          ],
          "insert_date": "2015-04-12",
          "insert_user": "legacy data upload",
          "update_date": "2013-02-12",
          "update_user": "afirnstahl"
        }
      case 1003:
        return {
          "id": 1003,
          "analysis_batch_description": "Ullamco officia dolor Lorem consectetur nisi ut commodo irure mollit fugiat excepteur ea do.",
          "analysis_batch_notes": "Sunt nulla mollit ea quis sit esse duis dolore ex nulla cillum ullamco non adipisicing.",
          "samples": [
            1696,
            1680,
            1152,
            1468,
            1291,
            1639
          ],
          "studies": [
            1,
            9
          ],
          "extractions": [
            {
              "id": 1085,
              "extraction_no": 1,
              "extraction_volume": 0.84,
              "elution_volume": 1.44,
              "extraction_method": 2,
              "inhibitions": [
                {
                  "id": 1040,
                  "dilution": 6,
                  "type": "RNA",
                  "insert_date": "2013-03-15",
                  "insert_user": "sspencer",
                  "update_date": "2012-09-20",
                  "update_user": "jpstokdyk"
                },
                {
                  "id": 1076,
                  "dilution": 45,
                  "type": "RNA",
                  "insert_date": "2017-02-01",
                  "insert_user": "sspencer",
                  "update_date": "2012-01-05",
                  "update_user": "afirnstahl"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1015,
                  "reverse_transcription_no": 1,
                  "vol_in": 1.03,
                  "vol_out": 1.77,
                  "rt_cq": 2.29,
                  "insert_date": "2016-10-03",
                  "insert_user": "afirnstahl",
                  "update_date": "2017-02-02",
                  "update_user": "afirnstahl"
                },
                {
                  "id": 1022,
                  "reverse_transcription_no": 2,
                  "vol_in": 1.5,
                  "vol_out": 1.23,
                  "rt_cq": 1.87,
                  "insert_date": "2013-05-10",
                  "insert_user": "afirnstahl",
                  "update_date": "2014-09-11",
                  "update_user": "afirnstahl"
                }
              ],
              "targets": [
                {
                  "id": 1832,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "F",
                  "type": "RNA"
                },
                {
                  "id": 1173,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "GB",
                  "type": "DNA"
                }
              ]
            },
            {
              "id": 1033,
              "extraction_no": 2,
              "extraction_volume": 0.38,
              "elution_volume": 2.25,
              "extraction_method": 2,
              "inhibitions": [
                {
                  "id": 1058,
                  "dilution": 49,
                  "type": "DNA",
                  "insert_date": "2013-07-22",
                  "insert_user": "sspencer",
                  "update_date": "2015-05-17",
                  "update_user": "sspencer"
                },
                {
                  "id": 1021,
                  "dilution": 48,
                  "type": "DNA",
                  "insert_date": "2016-08-24",
                  "insert_user": "afirnstahl",
                  "update_date": "2017-07-12",
                  "update_user": "jpstokdyk"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1048,
                  "reverse_transcription_no": 1,
                  "vol_in": 0.55,
                  "vol_out": 0.56,
                  "rt_cq": 0.98,
                  "insert_date": "2013-09-07",
                  "insert_user": "afirnstahl",
                  "update_date": "2013-06-14",
                  "update_user": "jpstokdyk"
                },
                {
                  "id": 1075,
                  "reverse_transcription_no": 2,
                  "vol_in": 1.15,
                  "vol_out": 1.59,
                  "rt_cq": 0.95,
                  "insert_date": "2013-12-29",
                  "insert_user": "sspencer",
                  "update_date": "2015-07-24",
                  "update_user": "sspencer"
                }
              ],
              "targets": [
                {
                  "id": 1389,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "E",
                  "type": "DNA"
                },
                {
                  "id": 1264,
                  "name": "E.Coli",
                  "abbreviation": "E",
                  "type": "DNA"
                }
              ]
            }
          ],
          "insert_date": "2013-01-01",
          "insert_user": "jpstokdyk",
          "update_date": "2017-05-08",
          "update_user": "sspencer"
        }
      case 1004:
        return {
          "id": 1004,
          "analysis_batch_description": "Qui sit aliqua mollit incididunt adipisicing.",
          "analysis_batch_notes": "Aliqua dolore consequat enim quis.",
          "samples": [
            1577,
            1258,
            1890,
            1658,
            1869,
            1590
          ],
          "studies": [
            8,
            5
          ],
          "extractions": [
            {
              "id": 1036,
              "extraction_no": 1,
              "extraction_volume": 0.44,
              "elution_volume": 2.81,
              "extraction_method": 1,
              "inhibitions": [
                {
                  "id": 1048,
                  "dilution": 42,
                  "type": "DNA",
                  "insert_date": "2013-06-15",
                  "insert_user": "afirnstahl",
                  "update_date": "2017-07-25",
                  "update_user": "sspencer"
                },
                {
                  "id": 1036,
                  "dilution": 9,
                  "type": "DNA",
                  "insert_date": "2015-05-22",
                  "insert_user": "legacy data upload",
                  "update_date": "2013-05-04",
                  "update_user": "afirnstahl"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1006,
                  "reverse_transcription_no": 1,
                  "vol_in": 1.39,
                  "vol_out": 0.75,
                  "rt_cq": 1.79,
                  "insert_date": "2016-08-17",
                  "insert_user": "jpstokdyk",
                  "update_date": "2012-10-04",
                  "update_user": "afirnstahl"
                },
                {
                  "id": 1021,
                  "reverse_transcription_no": 2,
                  "vol_in": 0.18,
                  "vol_out": 2.6,
                  "rt_cq": 0.76,
                  "insert_date": "2013-02-23",
                  "insert_user": "sspencer",
                  "update_date": "2015-05-17",
                  "update_user": "afirnstahl"
                }
              ],
              "targets": [
                {
                  "id": 1753,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "SS",
                  "type": "RNA"
                },
                {
                  "id": 1319,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "F",
                  "type": "RNA"
                }
              ]
            },
            {
              "id": 1068,
              "extraction_no": 2,
              "extraction_volume": 1.42,
              "elution_volume": 1.39,
              "extraction_method": 1,
              "inhibitions": [
                {
                  "id": 1070,
                  "dilution": 34,
                  "type": "DNA",
                  "insert_date": "2016-09-03",
                  "insert_user": "jpstokdyk",
                  "update_date": "2013-10-26",
                  "update_user": "jpstokdyk"
                },
                {
                  "id": 1081,
                  "dilution": 13,
                  "type": "RNA",
                  "insert_date": "2017-09-06",
                  "insert_user": "legacy data upload",
                  "update_date": "2014-12-23",
                  "update_user": "jpstokdyk"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1005,
                  "reverse_transcription_no": 1,
                  "vol_in": 0.22,
                  "vol_out": 2.36,
                  "rt_cq": 0.17,
                  "insert_date": "2012-03-19",
                  "insert_user": "jpstokdyk",
                  "update_date": "2013-07-16",
                  "update_user": "afirnstahl"
                },
                {
                  "id": 1056,
                  "reverse_transcription_no": 2,
                  "vol_in": 0.55,
                  "vol_out": 1.24,
                  "rt_cq": 0.83,
                  "insert_date": "2013-01-18",
                  "insert_user": "sspencer",
                  "update_date": "2012-01-29",
                  "update_user": "afirnstahl"
                }
              ],
              "targets": [
                {
                  "id": 1734,
                  "name": "E.Coli",
                  "abbreviation": "SS",
                  "type": "RNA"
                },
                {
                  "id": 1026,
                  "name": "E.Coli",
                  "abbreviation": "SS",
                  "type": "RNA"
                }
              ]
            }
          ],
          "insert_date": "2014-10-16",
          "insert_user": "sspencer",
          "update_date": "2012-05-23",
          "update_user": "afirnstahl"
        }
      case 1005:
        return {
          "id": 1005,
          "analysis_batch_description": "Labore et adipisicing duis ea Lorem commodo elit ut aliquip cupidatat excepteur.",
          "analysis_batch_notes": "Commodo id Lorem eiusmod ea anim dolore enim in ad anim irure.",
          "samples": [
            1262,
            1658,
            1262,
            1784,
            1311,
            1526
          ],
          "studies": [
            6,
            6
          ],
          "extractions": [
            {
              "id": 1049,
              "extraction_no": 1,
              "extraction_volume": 0.95,
              "elution_volume": 1.16,
              "extraction_method": 1,
              "inhibitions": [
                {
                  "id": 1021,
                  "dilution": 36,
                  "type": "DNA",
                  "insert_date": "2014-06-10",
                  "insert_user": "legacy data upload",
                  "update_date": "2015-08-13",
                  "update_user": "sspencer"
                },
                {
                  "id": 1080,
                  "dilution": 41,
                  "type": "DNA",
                  "insert_date": "2016-07-16",
                  "insert_user": "legacy data upload",
                  "update_date": "2013-07-04",
                  "update_user": "afirnstahl"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1083,
                  "reverse_transcription_no": 1,
                  "vol_in": 0.44,
                  "vol_out": 2.26,
                  "rt_cq": 0.11,
                  "insert_date": "2012-07-17",
                  "insert_user": "legacy data upload",
                  "update_date": "2013-08-10",
                  "update_user": "sspencer"
                },
                {
                  "id": 1004,
                  "reverse_transcription_no": 2,
                  "vol_in": 1.1,
                  "vol_out": 0.68,
                  "rt_cq": 1.81,
                  "insert_date": "2016-10-01",
                  "insert_user": "legacy data upload",
                  "update_date": "2015-04-22",
                  "update_user": "jpstokdyk"
                }
              ],
              "targets": [
                {
                  "id": 1369,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "F",
                  "type": "DNA"
                },
                {
                  "id": 1183,
                  "name": "Bovine Flu",
                  "abbreviation": "SS",
                  "type": "RNA"
                }
              ]
            },
            {
              "id": 1091,
              "extraction_no": 2,
              "extraction_volume": 0.31,
              "elution_volume": 2.26,
              "extraction_method": 2,
              "inhibitions": [
                {
                  "id": 1024,
                  "dilution": 30,
                  "type": "RNA",
                  "insert_date": "2013-10-29",
                  "insert_user": "sspencer",
                  "update_date": "2017-05-07",
                  "update_user": "jpstokdyk"
                },
                {
                  "id": 1086,
                  "dilution": 27,
                  "type": "DNA",
                  "insert_date": "2014-05-19",
                  "insert_user": "afirnstahl",
                  "update_date": "2016-07-08",
                  "update_user": "sspencer"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1045,
                  "reverse_transcription_no": 1,
                  "vol_in": 0.59,
                  "vol_out": 1.54,
                  "rt_cq": 0.73,
                  "insert_date": "2013-01-29",
                  "insert_user": "legacy data upload",
                  "update_date": "2014-05-27",
                  "update_user": "afirnstahl"
                },
                {
                  "id": 1085,
                  "reverse_transcription_no": 2,
                  "vol_in": 0.59,
                  "vol_out": 2,
                  "rt_cq": 0.56,
                  "insert_date": "2015-06-10",
                  "insert_user": "sspencer",
                  "update_date": "2012-11-17",
                  "update_user": "sspencer"
                }
              ],
              "targets": [
                {
                  "id": 1719,
                  "name": "E.Coli",
                  "abbreviation": "F",
                  "type": "RNA"
                },
                {
                  "id": 1340,
                  "name": "E.Coli",
                  "abbreviation": "SS",
                  "type": "RNA"
                }
              ]
            }
          ],
          "insert_date": "2015-05-10",
          "insert_user": "afirnstahl",
          "update_date": "2017-08-06",
          "update_user": "sspencer"
        }
      case 1006:
        return {
          "id": 1006,
          "analysis_batch_description": "Est eu laboris qui ea ipsum sunt nostrud.",
          "analysis_batch_notes": "Anim consectetur esse occaecat nisi id velit dolor nostrud consectetur dolore aute id ut.",
          "samples": [
            1620,
            1234,
            1926,
            1641,
            1302,
            1124
          ],
          "studies": [
            4,
            0
          ],
          "extractions": [
            {
              "id": 1056,
              "extraction_no": 1,
              "extraction_volume": 0.47,
              "elution_volume": 0.65,
              "extraction_method": 1,
              "inhibitions": [
                {
                  "id": 1080,
                  "dilution": 13,
                  "type": "DNA",
                  "insert_date": "2013-04-19",
                  "insert_user": "legacy data upload",
                  "update_date": "2016-09-04",
                  "update_user": "sspencer"
                },
                {
                  "id": 1009,
                  "dilution": 7,
                  "type": "DNA",
                  "insert_date": "2015-06-19",
                  "insert_user": "sspencer",
                  "update_date": "2012-07-24",
                  "update_user": "jpstokdyk"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1045,
                  "reverse_transcription_no": 1,
                  "vol_in": 0.28,
                  "vol_out": 1.12,
                  "rt_cq": 1.31,
                  "insert_date": "2015-11-16",
                  "insert_user": "legacy data upload",
                  "update_date": "2013-07-05",
                  "update_user": "sspencer"
                },
                {
                  "id": 1052,
                  "reverse_transcription_no": 2,
                  "vol_in": 0.81,
                  "vol_out": 2.22,
                  "rt_cq": 2.04,
                  "insert_date": "2013-08-24",
                  "insert_user": "afirnstahl",
                  "update_date": "2013-05-29",
                  "update_user": "sspencer"
                }
              ],
              "targets": [
                {
                  "id": 1009,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "GB",
                  "type": "RNA"
                },
                {
                  "id": 1453,
                  "name": "E.Coli",
                  "abbreviation": "SS",
                  "type": "RNA"
                }
              ]
            },
            {
              "id": 1061,
              "extraction_no": 2,
              "extraction_volume": 1.4,
              "elution_volume": 2.11,
              "extraction_method": 2,
              "inhibitions": [
                {
                  "id": 1079,
                  "dilution": 25,
                  "type": "DNA",
                  "insert_date": "2017-03-31",
                  "insert_user": "jpstokdyk",
                  "update_date": "2014-08-19",
                  "update_user": "afirnstahl"
                },
                {
                  "id": 1088,
                  "dilution": 41,
                  "type": "DNA",
                  "insert_date": "2012-09-10",
                  "insert_user": "sspencer",
                  "update_date": "2012-11-28",
                  "update_user": "jpstokdyk"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1016,
                  "reverse_transcription_no": 1,
                  "vol_in": 1.02,
                  "vol_out": 2.02,
                  "rt_cq": 0.96,
                  "insert_date": "2012-05-09",
                  "insert_user": "afirnstahl",
                  "update_date": "2016-02-26",
                  "update_user": "afirnstahl"
                },
                {
                  "id": 1002,
                  "reverse_transcription_no": 2,
                  "vol_in": 0.93,
                  "vol_out": 2.84,
                  "rt_cq": 0.5,
                  "insert_date": "2017-02-24",
                  "insert_user": "afirnstahl",
                  "update_date": "2015-06-05",
                  "update_user": "jpstokdyk"
                }
              ],
              "targets": [
                {
                  "id": 1971,
                  "name": "Salmonella",
                  "abbreviation": "F",
                  "type": "DNA"
                },
                {
                  "id": 1082,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "SS",
                  "type": "RNA"
                }
              ]
            }
          ],
          "insert_date": "2013-10-06",
          "insert_user": "sspencer",
          "update_date": "2014-08-24",
          "update_user": "jpstokdyk"
        }
      case 1007:
        return {
          "id": 1007,
          "analysis_batch_description": "Minim minim veniam culpa aliqua.",
          "analysis_batch_notes": "Sunt proident do minim ex.",
          "samples": [
            1340,
            1847,
            1463,
            1215,
            1601,
            1043
          ],
          "studies": [
            1,
            12
          ],
          "extractions": [
            {
              "id": 1049,
              "extraction_no": 1,
              "extraction_volume": 0.24,
              "elution_volume": 2.75,
              "extraction_method": 1,
              "inhibitions": [
                {
                  "id": 1056,
                  "dilution": 37,
                  "type": "RNA",
                  "insert_date": "2012-03-04",
                  "insert_user": "legacy data upload",
                  "update_date": "2013-01-06",
                  "update_user": "sspencer"
                },
                {
                  "id": 1081,
                  "dilution": 19,
                  "type": "RNA",
                  "insert_date": "2015-04-15",
                  "insert_user": "jpstokdyk",
                  "update_date": "2016-09-23",
                  "update_user": "jpstokdyk"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1088,
                  "reverse_transcription_no": 1,
                  "vol_in": 1.47,
                  "vol_out": 2.85,
                  "rt_cq": 2.38,
                  "insert_date": "2014-03-26",
                  "insert_user": "legacy data upload",
                  "update_date": "2016-12-25",
                  "update_user": "jpstokdyk"
                },
                {
                  "id": 1003,
                  "reverse_transcription_no": 2,
                  "vol_in": 0.87,
                  "vol_out": 0.28,
                  "rt_cq": 1.18,
                  "insert_date": "2013-07-18",
                  "insert_user": "afirnstahl",
                  "update_date": "2013-05-16",
                  "update_user": "afirnstahl"
                }
              ],
              "targets": [
                {
                  "id": 1494,
                  "name": "Salmonella",
                  "abbreviation": "GB",
                  "type": "DNA"
                },
                {
                  "id": 1384,
                  "name": "E.Coli",
                  "abbreviation": "SS",
                  "type": "RNA"
                }
              ]
            },
            {
              "id": 1049,
              "extraction_no": 2,
              "extraction_volume": 0.02,
              "elution_volume": 1.2,
              "extraction_method": 2,
              "inhibitions": [
                {
                  "id": 1066,
                  "dilution": 46,
                  "type": "RNA",
                  "insert_date": "2012-07-20",
                  "insert_user": "afirnstahl",
                  "update_date": "2013-05-31",
                  "update_user": "jpstokdyk"
                },
                {
                  "id": 1092,
                  "dilution": 34,
                  "type": "RNA",
                  "insert_date": "2017-08-15",
                  "insert_user": "jpstokdyk",
                  "update_date": "2015-04-18",
                  "update_user": "jpstokdyk"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1003,
                  "reverse_transcription_no": 1,
                  "vol_in": 0.13,
                  "vol_out": 2.78,
                  "rt_cq": 1.63,
                  "insert_date": "2012-11-14",
                  "insert_user": "legacy data upload",
                  "update_date": "2016-01-11",
                  "update_user": "sspencer"
                },
                {
                  "id": 1094,
                  "reverse_transcription_no": 2,
                  "vol_in": 1.11,
                  "vol_out": 0.18,
                  "rt_cq": 0.41,
                  "insert_date": "2012-11-16",
                  "insert_user": "jpstokdyk",
                  "update_date": "2016-03-27",
                  "update_user": "jpstokdyk"
                }
              ],
              "targets": [
                {
                  "id": 1305,
                  "name": "Bovine Flu",
                  "abbreviation": "E",
                  "type": "DNA"
                },
                {
                  "id": 1577,
                  "name": "Salmonella",
                  "abbreviation": "E",
                  "type": "RNA"
                }
              ]
            }
          ],
          "insert_date": "2013-06-07",
          "insert_user": "legacy data upload",
          "update_date": "2013-03-16",
          "update_user": "jpstokdyk"
        }
      case 1008:
        return {
          "id": 1008,
          "analysis_batch_description": "Nulla consequat quis esse adipisicing esse est duis do pariatur quis nostrud.",
          "analysis_batch_notes": "Tempor adipisicing minim non sunt proident reprehenderit irure Lorem minim exercitation in tempor minim.",
          "samples": [
            1102,
            1553,
            1604,
            1220,
            1433,
            1090
          ],
          "studies": [
            8,
            2
          ],
          "extractions": [
            {
              "id": 1075,
              "extraction_no": 1,
              "extraction_volume": 1,
              "elution_volume": 2.17,
              "extraction_method": 2,
              "inhibitions": [
                {
                  "id": 1008,
                  "dilution": 19,
                  "type": "RNA",
                  "insert_date": "2012-10-10",
                  "insert_user": "afirnstahl",
                  "update_date": "2013-10-09",
                  "update_user": "afirnstahl"
                },
                {
                  "id": 1094,
                  "dilution": 32,
                  "type": "RNA",
                  "insert_date": "2016-09-01",
                  "insert_user": "afirnstahl",
                  "update_date": "2015-03-17",
                  "update_user": "jpstokdyk"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1066,
                  "reverse_transcription_no": 1,
                  "vol_in": 0.15,
                  "vol_out": 2.88,
                  "rt_cq": 2.72,
                  "insert_date": "2013-09-16",
                  "insert_user": "sspencer",
                  "update_date": "2012-02-08",
                  "update_user": "jpstokdyk"
                },
                {
                  "id": 1070,
                  "reverse_transcription_no": 2,
                  "vol_in": 0.61,
                  "vol_out": 0.83,
                  "rt_cq": 0.86,
                  "insert_date": "2016-01-01",
                  "insert_user": "jpstokdyk",
                  "update_date": "2012-08-11",
                  "update_user": "sspencer"
                }
              ],
              "targets": [
                {
                  "id": 1265,
                  "name": "Salmonella",
                  "abbreviation": "GB",
                  "type": "DNA"
                },
                {
                  "id": 1138,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "F",
                  "type": "RNA"
                }
              ]
            },
            {
              "id": 1023,
              "extraction_no": 2,
              "extraction_volume": 0.71,
              "elution_volume": 1.46,
              "extraction_method": 2,
              "inhibitions": [
                {
                  "id": 1080,
                  "dilution": 37,
                  "type": "DNA",
                  "insert_date": "2017-03-05",
                  "insert_user": "sspencer",
                  "update_date": "2014-03-30",
                  "update_user": "sspencer"
                },
                {
                  "id": 1039,
                  "dilution": 26,
                  "type": "DNA",
                  "insert_date": "2013-11-10",
                  "insert_user": "afirnstahl",
                  "update_date": "2017-02-28",
                  "update_user": "jpstokdyk"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1041,
                  "reverse_transcription_no": 1,
                  "vol_in": 0.46,
                  "vol_out": 0.12,
                  "rt_cq": 2.05,
                  "insert_date": "2015-05-12",
                  "insert_user": "jpstokdyk",
                  "update_date": "2012-08-25",
                  "update_user": "jpstokdyk"
                },
                {
                  "id": 1078,
                  "reverse_transcription_no": 2,
                  "vol_in": 0.64,
                  "vol_out": 0.71,
                  "rt_cq": 2.67,
                  "insert_date": "2014-07-23",
                  "insert_user": "jpstokdyk",
                  "update_date": "2015-01-29",
                  "update_user": "sspencer"
                }
              ],
              "targets": [
                {
                  "id": 1770,
                  "name": "E.Coli",
                  "abbreviation": "F",
                  "type": "DNA"
                },
                {
                  "id": 1957,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "SS",
                  "type": "DNA"
                }
              ]
            }
          ],
          "insert_date": "2015-11-10",
          "insert_user": "sspencer",
          "update_date": "2012-07-29",
          "update_user": "afirnstahl"
        }
      case 1009:
        return {
          "id": 1009,
          "analysis_batch_description": "Magna voluptate sunt incididunt laborum nostrud voluptate Lorem esse aliquip enim eu aute velit ad.",
          "analysis_batch_notes": "Mollit qui do excepteur officia qui amet laborum veniam cillum pariatur dolor ullamco Lorem.",
          "samples": [
            1413,
            1764,
            1206,
            1616,
            1108,
            1956
          ],
          "studies": [
            4,
            4
          ],
          "extractions": [
            {
              "id": 1071,
              "extraction_no": 1,
              "extraction_volume": 1.46,
              "elution_volume": 0.83,
              "extraction_method": 2,
              "inhibitions": [
                {
                  "id": 1053,
                  "dilution": 28,
                  "type": "DNA",
                  "insert_date": "2014-04-25",
                  "insert_user": "afirnstahl",
                  "update_date": "2014-05-06",
                  "update_user": "afirnstahl"
                },
                {
                  "id": 1069,
                  "dilution": 46,
                  "type": "DNA",
                  "insert_date": "2014-10-16",
                  "insert_user": "sspencer",
                  "update_date": "2014-02-11",
                  "update_user": "jpstokdyk"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1079,
                  "reverse_transcription_no": 1,
                  "vol_in": 0.24,
                  "vol_out": 1.31,
                  "rt_cq": 1.64,
                  "insert_date": "2015-06-23",
                  "insert_user": "jpstokdyk",
                  "update_date": "2014-04-20",
                  "update_user": "sspencer"
                },
                {
                  "id": 1009,
                  "reverse_transcription_no": 2,
                  "vol_in": 1.22,
                  "vol_out": 1.67,
                  "rt_cq": 1.29,
                  "insert_date": "2013-12-01",
                  "insert_user": "jpstokdyk",
                  "update_date": "2017-07-12",
                  "update_user": "sspencer"
                }
              ],
              "targets": [
                {
                  "id": 1700,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "GB",
                  "type": "DNA"
                },
                {
                  "id": 1521,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "F",
                  "type": "RNA"
                }
              ]
            },
            {
              "id": 1082,
              "extraction_no": 2,
              "extraction_volume": 0.68,
              "elution_volume": 0.96,
              "extraction_method": 2,
              "inhibitions": [
                {
                  "id": 1091,
                  "dilution": 26,
                  "type": "DNA",
                  "insert_date": "2015-04-25",
                  "insert_user": "legacy data upload",
                  "update_date": "2017-02-15",
                  "update_user": "jpstokdyk"
                },
                {
                  "id": 1025,
                  "dilution": 22,
                  "type": "DNA",
                  "insert_date": "2016-03-26",
                  "insert_user": "afirnstahl",
                  "update_date": "2012-08-14",
                  "update_user": "sspencer"
                }
              ],
              "reverse_transcriptions": [
                {
                  "id": 1092,
                  "reverse_transcription_no": 1,
                  "vol_in": 0.93,
                  "vol_out": 2.75,
                  "rt_cq": 0.51,
                  "insert_date": "2014-10-28",
                  "insert_user": "jpstokdyk",
                  "update_date": "2012-02-06",
                  "update_user": "jpstokdyk"
                },
                {
                  "id": 1055,
                  "reverse_transcription_no": 2,
                  "vol_in": 1.45,
                  "vol_out": 1.91,
                  "rt_cq": 1.32,
                  "insert_date": "2012-07-21",
                  "insert_user": "afirnstahl",
                  "update_date": "2017-05-18",
                  "update_user": "sspencer"
                }
              ],
              "targets": [
                {
                  "id": 1011,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "E",
                  "type": "DNA"
                },
                {
                  "id": 1921,
                  "name": "Crazy Cow-itis",
                  "abbreviation": "F",
                  "type": "RNA"
                }
              ]
            }
          ],
          "insert_date": "2015-03-22",
          "insert_user": "jpstokdyk",
          "update_date": "2012-06-23",
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
