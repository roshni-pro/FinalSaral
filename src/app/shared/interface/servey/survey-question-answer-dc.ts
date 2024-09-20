import { SurveyQADList } from './survey-qadlist';

export interface SurveyQuestionAnswerDc {
    QuestionId: number;
    QueName: string;
    RightAnsId: number;
    isRequired: boolean;
    Point: number;
    Sequence: number;
    OptionCount: number;
    IsAnswerd: boolean;
    AnswerList: SurveyQADList[];
}
