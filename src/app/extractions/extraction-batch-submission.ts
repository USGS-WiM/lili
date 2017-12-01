import {IReverseTranscriptionSubmission} from '../reverse-transcriptions/reverse-transcription-submission'

export interface IExtractionBatchSubmission {
    analysis_batch: number;
    extraction_method: number;
    extraction_volume: number
    elution_volume: number
    sample_dilution_factor: number;
    extraction_date: string
    template_volume: number;
    reaction_volume: number;
    pcr_date: string;
    reextraction: number
    rt: IReverseTranscriptionSubmission;
    replicates: Object[],
    extractions: Object[]
}
