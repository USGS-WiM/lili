import { IExtraction } from './extraction';
import { IInhibition } from '../inhibitions/inhibition';
import { IReverseTranscription } from '../reverse-transcriptions/reverse-transcription';
import { ITarget } from '../targets/target';

export interface IExtractionBatch {
    id: number;
    analysis_batch: number;
    extraction_string: string;
    extraction_method: Object;
    reextraction: number;
    reextraction_note: string;
    extraction_number: number;
    extraction_volume: number;
    extraction_date: string;
    elution_volume: number;
    qpcr_template_volume: number;
    qpcr_reaction_volume: number;
    qpcr_date: string;
    extractions: IExtraction[];
    inhibitions: IInhibition[];
    reverse_transcriptions: IReverseTranscription[];
    targets: ITarget[]
}
