import { IInhibition } from './inhibition';
import { IReverseTranscription } from './reverse-transcription';

export interface IExtraction {
    id: number
    extraction_no: number,
    extraction_volume: number,
    elution_volume: number,
    extraction_method: number,
    inhibitions: IInhibition[],
    reverse_transcriptions: IReverseTranscription[],
    targets: Object[]
}
