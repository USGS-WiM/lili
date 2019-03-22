import { ISampleExtraction } from '../sample-extractions/sample-extraction';
import { IInhibition } from '../inhibitions/inhibition';
import { IReverseTranscription } from '../reverse-transcriptions/reverse-transcription';
import { ITarget } from '../targets/target';
import { IExtractionMethod } from "../extraction-batches/extraction-method";

export interface IExtractionBatch {
    id: number;
    analysis_batch: number;
    extraction_string: string;
    extraction_method: IExtractionMethod;
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
    ext_pos_dna_cq_value: number,
    ext_pos_gc_reaction: boolean,
    ext_pos_dna_invalid: boolean
}
