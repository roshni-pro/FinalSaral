import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetItemOrdersList ,CompletedPickerDispatch,EditPickerorderQty, GetPendingOrderFilterDc,PickerRTDOrderDC} from 'app/shared/interface/picker/picker';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PickerService {
  apiURL: string;  
  User:any;
  comment : string;
 
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  
  GetAllWarehouse():  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Warehouse/getSpecificWarehouses');
  } //old api for warehouse --simran

  GetAllWarehouseNew():  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DeliveyMapping/GetWarehouseIsCommon');
  }

  GetAllClusterViaMultipleWareID (Data:any):Observable<any>
  {
    return this.http.post<any>(this.apiURL+'api/Masters/Clusters',Data);      // https://uat.shopkirana.in//api/Masters/Clusters
  }
  GetRejectedPickerList(Data:any):Observable<any>
  {
    return this.http.post<any>(this.apiURL+'/api/Picker/GetRejectedPickerList',Data);     // http://localhost:26265/api/Picker/GetRejectedPickerList
  }

  rejectedPickerdetail(PickerId:number):Observable<any>
  {
    return this.http.get<any>(this.apiURL+'/api/Picker/rejectedPickerdetail?pickerId='+PickerId); //   http://localhost:26265/api/Picker/rejectedPickerdetail
  }

  rejectedPickerdetailList(PickerId:number):Observable<any>
  {
    return this.http.get<any>(this.apiURL+'/api/Picker/rejectedPickerdetailList?pickerNo='+PickerId); //   http://localhost:26265/api/Picker/rejectedPickerdetailList
  }

  RejectedPickerReportList(Data:any):Observable<any>
  {
    return this.http.post<any>(this.apiURL+'/api/Picker/RejectedPickerReportList',Data)
  }
  rejectedPickerReportExport(Data:any):Observable<any>
  {
    return this.http.post<any>(this.apiURL+'/api/Picker/rejectedPickerReportExport',Data)
  }

  GetAllCluster(WarehouseId):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/cluster/hubwise?WarehouseId='+ WarehouseId);
  }
  GetAllOrderPicker(getPendingOrderFilterDc : GetPendingOrderFilterDc):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Picker/GetPendingOrders', getPendingOrderFilterDc);
  }
  GetAllOrderByIdPicker(getPendingOrderFilterDc : GetPendingOrderFilterDc):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Picker/GetPendingOrdersById', getPendingOrderFilterDc);
  }

  GetItemOrders(GetItemOrdersList : GetItemOrdersList):  Observable<any> {
    
    return this.http.post<any[]>(this.apiURL + '/api/Picker/GetItemOrdersDetail',GetItemOrdersList);   
  }
  
  GetItemOrder(OrderId : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderMaster?id='+OrderId);

    // return this.http.get<any>(this.apiURL + '/api/Picker/GetItemOrders?OrderId='+OrderId);   
  }
  GetItemOrder1(OrderId : number,OrderType : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DamageOrderMaster?id='+OrderId + '&OrderType=' +OrderType);

    // return this.http.get<any>(this.apiURL + '/api/Picker/GetItemOrders?OrderId='+OrderId);   
  }
  GetExportRowData(warehouseId,itemId):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CurrentNetStock/CurrentDelieveryCancel?WarehouseId='+ warehouseId +'&ItemMultiMrpId='+itemId);

    // return this.http.get<any>(this.apiURL + '/api/Picker/GetItemOrders?OrderId='+OrderId);   
  }
  GetStockData(OrderId : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DamageOrderMaster/GetStock?id='+OrderId);

    // return this.http.get<any>(this.apiURL + '/api/Picker/GetItemOrders?OrderId='+OrderId);   
  }
  GetAvgData(warehouseid,itemmulid : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CurrentNetStock/GetAllAveraginglist?warehouseId='+warehouseid+'&itemMultiMRPId=4'+itemmulid);

    // return this.http.get<any>(this.apiURL + '/api/Picker/GetItemOrders?OrderId='+OrderId);   
  }
  GetOrderData(OrderId : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderMaster?id='+OrderId);

    // return this.http.get<any>(this.apiURL + '/api/Picker/GetItemOrders?OrderId='+OrderId);   
  }
  GetOrderDispatched(OrderId : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderDispatchedMaster?id='+OrderId);   
  }
  GetOrderDispatchedDetails(OrderId : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderDispatchedDetails?id='+OrderId);   
  }
  GetOrderDispatchedMaster(OrderId : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderDispatchedMasterFinal?id='+OrderId);   
  }
  
  GetOrderDispatchedDeatilsReturn(OrderId : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderDispatchedDetailsReturn?id='+OrderId);   
  }
  GetSKFree(OrderId : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/freeitem/SkFree?oderid='+OrderId);   
  }
  GetOfferItem(OrderId : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/offer/GetOfferItem?oderid='+OrderId);   
  }
  GetWarehouse(Id : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Warehouse?id='+Id);   
  }
  
  DboyData(OrderId : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DeliveryBoy/WarehousebasedDeliveryBoyRole?WarehouseId='+OrderId);  
  }
  DispatchMaster(OrderId : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderDispatchedMaster?id='+OrderId);  
  }
  DispatchReturn(OrderId : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/OrderDispatchedDetailsReturn?id='+OrderId);  
  }
  DispatchMasterFinal(OrderId : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderDispatchedMasterFinal?id='+OrderId);  
  }
  DispatchDetails(OrderId : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderDispatchedDetails?id='+OrderId);  
  }
  skfree(OrderId : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/freeitem/SkFree?oderid='+OrderId);  
  }
  GetPaymentData(OrderId : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderMastersAPI/Getpaymentstatus?OrderId='+OrderId);

    // return this.http.get<any>(this.apiURL + '/api/Picker/GetItemOrders?OrderId='+OrderId);   
  }
  GetDisHistoryData(OrderId : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderMaster/orderhistory?orderId='+OrderId);

    // return this.http.get<any>(this.apiURL + '/api/Picker/GetItemOrders?OrderId='+OrderId);   
  }
  GetItemHistoryData(OrderId : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/OrderMaster/OfferCode?OfferCode='+OrderId);

    // return this.http.get<any>(this.apiURL + '/api/Picker/GetItemOrders?OrderId='+OrderId);   
  }
  GetViewHistoryData(entityName,OrderId : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/History?entityName='+ entityName+'&entityId='+OrderId);

    // return this.http.get<any>(this.apiURL + '/api/Picker/GetItemOrders?OrderId='+OrderId);   
  }
  
  GetHistoryData(entityName,OrderId : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/History?entityName='+ entityName+'&entityId='+OrderId);

    // return this.http.get<any>(this.apiURL + '/api/Picker/GetItemOrders?OrderId='+OrderId);   
  }
  PostData(data):  Observable<any> {
    
    return this.http.post<any[]>(this.apiURL + '/api/damagestock/damage',data);   
  }
  PostRebookData(data):  Observable<any> {
    
    return this.http.post<any[]>(this.apiURL + '/api/OrderMaster/RebookOrder',data);   
  }
  SaveOrderData(data): Observable<any> {
  
    return this.http.put<any>(this.apiURL + '/api/OrderMaster', data);
  }

  GetOrderHistory(OrderId : number,itemno,wareshouseid,page):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/damagestock/GetDamageHistory?ItemNumber='+itemno +'&list=20&page='+ page + '&WarehouseId='+ wareshouseid +'&StockId='+OrderId);
  
  }
  
  PostOrderPickerMasters(GetItemOrdersList : GetItemOrdersList):  Observable<any> {
    
    return this.http.post<any[]>(this.apiURL + '/api/Picker/PostOrderPickerMasters',GetItemOrdersList);
   
  }
  GetpickerofWarehouse(WarehouseId):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Picker/GetpickerofWarehouse?WarehouseId='+WarehouseId);
  }

  // OrderPickerView

  GetItemOrdersForView(ClusterId : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Picker/GetItemOrdersForView?ClusterId='+ClusterId);
  }
  ShowPickerListsA7(ClusterId, IsComplted):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Picker/ShowPickerListA7?ClusterId='+ClusterId + ' ' + '&IsComplete=' + IsComplted);
  }

  ShowPickerListA7(ClusterId, WarehouseId, IsComplted,skip,take):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Picker/ShowPickerListA7?ClusterId='+ClusterId + ' ' + '&WarehouseId=' + WarehouseId + '&IsComplete=' + IsComplted + '&skip=' + skip + '&take=' + take);
  }
  getOrderPickerMasterList(ClusterId, WarehouseId, IsComplted,skip,take):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Picker/GetOrderPickerMasterList?ClusterId='+ClusterId + ' ' + '&WarehouseId=' + WarehouseId + '&status=' + IsComplted + '&skip=' + skip + '&take=' + take);
  }
  getOrderPickerDetailsByOrderPickerMasterId(OrderPickerMasterId, WarehouseId):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Picker/GetOrderPickerDetailsByOrderPickerMasterId?OrderPickerMasterId='+OrderPickerMasterId + ' ' + '&WarehouseId=' + WarehouseId);
  }

  GetReadyPickedOrdersA7(ClusterId : number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Picker/GetReadyPickedOrdersA7?ClusterId='+ClusterId);
  }
  RejectPickerList(id : number, commnet : string):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Picker/RejectPickerList?id='+id + '&commnet=' + commnet);
  }

  AcceptPickerList(id : number, commnet : string):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Picker/AcceptPickerList?id='+id + '&commnet=' + commnet);
  }
  
  PostPickerJobListToDispatch(CompletedPickerDispatch : CompletedPickerDispatch):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Picker/PostPickerJobListToDispatch?OrderIds=',CompletedPickerDispatch).pipe(
      catchError(this.handleError)
      );  
  }

  EditPIckerorderQty(EditPickerorderQty : EditPickerorderQty):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Picker/EditPIckerorderQty',EditPickerorderQty)};

  handleError(error: HttpErrorResponse){
    alert('Demand Quantity is not avilable in stock.Thats why unable to do RTD स्टॉक में माँग की मात्रा उपलब्ध नहीं है इसलिए प्रेषण करने के लिए तैयार करने में असमर्थ है|'+ '' +error.error.ErrorMessage);
    console.log('Order amount and dispatch amount is different. It is not allowed in online payment for this.OrderIds');
    return throwError(error);
    }

    salesagent(WarehouseId):  Observable<any> {
      return this.http.get<any>(this.apiURL + '/api/Agents/Activeagent?WarehouseId='+WarehouseId);
    }
    getordersbyId(mob):  Observable<any> {
      return this.http.get<any>(this.apiURL + '/api/DeliveryOrder?mob='+ mob);
    }
    PickerRTDOrderProcess(PickerRTDOrderDC : PickerRTDOrderDC):  Observable<any> {
      return this.http.post<any>(this.apiURL + '/api/Picker/PickerRTDOrderProcess',PickerRTDOrderDC)};
    GetApprovedList(WarehouseId : number,ClusterId : number,skip :number,take:number):  Observable<any> {
      // return this.http.get<any>(this.apiURL + '/api/Picker/GetApprovedList?ClusterId='+ClusterId);
      return this.http.get<any>(this.apiURL + '/api/Picker/GetApprovedPickerList?WarehouseId='+ WarehouseId + '&ClusterId=' + ClusterId+ '&skip=' + skip + '&take=' + take);
    }  
    GetItemList(OrderPickerMasterId : number):  Observable<any> {
       return this.http.get<any>(this.apiURL + '/api/Picker/GetItemList?OrderPickerMasterId='+OrderPickerMasterId);
    }  
    SearchByPickerId(PickerId : number):  Observable<any> {
      return this.http.get<any>(this.apiURL + '/api/Picker/SearchByPickerId?PickerId='+PickerId);
    }    
    Updatecomments(userid,comments,pickerid):  Observable<any> {
      return this.http.post<any>(this.apiURL + '/api/Picker/PickerProcessCanceled?pickerId='+pickerid +'&UserId='+userid +'&comment='+comments,null)
    };
    getPickerTimerListByPickerId(OrderPickerMasterId : number):  Observable<any> {
      return this.http.get<any>(this.apiURL + '/api/Picker/GetPickerTimerListByPickerId?OrderPickerMasterId='+OrderPickerMasterId);
   } 
   getPickerTimerList():  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Picker/GetPickerTimerList');
 } 

  pickerListsA7():  Observable<any> {
  return this.http.get<any>(this.apiURL + '/api/Picker/PickerListA7');
}

  getInboundLeadForIncidentReport(WarehouseId):  Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/Picker/GetInboundLeadForIncidentReport?WarehouseId=' + WarehouseId);
  }
  getOutboundLeadForIncidentReport(WarehouseId):  Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/Picker/GetOutboundLeadForIncidentReport?WarehouseId=' + WarehouseId);
  }
  GetInboundLeadForIncidentReportwithoutWarehouseId():  Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/Picker/GetInboundLeadForIncidentReportwithoutWarehouseId');
  }
  GetOutboundLeadForIncidentReportwithoutWarehouseId():  Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/Picker/GetOutboundLeadForIncidentReportwithoutWarehouseId');
  }

  AcceptPicker(id : number,PickerId : number, commnent ):  Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/Picker/AcceptPicker?PeopleId='+id + '&PickerId=' + PickerId + '&IsPickerGrabbed=' + commnent );
  }

  WarehousebasedDeliveryBoyRole(WarehouseId : number):  Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/DeliveryOrder?Warehouseid=' + WarehouseId);
  }
  getPickerOrderdetails(PickerOrderId):  Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/Picker/GetPickerOrderdetails?PickerOrderId=' + PickerOrderId);
  }
  GetFreebiesItems(OrderId,ItemId,WarehouseId):  Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/OrderDispatchedMaster/GetFreebiesItem?OrderId=' + OrderId + '&ParentItemId=' + ItemId + '&WarehouseId=' + WarehouseId);
  }
  GetDboyWarehouseid(WarehouseId):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DeliveryOrder?Warehouseid=' + WarehouseId);
  }
  GetRedispatchorders(Mobile):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Picker/GetRedispatchorder?mob=' + Mobile);
  }
  sendapproval(dataToPost): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/DeliveryIssuance/approvalorder',dataToPost);
  };
  PostOrderMongo(OrderList):  Observable<any> {    
    return this.http.post<any[]>(this.apiURL + '/api/Picker/InsertMongoPickerOrderMaster',OrderList);   
  }
  GetMongoPickerOrderMaster():  Observable<any> {    
    return this.http.get<any[]>(this.apiURL + '/api/Picker/GetMongoPickerOrderMaster');   
  }
  GetMongoPickerObjectId(objectId):  Observable<any> {    
    return this.http.get<any[]>(this.apiURL + '/api/Picker/GetMongoPickerObjectId?objectId=' + objectId);
  }
  checkInventryOrderMaster(OrderList):  Observable<any> {    
    return this.http.post<any[]>(this.apiURL + '/api/Picker/checkInventryOrderMaster',OrderList);   
  }
  SearchSKP_KPP_OwnerList(WarehouseId,Customertype):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Picker/SearchSKP_KPP_OwnerList?Warehouseid='+WarehouseId + '&Customertype=' + Customertype);
  }
}   
