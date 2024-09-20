

export interface MurliStory {
    Id: number;
    Title: string;
    ValidFrom: Date;
    ValidTo: Date;
    IsActive: boolean;
    IsPublished: boolean;
    Deleted: boolean;
    CreatedDate?: Date;
    CreatedBy?: number;
    UpdatedDate?: Date;
    UpdatedBy?: number;
    MurliStoryPageList: MurliStoryPage[];
}

export interface MurliStoryPage{
    Id: number;
    PageNumber: number;
    ImagePath: string;
    IsActive: boolean;
    Deleted: boolean;
    CreatedDate?: Date;
    CreatedBy?: number;
    UpdatedDate?: Date;
    UpdatedBy?: number;
    MurliStoryId?: number;
    IsPublished: boolean;
    PathToShowImage?: string;
}
