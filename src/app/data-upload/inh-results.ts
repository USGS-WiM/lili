import { IInhResult } from './inh-result';
export interface IInhResults {
    analysis_batch: number;
    extraction_number: number;
    nucleic_acid_type: number;
    inh_pos_cq_value: number;
    inhibitions: IInhResult[];
}

