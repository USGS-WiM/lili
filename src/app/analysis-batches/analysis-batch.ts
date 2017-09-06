import { IExtraction } from '../SHARED/extraction';

export interface IAnalysisBatch {
    id: number,
    analysis_batch_description: string,
    analysis_batch_notes: string,
    samples: Number[],
    studies: Number[],
    extractions: IExtraction[],
    insert_date: string,
    insert_user:string
    update_date: string,
    update_user:string
}
