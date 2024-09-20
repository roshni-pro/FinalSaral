import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { IrOutstandingPayment } from '../interface/supplier/ir-outstanding-payment';
import {AddNewSupplier} from '../interface/supplier/addnewsupplier'
@Injectable({
  providedIn: 'root'
})

export class SupplierService {

  apiURL: string;
  // PeopleAll:any;
  User: any;



  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  GetSupplierData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Suppliers/GetSupplierData');
  }

  GetAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Suppliers');
  }
  getSupplierList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Suppliers/GetSupplierList');
  }
  getSupplierSearchdata(searchdata): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Suppliers/GetSuppliercityWiseAndbrand?cityid=' + searchdata.Cityid + "&SubCaegoryId=" + searchdata.SubCaegoryId);
  }
  GetAllBrands(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Suppliers');
  }
  PutSupplier(Supplier): Observable<any[]> {
    return this.http.put<any[]>(this.apiURL + '/api/Suppliers/PutSupp', Supplier);
  }

  PostSupplier(Supplier): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Suppliers', Supplier);
  }

  DeleteSupplier(SupplierId): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/Suppliers?ID=' + SupplierId);
  }
  GetByID(ID): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Suppliers?ID=' + ID);
  }

  GetBuyer(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Suppliers/GetBuyer');
  }

  GetDepoData(depoId): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Suppliers/GetDepoData?ID=' + depoId);
  }
  GetSupplierCategory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SupplierCategory');
  }

  GetSupplierChat(id, PurchaseId): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Suppliers/GetChatForSupplier?SupplierId=' + id + '&PurchaseId=' + PurchaseId);
  }

  GetSupplierChatThreads(id): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Suppliers/GetChatForSupplierPOidA7?SupplierId=' + id);
  }

  sendMessage(msg): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Suppliers/PostChatFromSupplierBack', msg);
  }

  getByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SupplierLedger/GetByName/name/' + name);
  }
  UploadExcel(formData: FormData) {
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const httpOptions = { headers: headers };

    return this.http.post(this.apiURL + '/api/SupplierLedger/UploadExcel', formData, httpOptions)
  }

  getGuid(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SupplierLedger/GetGUID');
  }

  getBySupplierName(name: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SupplierLedger/GetBySupplierName/name/' + name);
  }

  search(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/SupplierLedger/Search', data);
  }

  GetManualLadger(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SupplierLedger/GetManualLadger');
  }

  UpdateManualLadger(data): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/SupplierLedger/UpdateManualLadger', data);
  }

  DeleteManualLadger(id): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/SupplierLedger/DeleteManualLadger?id=' + id);
  }

  GetPOIDforSuppllierId(supplierId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Suppliers/GetPoId?supplierId=' + supplierId);
  }
  Addpaymentdata(advancepayment): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/Suppliers/addSupplierPayment', advancepayment);
  }
  GetPaymentRequestData(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Suppliers/GetSupplierPaymentDetails');

  }
  ApprovedSupplierPayment(supplierpaymentdata): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/Suppliers/approvedSupplierPaymentDetails', supplierpaymentdata);
  }
  RejectSupplierPayment(supplierpaymentdata): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/Suppliers/approvedSupplierPaymentDetails', supplierpaymentdata);
  }
  PaySupplierPayment(supplierpaymentdata): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/Suppliers/paySupplierPaymentDetails', supplierpaymentdata);
  }
  serachladgerdata(supllierdata): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Suppliers/SupplierOutstandingamt/?SupplierId= ' + supllierdata.SupplierId + '&tilldate=' + supllierdata.TillDate);
  }

  serachIRData(supplierId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Suppliers/SupplierIRList/?SupplierId= ' + supplierId);
  }
  GetBank(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SupplierLedger/SupplierBankList');
  }
  postIrdetails(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Suppliers/PayemntIRDetails', data);
  }

  uploadPayemntList(data: any[]): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/Suppliers/UploadPayemntList', data);
  }

  UploadPayemntListOnly(data: any[]): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/Suppliers/UploadPayemntListOnly', data);
  }

  paymentIRData(supplierId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SupplierLedger/SupplierPaymentdetails/?SupplierId= ' + supplierId);
  }
  getDepot(id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Suppliers/GetDepo?id=' + id);
  }
  getIrpaymentdetails(vm: any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/SupplierLedger/GetSupplierPaymentdetails', vm);

  }
  getoutstandingdetails(vm: any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/SupplierLedger/GetSupplierOutstandingamount', vm);

  }

  GetHistorydata(id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SupplierLedger/GetHistorydata?IRPaymentdetailsId=' + id);
  }
  deletePayemntRecord(data): Observable<any> {

    return this.http.post<any>(this.apiURL + '/api/Suppliers/DeleteIRPaymentDetail/' + data, null);
  }

  makeIRPayment(payment: IrOutstandingPayment): Observable<IrOutstandingPayment> {

    return this.http.post<IrOutstandingPayment>(this.apiURL + '/api/Suppliers/MakeIRPayment', payment);
  }
  makeIRPaymentRequest(payment: IrOutstandingPayment): Observable<IrOutstandingPayment> {

    return this.http.post<IrOutstandingPayment>(this.apiURL + '/api/Suppliers/MakeIRPaymentRequest', payment);
  }

  updateIRPayment(paymentList: any[]): Observable<boolean> {

    return this.http.post<boolean>(this.apiURL + '/api/Suppliers/UpdateIRPayment', paymentList);
  }

  SearchPayment(start, End, SupplierId): Observable<boolean> {
    return this.http.get<boolean>(this.apiURL + '/api/Suppliers/SearchPayment?start= ' + start + '&End=' + End + '&SupplierId=' + SupplierId);
  }

  GetChatForSupplierDateWise(SupplierId, FromDate): Observable<boolean> {
    return this.http.get<boolean>(this.apiURL + '/api/Suppliers/GetChatForSupplierDateWise?SupplierId= ' + SupplierId + '&FromDate=' + FromDate);
  }
  GetSupplierChatCurrentDateWise(SupplierId): Observable<boolean> {
    return this.http.get<boolean>(this.apiURL + '/api/Suppliers/GetSupplierChat?SupplierId= ' + SupplierId);
  }

  GetGDNMaster(POId,GDNNo,FromDate,ToDate) {
    return this.http.get<any>(this.apiURL + '/api/GDNMaster/GetGDNMasters?POId='+POId+ '&GDNNumber='+GDNNo+'&startDate='+FromDate+'&EndDate='+ToDate)
  }

  GetGDNDetail(GDNId) {
    return this.http.get<any>(this.apiURL + '/api/GDNMaster/GetGDNDetail?GDNId='+ GDNId)
  }
  GetGDNDetaillist(GDNId) {
    return this.http.get<any>(this.apiURL + '/api/GDNMaster/GetGDNdetailsV7?GDNId='+ GDNId)
  }

  UpdateGDNDetail(obj) {
    return this.http.post<any>(this.apiURL + '/api/GDNMaster/UpdateGDNDetail', obj)
  }
  GetGoodDescripancyNote(POId) {
    return this.http.get<any>(this.apiURL + '/api/GDNMaster/GetGoodDescripancyNote?PurchaseOrderId='+ POId)
  }
  GetOtp(otp){
    return this.http.get<any>(this.apiURL+'/api/GDNMaster/VeryfyOtp?OTP='+otp)
  }
  SendSupplire(PurchaseOrderId, WhName, SupplierId,GDNId){
    return this.http.get<any>(this.apiURL+'/api/GDNMaster/SendToSupplire?PurchaseOrderId='+PurchaseOrderId+'&WhName='+WhName+'&SupplierId='+SupplierId+'&GDNId='+GDNId)
  }
  CancelGDN(comment,gdNid) {
    return this.http.get<any>(this.apiURL + '/api/GDNMaster/BuyerCancel?GDNId='+ gdNid + '&comment='+comment);
  }

  PostNewSupplier(addsupplier:AddNewSupplier){
    return this.http.post<AddNewSupplier>(this.apiURL + '/api/Suppliers/AddSupplier/V7', addsupplier);
  }

  GetSupplierList(status:string,k ,s, t){
    return this.http.get<any>(this.apiURL + '/api/Suppliers/SupplierOnboardList/V7?status='+status + '&KeyWord='+ k + '&skip='+ s +'&take='+ t ) ;
  }

  GetSupplierById(id:number,supplierid){
    return this.http.get<any>(this.apiURL +'/api/Suppliers/GetSupplierByid/V7?id='+id +'&supplierid='+supplierid);
  }
  GetSupplierBySupplierId(id:number){
    return this.http.get<any>(this.apiURL + '/api/Suppliers/GetSupplierBySupplierid/V7?id='+id);
  }
  
  UploadSupplierDoc(ImageUrl){
    return this.http.post<any>(this.apiURL + '/api/Suppliers/DocumentImageUpload',ImageUrl);
  }

  UploadSupplierDocMulti(ImageUrl) {
    return this.http.post<any>(this.apiURL + '/api/Suppliers/DocumentImageUploadMulti', ImageUrl);
  }

  postFile(formData): Observable<any> {
    
    return this.http.post<any>(this.apiURL + '/api/Suppliers/DocumentImageUploadMulti', formData)
     
}

  getSellingBrands(){
    return this.http.get<any>(this.apiURL + '/api/Suppliers/getBrandwithcategoryname');
  } 

  editsupplier(editeddata:AddNewSupplier){
    return this.http.post<any>(this.apiURL + '/api/Suppliers/EditSupplierTemp/V7',editeddata);

  }

  getSupplierhistory(supplierId:number, skcode:string){
    return this.http.get<any>(this.apiURL + '/api/Suppliers/SupplierOnboardHisotry/V7?supplierID='+ supplierId +'&SupplierCode='+ skcode);

  }

  getDepotList(status:string,k,s,t){
    return this.http.get<any>(this.apiURL + '/api/Suppliers/DepoOnboardList/V7?status=' + status+ '&KeyWord='+ k + '&skip='+ s +'&take='+ t );
    

  }

  getDepotListBySupID(SupplierId:number){
    return this.http.get<any>(this.apiURL + '/api/Suppliers/DepoOnboardListBySupplierID/V7?SupplierId=' + SupplierId);
  }

  getDepoByDepoId(depoId:number,depid:number){
    // 
    return this.http.get<any>(this.apiURL + '/api/Suppliers/GetDepoOnboardByid/V7?id=' + depoId + '&DepId='+depid);

  }
  editGetAllBrands(supplierid): Observable<any[]> {
    
    return this.http.get<any[]>(this.apiURL + '/api/Suppliers/GetBrandEditSupplier?SupplierId='+supplierid);
  }
  GetSupplierPaymentAcknowledgement(obj) {
    return this.http.post<any>(this.apiURL + '/api/Suppliers/SupplierPaymentAcknowledgement', obj)
  }
  CheckVerifiedSuppierGSTNO(gstinno:string):Observable<any>{
    return this.http.get<any>(this.apiURL+'/api/SupplierApp/suppliergstverify?GstNo='+gstinno)
  }
  CheckValidationforSupplierCustomer(data:string,fieldname:string,type:string){
    return this.http.get<any>(this.apiURL + '/api/Suppliers/CheckFieldForSupplierAndCustomer?data='+data+'&fieldname='+fieldname+'&type='+type);
  }

  exportsupplierlist(status:string, keyword:string):Observable<any>{
    
    return this.http.post<any>(this.apiURL + '/api/Suppliers/ExportSupplierList?status='+ status +'&keyword='+keyword,status);
  }
  exportfullsupplierlist():Observable<any>{
    return this.http.get<any>(this.apiURL+'/api/Suppliers/ExportFullSupplierList');
  }
  // Supplier /Retailer Cross Buying
  SupplierRetailerGet(type,skip,take)
  {
    return this.http.get<any>(this.apiURL+'/api/Suppliers/SupplierRetailerGet?Type='+type+'&Skip='+skip+'&Take='+take);
  }
  SupplierRetailerDeleteAllByMasterId(Id,type)
  {
    return this.http.get<any>(this.apiURL+'/api/Suppliers/SupplierRetailerDeleteAllByMasterId?MasterId='+Id+'&Type='+type);
  }
  SupplierRetailerSupplierSearch(key)
  {
    debugger
    return this.http.get<any>(this.apiURL+'/api/Suppliers/SupplierRetailerSupplierSearch?key='+key);
  }
  SupplierRetailerAdd(obj)
  {
    return this.http.post<any>(this.apiURL+'/api/Suppliers/SupplierRetailerAdd',obj);
  }
  
SupplierRetailerDataByMasterId(Id,type){
  return this.http.get<any>(this.apiURL+'/api/Suppliers/SupplierRetailerDataByMasterId?MasterId='+Id+'&Type='+type);
}
SupplierRetailerDeleteById(Id){
  return this.http.get<any>(this.apiURL+'/api/Suppliers/SupplierRetailerDeleteById?Id='+Id);
}
CustomerRetailerSupplierSearch(key)
  {
    debugger
    return this.http.get<any>(this.apiURL+'/api/Suppliers/SupplierRetailerCustomerSearch?key='+key);
  }
  SupplierRetailerAddNew(obj){
    return this.http.post<any>(this.apiURL+'/api/Suppliers/SupplierRetailerAddNew',obj);
  }
  SupplierRetailerSpecificSearch(Type,Code,skip,take){
    return this.http.get<any>(this.apiURL+'/api/Suppliers/SupplierRetailerSpecificSearch?Type='+Type+'&Code='+Code+'&Skip='+skip+'&Take='+take);
  }
  SupplierPaymentAcknowledgementMail(obj) {
    return this.http.post<any>(this.apiURL + '/api/Suppliers/SupplierPaymentAcknowledgementMail', obj)
  }

  hello(obj) {
    return this.http.post<any>(this.apiURL + '/api/Suppliers/SuppllierExcel', obj)
  }
  removeUploadedDocuments(id){
    return this.http.get<any>(this.apiURL+'/api/Suppliers/RemoveSupplierDocument?Id='+id);
  }

  RemoveDepoDocument(id){
    return this.http.get<any>(this.apiURL +'/api/Suppliers/RemoveDepoDocument?Id='+id);
  }
  SuppLastPoFirstGrDate(supplierid){
    return this.http.get<any>(this.apiURL +'/api/Suppliers/SuppLastPoFirstGrDate?supplierid='+supplierid);
  }
}
