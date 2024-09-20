import { SurveyQADList } from './survey-qadlist';

export interface SurveyQuestionAnswerData {
    QuestionId: number;
    QueName: string;
    RightAnsId: number;
    isRequired: boolean;
    Point: number;
    Sequence: number;
    OptionCount: number;
    AnswerList: SurveyQADList[];
}
