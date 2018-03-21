import { ISampleExtraction } from '../sample-extractions/sample-extraction';
import { ISampleSummary } from '../samples/sample-summary';

export interface IAnalysisBatch {
   id: number;
   samples: number[]
   analysis_batch_description: string;
   analysis_batch_notes: string;
   created_date: string;
   created_by: string;
   modified_date: string;
   modified_by: string;

}
