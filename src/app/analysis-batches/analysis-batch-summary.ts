export interface IAnalysisBatchSummary {
    id: number,
    analysis_batch_description: string,
    analysis_batch_notes: string,
    studies: Object,
    extraction_count: number,
    inhibition_count: number,
    reverse_transcription_count: number,
    target_count: number,
    created_date: string,
    created_by: string
    modified_date: string,
    modified_by: string
}
