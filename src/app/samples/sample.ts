import { IAliquot } from '../aliquots/aliquot';
export interface ISample {
    id: number;
    sample_type: Object;
    matrix: Object;
    filter_type: Object;
    study: Object;
    study_site_name: string;
    collaborator_sample_id: string;
    sampler_name:  Object;
    sample_notes: string;
    sample_description: string;
    arrival_date: string;
    arrival_notes: string;
    collection_start_date: string;
    collection_start_time: string;
    collection_end_date: string;
    collection_end_time: string;
    meter_reading_initial: number;
    meter_reading_final: number;
    meter_reading_unit: number;
    total_volume_sampled_initial: number;
    total_volume_sampled_unit_initial: number;
    total_volume_or_mass_sampled: number;
    sample_volume_initial: number;
    sample_volume_filtered: number;
    filter_born_on_date: string;
    filter_flag: boolean;
    secondary_concentration_flag: boolean;
    elution_notes: string;
    technician_initials: string;
    dissolution_volume: number;
    post_dilution_volume: number;
    analysisbatches: number[];
    samplegroups: number[];
    record_type: number;
    peg_neg: number;
    final_concentrated_sample_volume: number;
    final_concentrated_sample_volume_type: number;
    final_concentrated_sample_volume_notes: string;
    aliquots: IAliquot[];
    created_date: string;
    created_by: string;
    modified_date: string;
    modified_by: string;
}
