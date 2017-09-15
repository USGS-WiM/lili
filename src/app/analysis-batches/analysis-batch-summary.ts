export interface IAnalysisBatchSummary {
    id: number,
    analysis_batch_description: string,
    analysis_batch_notes: string,
    studies: Object,
    extraction_count: number,
    inhibition_count:number,
    reverse_transcription_count:number,
    target_count:number,
    insert_date: string,
    insert_user:string
    update_date: string,
    update_user:string
}
