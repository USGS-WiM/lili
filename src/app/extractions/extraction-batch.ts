import { IExtraction } from './extraction';
import { IInhibition } from '../inhibitions/inhibition';
import { IReverseTranscription } from '../reverse-transcriptions/reverse-transcription';
import { ITarget } from '../targets/target';

export interface IExtractionBatch {
    id: number;
    extraction_method: number;
    reextraction_note: string;
    extraction_number: number;
    extraction_volume: number;
    extraction_date: string;
    extractions: IExtraction[];
    inhibitions: IInhibition[];
    reverse_transcriptions: IReverseTranscription[];
    targets: ITarget[]
}
