export interface ISampleExtractionSubmission {
    aliquot_string?: string;
    aliquots?: any;
    box?: number;
    rack?: number;
    row?: number;
    sample: number;
    spot?: number;
    inhibition_dna?: number;
    inhibition_rna?: number;
    dna_dilution_factor?: number;
    rna_dilution_factor?: number;
}
