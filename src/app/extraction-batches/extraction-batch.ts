import { ISampleExtraction } from '../sample-extractions/sample-extraction';
import { IInhibition } from '../inhibitions/inhibition';
import { IReverseTranscription } from '../reverse-transcriptions/reverse-transcription';
import { ITarget } from '../targets/target';

export interface IExtractionBatch {
    id: number;
    analysis_batch: number;
    extraction_string: string;
    extraction_method: Object;
    re_extraction: number;
    re_extraction_notes: string;
    extraction_number: number;
    extraction_volume: number;
    extraction_date: string;
    elution_volume: number;
    qpcr_template_volume: number;
    qpcr_reaction_volume: number;
    qpcr_date: string;
    sampleextractions: ISampleExtraction[];
    inhibitions: IInhibition[];
    reverse_transcriptions: IReverseTranscription[];
    targets: ITarget[],
    ext_pos_cq_value: boolean,
    ext_pos_gc_reaction: boolean,
    ext_pos_invalid: boolean
}
