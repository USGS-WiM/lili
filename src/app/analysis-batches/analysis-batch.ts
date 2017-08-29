export interface IAnalysisBatch {
    id: number,
    analysis_batch_description: string,
    studies: Object,
    extractions: Object,
    reverse_transcriptions: Object,
    inhibitions:Object,
    targets:Object,
    analysis_batch_notes: string,
    insert_date: string,
    insert_user:string
    update_date: string,
    update_user:string
}
