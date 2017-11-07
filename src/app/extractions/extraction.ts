import { IInhibition } from '../inhibitions/inhibition';
import { IReverseTranscription } from '../reverse-transcriptions/reverse-transcription';

export interface IExtraction {
    id: number
    sample: number,
    extraction_batch: number,
    inhibition: number,
    reverse_transcription: number,
    pcrreplicates: number[]
}
