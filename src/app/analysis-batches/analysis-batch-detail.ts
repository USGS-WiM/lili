import { IExtractionBatch } from '../extraction-batches/extraction-batch';
import { ISampleSummary } from '../samples/sample-summary';

export interface IAnalysisBatchDetail {
    id: number;
    analysis_batch_description: string;
    analysis_batch_notes: string;
    samples: ISampleSummary[];
    studies: Object[];
    extraction_batches: IExtractionBatch[];
    created_date: string;
    created_by: string;
    modified_date: string;
    modified_by: string;
}

