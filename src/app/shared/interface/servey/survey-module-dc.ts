import { SurveyQuestionAnswerDc } from './survey-question-answer-dc';

export interface SurveyModuleDC {
    SurveyId: number;
    SurveyName: string;
    WarehouseId: number;
    WarehouseName: string;
    StartDate: Date | string | null;
    EndDate: Date | string | null;
    QuestionCount: number;
    AnsweredCount: number;
    PointsEarned: number;
    CorrectAnswerCount: number;
    SQA: SurveyQuestionAnswerDc[];

}
