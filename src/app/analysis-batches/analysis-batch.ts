export interface IAnalysisBatch {
    id: number,
    analysis_batch_description: string,
    analysis_batch_notes: string,
    studies: Object,
    extractions: Object,
    insert_date: string,
    insert_user:string
    update_date: string,
    update_user:string
}
