export interface IExtractionSubmission {
    aliquot_string?: string;
    aliquots?: any;
    box?: number;
    rack?: number;
    row?: number;
    sample: number;
    spot?: number;
    inhibition_dna?: number;
    inhibition_rna?: number;
}
