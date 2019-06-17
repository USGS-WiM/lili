export interface IReverseTranscription {
    id?: number;
    rt_no?: number;
    extraction_id?: number;
    template_volume?: number;
    reaction_volume?: number;
    rt_cq?: number;
    rt_date?: string;
    ext_pos_rna_rt_cq_value?: number;
    // re_rt: number;
    // re_rt_notes: string;
    created_date?: string;
    created_by?: string;
    modified_date?: string;
    modified_by?: string;
}
