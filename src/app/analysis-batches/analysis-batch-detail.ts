import { IExtraction } from '../extractions/extraction';
import { ISampleSummary } from '../samples/sample-summary';

export interface IAnalysisBatchDetail {
    id: number;
    analysis_batch_description: string;
    analysis_batch_notes: string;
    samples: ISampleSummary[];
    studies: Object[];
    extractions: IExtraction[];
    created_date: string;
    created_by: string;
    modified_date: string;
    modified_by: string;
}

