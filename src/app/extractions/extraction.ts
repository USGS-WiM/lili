import { IInhibition } from '../inhibitions/inhibition';
import { IReverseTranscription } from '../reverse-transcriptions/reverse-transcription';

export interface IExtraction {
    id: number
    extraction_no: number,
    extraction_volume: number,
    elution_volume: number,
    extraction_method: number,
    extraction_date: string,
    inhibitions: IInhibition[],
    reverse_transcriptions: IReverseTranscription[],
    targets: Object[]
}
