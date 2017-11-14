export interface IExtractionBatchSubmission {
    analysis_batch: number;
    extraction_method: number;
    reextraction: number
    extraction_volume: number
    elution_volume: number
    extraction_date: string
    replicates: Object[],
    extractions: Object[]
}
