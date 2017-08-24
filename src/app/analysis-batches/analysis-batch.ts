export interface IAnalysisBatch {
    id: number,
    analysis_batch_description: string,
    samples: Object,
    peg_negs: Object,
    studies: Object,
    insert_date: string,
    insert_user:string,
    update_date: string,
    update_user:string
}
