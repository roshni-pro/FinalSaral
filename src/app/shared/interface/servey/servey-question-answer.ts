export interface ServeyQuestionAnswer {
    WarehouseId: number;
    SurveyId: number;
    SurveyName:string;
    StartDate?:Date;
    EndDate?:Date;
    Publish: boolean;
    SQA:SQA[];
}

export interface SQA {
    QuestionId: number;
    QueName: string;
    RightAnsId: number;
    isRequired: boolean;
    Point: number;
    IsDeleted:boolean;
    Sequence: number;
    AnswerList: AnswerList[];
}

export interface AnswerList {
    Id:number;
    QuestionId: number;
    Answer: string;
    Sequence: number;
}


