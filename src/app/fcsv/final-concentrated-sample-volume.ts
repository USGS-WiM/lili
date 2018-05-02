export interface IFinalConcentratedSampleVolume {
    id: number;
    sample: number;
    concentration_type: number;
    concentration_type_string?: string;
    final_concentrated_sample_volume: string;
    notes: string;
    created_date?: string;
    created_by?: string;
    modified_date?: string;
    modified_by?: string;
}
