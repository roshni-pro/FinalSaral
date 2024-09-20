import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkBuisnessLoanService {

  apiURL: string;
  constructor(private http: HttpClient) { this.apiURL = environment.apiURL; }

  // IsLeadGenerateBtnEnable(leadid:any): Observable<any> {
  //   return this.http.get<any>(this.apiURL + '/api/ArthMate/LeadActivityProgressStatus?LeadMasterId='+leadid);
  // }

  AddBenBankDetail(AddBenBankDetail:any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/ArthMate/AddBenBankDetail',AddBenBankDetail);
  }


  UploadStatement(formData): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/ArthMate/UploadStatement',formData);
  }

  AddBankStatement(bankstatementDc:any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/ArthMate/AddBankStatement',bankstatementDc);
  }

  DeleteBankStatementById(BankStatementId:any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ArthMate/DeleteBankStatementById?BankStatementId='+BankStatementId);
  }
  GetleadHistory(leadid:any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ArthMate/LeadActivityProgressesHistory?Leadmasterid='+leadid);
  }
  GetLoanByLoanId(leadid:any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ArthMate/GetLoanByLoanId?Leadmasterid='+leadid);
  }
  CompositeDisbursement(leadid:any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ArthMate/GetDisbursement?Leadmasterid='+leadid);
  }
  GetLeadOfferdata(leadid:any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ArthMate/GetActivityResponse?LeadMasterId='+leadid);
  }
  kycstausApprove(leadid:any,status): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ArthMate/ChangeLoanStatus/'+leadid+'?Status='+status);
  }
  LoanNachUmrn(leadid:any,umrn:any): Observable<any> {
    var obj={}
    return this.http.post<any>(this.apiURL + '/api/ArthMate/LoanNach?UMRN='+umrn+'&LeadMasterId='+leadid,obj);
  }
  SLAdocumentUpload(leadid:any,file:any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/ArthMate/UploadSignedSla?Leadmasterid='+leadid,file);
  }
  offerInformation(leadid:any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ArthMate/GetLoan?LeadMasterId='+leadid);
  }

  RepaymentScheduleData(leadid:any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ArthMate/LoanRepaymentScheduleDetails/'+leadid);
  }
  leadPageData(keyword,stardate,enddate,skip,take): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ArthMate/LeadPageData?keyword='+keyword + '&stardate=' + stardate + '&enddate=' + enddate + '&skip=' + skip + '&take=' + take);
  }
  getLeadDetailsData(leadid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ArthMate/GetLeadDetailsData?leadid='+leadid);
  }
  getCustomerPageData(leadid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ArthMate/GetCustomerPageData?LeadId='+leadid);
  }
  getSequence(LeadMasterId: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ArthMate/GetSequence?LeadMasterId='+LeadMasterId);
  }
  uploadPANorAadhar(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.apiURL + '/api/ArthMate/UploadKYC', formData);
  }
  uploadOtherDoc(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.apiURL + '/api/ArthMate/UploadOtherDoc', formData);
  }
  postLead(leadid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ArthMate/PostLead?LeadMasterId='+leadid);
  }
  verifyUploadedDocument(Dc): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/ArthMate/VerifyUploadedDocument',Dc);
  }

  getVerifiedDocumentStatus(SequenceNo,LeadmasterId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ArthMate/GetVerifiedDocumentStatus?SequenceNo='+SequenceNo + '&LeadmasterId=' + LeadmasterId);
  }
  getLeadBackgroundRuns(leadid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ArthMate/GetLeadBackgroundRuns?LeadMasterId='+leadid);
  }
  postRetryApi(RetryApiDc): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/ArthMate/PostRetryApi',RetryApiDc);
  }
  docPostArthmate(LeadMasterId,DocName): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ArthMate/ArthmatePostDoc?LeadMasterId='+ LeadMasterId + '&DocName=' + DocName);
  }
  updateDocument(DocName,LeadmasterId,FrontFileUrl,BackFileUrl): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ArthMate/UpdateDocument?DocumentName='+ DocName + '&LeadmasterId=' + LeadmasterId + '&FrontFileUrl=' + FrontFileUrl + '&BackFileUrl=' + BackFileUrl);
  }  
  requestAScoreAPI(leadid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ArthMate/RequestAScoreAPI?LeadMasterId='+leadid);
  }
  ceplrPdfReports(leadid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ArthMate/CeplrPdfReports?LeadMasterId='+leadid);
  }
  coLenderSelectorAPI(leadid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ArthMate/CoLenderSelectorAPI?LeadMasterId='+leadid);
  }
  testAScoreWebhookResponse(leadid): Observable<any> {
    return this.http.post<any>(this.apiURL + '/Webhook/TestAScoreWebhookResponse?LeadMasterId='+leadid,null);
  }
  
  getNoActivityDocList(leadid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ArthMate/GetNoActivityDocList?LeadMasterId='+leadid);
  }
  
  getLoanDetail(leadid):Observable<any>{
    return this.http.get<any>(this.apiURL + '/api/ArthMate/GetLoanDetail/'+leadid);
  }
  GetArthmateRepaymentUpload():Observable<any>{
    return this.http.get<any>(this.apiURL + '/api/ArthMate/GetArthmateRepaymentUpload');
  }

  AddArthmateRepaymentUpload(formData:FormData):Observable<any>{
    return this.http.post<any>(this.apiURL + '/api/ArthMate/AddArthmateRepaymentUpload',formData);
  }
  ExportSkBuissness(keyword,startdate,enddate)
  {
    return this.http.get<any>(this.apiURL + '/api/ArthMate/LeadPageDataExport?keyword='+keyword+'&stardate='+startdate+'&enddate='+enddate);
  }
}
