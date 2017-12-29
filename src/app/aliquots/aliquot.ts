import { IFreezerLocation } from './freezer-location';
export interface IAliquot {
    id: number;
    aliquot_string: string;
    sample: number;
    freezer_location: IFreezerLocation;
    aliquot_number: number;
    frozen: boolean;
    created_date: string;
    created_by: string;
    modified_date: string;
    modified_by: string;
}
