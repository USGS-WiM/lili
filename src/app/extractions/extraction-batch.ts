import { IExtraction } from './extraction';
import { IInhibition } from '../inhibitions/inhibition';
import { IReverseTranscription } from '../reverse-transcriptions/reverse-transcription';
import { ITarget } from '../targets/target';

export interface IExtractionBatch {
    id: number;
    extraction_string: string;
    extraction_method: Object;
    reextraction: number;
    reextraction_note: string;
    extraction_number: number;
    extraction_volume: number;
    extraction_date: string;
    elution_volume: number;
    extractions: IExtraction[];
    inhibitions: IInhibition[];
    reverse_transcriptions: IReverseTranscription[];
    targets: ITarget[]
}
