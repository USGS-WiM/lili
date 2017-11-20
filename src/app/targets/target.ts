export interface ITarget {
    id: number;
    name: string;
    code?: string;
    nucleic_acid_type: string;
    notes: string;
}

enum TypeEnum {
    RNA,
    DNA
}