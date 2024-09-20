
import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { CustomerService } from 'app/shared/services/customer.service';
import { SelectItem, MessageService } from 'primeng/api';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { parse } from 'querystring';
import * as CryptoJS from 'crypto-js';
import { parseHttpResponse } from 'selenium-webdriver/http';
import { Survey } from 'app/shared/interface/servey/survey.GetSurvey';
import { WebViewServicesService } from 'app/shared/services/webView/web-view-services.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SaveAnswerDc } from 'app/shared/interface/servey/save-answer-dc';


@Component({
  selector: 'app-webviewapp',
  templateUrl: './webviewapp.component.html',
  styleUrls: ['./webviewapp.component.scss']
})
export class WebviewappComponent implements OnInit {

  customerid: number;
  lang: string;
  wid: number;
  destroyed: any;
  surveyData: any;
  survey: Survey;
  answeredValue: any;
  questionToShow: any;
  SelectedAnswer: number;
  saveAnswerDc: SaveAnswerDc;
  showQuestions: boolean;
  commingSoonScreen: boolean;
  dontshowQuestions: boolean;
  blocked: boolean;
  stoprefresh: boolean;
  stoploop: number;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private webViewServicesService: WebViewServicesService,
    private messageService: MessageService) {
    this.surveyData = {};
    this.questionToShow = {};

  }

  ngOnInit() {
    

    this.stoploop = undefined;
    this.stoprefresh = false;

    this.SelectedAnswer = -1;
    this.answeredValue = 0;

    this.survey = {
      CustomerId: 0,
      Language: '',
      WarehouseId: 0
    };

    this.saveAnswerDc = {
      AnswerId: 0,
      CustomerId: 0,
      QueId: 0,
      SurveyId: 0,
      isComplete: false,
      isRight: false,
    }
    this.onInitialize();
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this.onInitialize();
    });

  }


  onInitialize() {

    this.blocked = true;
    this.customerid = Number(this.route.snapshot.paramMap.get("customerid"));
    this.lang = this.route.snapshot.paramMap.get("lang");
    this.wid = Number(this.route.snapshot.paramMap.get("wid"));


    if (this.customerid && this.wid) {
      this.survey.CustomerId = this.customerid;
      this.survey.WarehouseId = this.wid;
      this.survey.Language = this.lang;
      console.log('thissurvey', this.survey)

      this.webViewServicesService.GetSurvey(this.survey).subscribe(result => {
        
        this.surveyData = result;
        console.log(' this.surveyData ', this.surveyData)
        if (this.surveyData == null) {
          this.commingSoonScreen = true;
          this.blocked = false;
          return;
        }

        if (this.surveyData.AnsweredCount == this.surveyData.QuestionCount) {
          this.answeredValue = (this.surveyData.AnsweredCount / this.surveyData.QuestionCount) * 100;
          this.saveAnswerDc.isComplete = true;
          this.dontshowQuestions = true;
          this.showQuestions = false;
          this.stoprefresh = true;
          this.saveAnswerDc.CustomerId = this.survey.CustomerId;
          this.saveAnswerDc.SurveyId = this.surveyData.SurveyId;

          if (this.stoploop == undefined) {

            this.stoploop = 1;
          }

          if (this.stoploop == 1) {

            this.sendAnswerv1(this.saveAnswerDc);
            return;
          }

        }
        else {

          this.showQuestions = true;
          this.answeredValue = (this.surveyData.AnsweredCount / this.surveyData.QuestionCount) * 100;
          if (this.surveyData.QuestionCount > this.surveyData.AnsweredCount) {
            var a = this.surveyData.SQA.filter(x => x.IsAnswerd == false);
            this.questionToShow = a[0];
            console.log('this.questionToShow', this.questionToShow)
            this.saveAnswerDc.isComplete = false;

          }
        }




        this.blocked = false;
      });
    }

  }
  

  onSubmit(Answer: number) {

    this.blocked = true;
    if (Answer == this.questionToShow.RightAnsId) {
      this.messageService.add({ severity: 'success', summary: 'Correct Answer!', detail: '' });
      this.saveAnswerDc.isRight = true;
      this.saveAnswerDc.AnswerId = Answer;
    }
    if (Answer !== this.questionToShow.RightAnsId) {
      this.messageService.add({ severity: 'error', summary: 'InCorrect Answer!', detail: '' });
      this.saveAnswerDc.isRight = false;
      this.saveAnswerDc.AnswerId = Answer;

    }

    this.saveAnswerDc.CustomerId = this.survey.CustomerId;

    this.saveAnswerDc.QueId = this.questionToShow.QuestionId;
    this.saveAnswerDc.SurveyId = this.surveyData.SurveyId;

    this.sendAnswer(this.saveAnswerDc);



  }

  sendAnswer(saveAnswerDc) {


    this.webViewServicesService.SaveAnswer(saveAnswerDc).subscribe(result => {
      var a = result;
      this.blocked = false;
      if (this.stoprefresh == false) {
        this.ngOnInit();
      }
    });
  }

  sendAnswerv1(saveAnswerDc) {


    if (this.stoploop == 1) {
      this.webViewServicesService.SaveAnswer(saveAnswerDc).subscribe(result => {
        var a = result;
        this.blocked = false;
        this.stoploop = this.stoploop + this.stoploop;
        this.onInitialize();
      });


    }


  }
}
