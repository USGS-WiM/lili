export interface IExtraction {
    id: number
    extraction_no: number,
    extraction_volume: number,
    elution_volume: number,
    extraction_method: number,
    reverse_transcriptions: Object,
    inhibitions: Object,
    targets: Object
}
