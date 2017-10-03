import { IExtraction } from '../extractions/extraction';

export interface IAnalysisBatch {
    id: number;
    analysis_batch_description: string;
    analysis_batch_notes: string;
    samples: Object[];
    studies: Object[];
    extractions: IExtraction[];
    created_date: string;
    created_by: string;
    modified_date: string;
    modified_by: string;
}
