import { IInhibition } from '../inhibitions/inhibition';
import { IReverseTranscription } from '../reverse-transcriptions/reverse-transcription';

export interface ISampleExtraction {
    id: number
    sample: number,
    extraction_batch: number,
    inhibition: number,
    reverse_transcription: number,
    pcrreplicates: number[]
}
