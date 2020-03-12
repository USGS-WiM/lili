export interface IAnalysisBatchSummary {
    id: number,
    name: string,
    analysis_batch_description: string,
    analysis_batch_notes: string,
    studies: Object,
    // sample_extraction_count: number,
    // inhibition_count: number,
    // reverse_transcription_count: number,
    // target_count: number,
    summary: {
        inhibition_count: number,
        reverse_transcription_count: number,
        sample_extraction_count?: number,
        target_count: number,
        extraction_batch_count: number
    }
    created_date: string,
    created_by: string
    modified_date: string,
    modified_by: string
}
