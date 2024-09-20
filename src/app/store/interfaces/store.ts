import { StoreBrandViewModel } from './store-brand';

export interface StoreViewModel {
    Id: number;
    Name: string;
    ImagePath: string;
    IsActive: boolean;
    IsDeleted: boolean | null;
    IsUniversal:boolean;
    BrandList: StoreBrandViewModel[];

    OwnerId: number| null;
}
