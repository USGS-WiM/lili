import { ITargetResult } from './target-result';
export interface ITargetResults {
    target: number;
    analysis_batch: number;
    extraction_number: number;
    replicate_number: number;
    ext_neg_cq_value: number;
    ext_neg_concentration: number;
    rt_neg_cq_value: number;
    rt_neg_concentration: number;
    pcr_neg_cq_value: number;
    pcr_neg_concentration: number;
    pcr_pos_cq_value: number;
    pcr_pos_concentration: number;
    pcrreplicates: ITargetResult[];
}
