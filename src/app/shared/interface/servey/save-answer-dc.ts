export interface SaveAnswerDc {

    CustomerId: number;
    SurveyId: number;
    QueId: number;  // SurveyQuestion Id
    AnswerId: number;  //   SurveyQuestionAnswer Id   
    isRight: boolean;
    isComplete: boolean;
}
