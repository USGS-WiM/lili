import { IAliquot } from "../../aliquots/aliquot";
import { IExtractionMethod } from "../../extraction-batches/extraction-method";
import { ISampleExtractionSubmission } from "../../sample-extractions/sample-extraction-submission";

export interface Iabworksheet {
    isReprint: boolean;
    analysis_batch: number;
    creation_date: string;
    studies: Object[];
    str_studies?: string;
    description: string;
    extraction_no: number;
    extraction_date: string;
    extraction_method: IExtractionMethod;
    extraction_sample_volume: number;
    targetNames: string[];
    eluted_extraction_volume: number;
    reverse_extraction_no: number;
    rt_reaction_volume: number;
    rt_date: string;
    extraction_submission: ISampleExtractionSubmission[];
}




