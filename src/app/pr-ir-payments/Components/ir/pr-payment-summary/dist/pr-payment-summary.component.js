"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PrPaymentSummaryComponent = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("environments/environment");
var XLSX = require("xlsx");
var FileSaver = require("file-saver");
var PrPaymentSummaryComponent = /** @class */ (function () {
    function PrPaymentSummaryComponent(irpaymentsService, router, r, irService, supplierService, messageService, confirmationService, dateFormatorService) {
        this.irpaymentsService = irpaymentsService;
        this.router = router;
        this.r = r;
        this.irService = irService;
        this.supplierService = supplierService;
        this.messageService = messageService;
        this.confirmationService = confirmationService;
        this.dateFormatorService = dateFormatorService;
        this.paymentDetailList = [];
        this.showDialog = false;
        this.detailStatusList = [];
        this.isWaiting = false;
        this.invalidRefNo = false;
        this.noDates = false;
        this.exportShow = false;
        this.exportList = [];
    }
    PrPaymentSummaryComponent.prototype.ngOnInit = function () {
        this.initializePaginator();
        this.initializeDetailStatusList();
        this.initializeExportCriterion();
    };
    PrPaymentSummaryComponent.prototype.loadLazy = function (event) {
        var _this = this;
        setTimeout(function () {
            if (_this.paginator) {
                _this.paginator.SkipCount = event.first;
                _this.paginator.Take = event.rows;
                _this.getData();
            }
        }, 100);
    };
    PrPaymentSummaryComponent.prototype.getReport = function (summary) {
        var _this = this;
        
        this.irpaymentsService.supplierPaymentReport(summary.Id).subscribe(function (x) {
            
            if (x == null) {
                _this.messageService.add({ severity: 'error', summary: 'No Record Found', detail: 'No Payment Record Found OR Payment is Rejected' });
            }
            else {
                window.open(environment_1.environment.apiURL + x);
            }
        });
    };
    PrPaymentSummaryComponent.prototype.getData = function () {
        var _this = this;
        this.irpaymentsService.prPaymentSummariesGet(this.paginator).subscribe(function (x) {
            
            _this.summary = x;
            _this.list = x.summaryList;
            _this.totalCount = x.Count;
        });
    };
    PrPaymentSummaryComponent.prototype.initializePaginator = function () {
        this.paginator = {
            EndDate: null,
            SkipCount: 0,
            StartDate: null,
            Take: 10
        };
    };
    PrPaymentSummaryComponent.prototype.initializeExportCriterion = function () {
        this.exportpaginator = {
            WarehouseId: null,
            Search: null,
            EndDate: null,
            StartDate: null,
            SkipCount: null,
            Take: null
        };
    };
    PrPaymentSummaryComponent.prototype.redirectiroutstanding = function () {
        this.router.navigate(["PR"], { relativeTo: this.r.parent });
    };
    PrPaymentSummaryComponent.prototype.onUpload = function (event, uploadCustom, summaryId) {
        var _this = this;
        console.log('summaryId is: ', summaryId);
        this.irpaymentsService.getBySummaryId(summaryId).subscribe(function (x) {
            _this.paymentDetailList = x;
            if (_this.paymentDetailList && _this.paymentDetailList.length) {
                _this.paymentDetailList.forEach(function (element) {
                    element.PRList = JSON.parse(element.PRList);
                });
                console.log('uploadCustom: ', uploadCustom);
                var workBook_1 = null;
                var jsonData_1 = null;
                var reader_1 = new FileReader();
                var file = event.files[0];
                try {
                    console.log('event is: ', event);
                    // uploadCustom.files = null;
                    reader_1.readAsBinaryString(file);
                }
                catch (er) {
                }
                reader_1.onload = function (event) {
                    var data = reader_1.result;
                    workBook_1 = XLSX.read(data, { type: 'binary' });
                    jsonData_1 = workBook_1.SheetNames.reduce(function (initial, name) {
                        var sheet = workBook_1.Sheets[name];
                        initial[name] = XLSX.utils.sheet_to_json(sheet);
                        return initial;
                    }, {});
                    var dataFromExcel = jsonData_1;
                    var dataString = JSON.stringify(jsonData_1);
                    console.log(dataFromExcel);
                    console.log(dataString);
                    console.log('dataFromExcel.Sheet1: ', dataFromExcel.Sheet1);
                    var excelData = dataFromExcel.Sheet1;
                    if (excelData && excelData.length) {
                        // this.selectbill = false;
                        // this.disblebankinfo = false;
                        // this.inputModel.paymentDate = null;
                        // this.inputModel.amount = null;
                        _this.updatePaymentDetailList(excelData);
                    }
                    else {
                        //this.messageService.add({ severity: 'error', summary: 'please add any data in your excel sheet!', detail: '' });
                    }
                };
            }
            else {
                _this.messageService.add({ severity: 'error', summary: 'No Record Found', detail: 'No Payment Record Found OR Payment is Rejected' });
            }
            console.log('list is: ', x);
            console.log('event is: ', event);
            uploadCustom.files = null;
            // reader.readAsBinaryString(file);
        });
        //this.filterPaymentList();
        // this.messageService.add({
        //   severity: 'info',
        //   summary: 'File Uploaded',
        //   detail: ''
        // });
    };
    PrPaymentSummaryComponent.prototype.updatePaymentDetailList = function (excelData) {
        var _this = this;
        console.log(' this.paymentDetailList: ', this.paymentDetailList);
        if (excelData && excelData.length && this.paymentDetailList && this.paymentDetailList.length) {
            this.paymentDetailList.forEach(function (x) {
                x.PaymentStatus = 'Rejected';
            });
            excelData.forEach(function (excelItem) {
                
                var tempDetail = _this.paymentDetailList.filter(function (detailItem) {
                    return excelItem.Particulars == detailItem.SupplierCodes + " " + detailItem.WarehouseName
                        && excelItem.Amount == detailItem.PRList.PaidAmount
                        && detailItem.PaymentStatus != 'Approved';
                });
                if (tempDetail && tempDetail.length) {
                    tempDetail[0].PaymentDate
                        = new Date(_this.dateFormatorService.getMMdDDdYYYYFromDD_MM_YYYYString(excelItem['Date']));
                    tempDetail[0].RefNo = excelItem['UTR Number'];
                    tempDetail[0].PaymentStatus = 'Approved';
                }
                else {
                    //tempDetail[0].PaymentStatus = 'Rejected';
                }
            });
            this.showDialog = true;
            console.log('this.paymentDetailList: ', this.paymentDetailList);
        }
    };
    PrPaymentSummaryComponent.prototype.update = function () {
        var _this = this;
        this.isWaiting = true;
        var invalidRefs = [];
        if (this.paymentDetailList && this.paymentDetailList.length) {
            this.paymentDetailList.forEach(function (item) {
                item.PrPaymentStatus = item.PaymentStatus;
                item.PRList = JSON.stringify(item.PRList);
                if (item.RefNo == '') {
                    invalidRefs.push(1);
                }
            });
            
            if (invalidRefs && invalidRefs.length) {
                this.invalidRefNo = true;
                this.isWaiting = false;
            }
            else {
                this.invalidRefNo = false;
            }
            if (true) {
                this.irpaymentsService.updateIRPayment(this.paymentDetailList).subscribe(function (x) {
                    
                    _this.isWaiting = false;
                    if (x) {
                        _this.showDialog = false;
                        if (confirm("Payment Updated!")) {
                            setTimeout(function () {
                                _this.showDialog = false;
                                window.location.reload();
                                _this.router.navigate(["PrPaymentSummaryReload"], { relativeTo: _this.r.parent });
                            }, 1500);
                        }
                    }
                    else {
                        _this.showDialog = false;
                        _this.isWaiting = false;
                        if (confirm("issue in saving payment!")) {
                            setTimeout(function () {
                                _this.showDialog = false;
                                window.location.reload();
                                _this.router.navigate(["PrPaymentSummaryReload"], { relativeTo: _this.r.parent });
                            }, 1500);
                        }
                    }
                });
            }
        }
    };
    PrPaymentSummaryComponent.prototype.initializeDetailStatusList = function () {
        this.detailStatusList = [
            // { label: 'Pending', val: 'Pending' },
            { label: 'Approved', val: 'Approved' },
            { label: 'Rejected', val: 'Rejected' }
        ];
    };
    PrPaymentSummaryComponent.prototype.getBySummaryId = function (summaryId) {
        var _this = this;
        this.irpaymentsService.getAllBySummaryId(summaryId).subscribe(function (x) {
            _this.paymentDetailList = x;
            _this.showDetails = true;
        });
    };
    PrPaymentSummaryComponent.prototype.getPurchaseRequestPaymentDetails = function () {
        var _this = this;
        
        if (!this.exportpaginator.StartDate || !this.exportpaginator.EndDate) {
            this.messageService.add({ severity: 'error', summary: 'please select from and to date!', detail: '' });
        }
        else {
            if (this.exportpaginator.StartDate > this.exportpaginator.EndDate) {
                this.messageService.add({ severity: 'error', summary: 'Start Date should be less than end date!', detail: '' });
            }
            else {
                this.irpaymentsService.getPrPaymentsByDate(this.exportpaginator).subscribe(function (x) {
                    
                    _this.exportList = x.PrList;
                    if (x.PrList && x.PrList.length) {
                        _this.ExportToExcel();
                    }
                    else {
                        _this.exportShow = false;
                        _this.messageService.add({ severity: 'error', summary: 'No Details found for respective dates!', detail: '' });
                    }
                });
            }
        }
    };
    PrPaymentSummaryComponent.prototype.ExportToExcel = function () {
        var exportList = [];
        this.exportList.forEach(function (appItem, index) {
            if (true) {
                exportList.push({
                    SupplierName: appItem.SupplierName,
                    PurchaseOrderId: appItem.PurchaseOrderId,
                    TotalAmount: appItem.TotalAmount,
                    PaidAmount: appItem.PaidAmount,
                    PaymentDate: appItem.PaymentDate,
                    PrPaymentStatus: appItem.PrPaymentStatus,
                    RefNo: appItem.RefNo
                });
            }
        });
        var worksheet = XLSX.utils.json_to_sheet(exportList);
        console.log('worksheet', worksheet);
        var workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        var excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        this.saveAsExcelFile(excelBuffer, 'Purchase Request Payment Details');
    };
    PrPaymentSummaryComponent.prototype.saveAsExcelFile = function (buffer, fileName) {
        var data = new Blob([buffer], {
            type: "xlsx"
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + ".xlsx");
    };
    PrPaymentSummaryComponent.prototype.rejectPayment = function (paymentDetail) {
        var _this = this;
        //this.paymentDetailList 
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            accept: function () {
                //Actual logic to perform a confirmation
                _this.irpaymentsService.rejectPRPayment(paymentDetail.Id).subscribe(function (result) {
                    if (result && result.IsSuccess) {
                        _this.messageService.add({ severity: 'success', summary: '', detail: 'Payment Rejected!!' });
                        _this.showDetails = false;
                    }
                    else {
                        _this.messageService.add({ severity: 'error', summary: 'Not rejcected', detail: 'Payment not rejected!!' });
                    }
                });
            },
            reject: function () {
                _this.messageService.add({ severity: 'info', summary: 'Cancelled', detail: 'You have cancelled the action!' });
            }
        });
        console.log('paymentDetail: ', paymentDetail);
    };
    PrPaymentSummaryComponent.prototype.getExcel = function (ir) {
        var _this = this;
        this.irpaymentsService.getSupplierPRPaymentExport(ir.Id).subscribe(function (x) {
            var worksheet = XLSX.utils.json_to_sheet(x);
            var workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            var excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
            _this.saveAsExcelFile(excelBuffer, 'ExportDate');
        });
    };
    PrPaymentSummaryComponent = __decorate([
        core_1.Component({
            selector: 'app-pr-payment-summary',
            templateUrl: './pr-payment-summary.component.html',
            styleUrls: ['./pr-payment-summary.component.scss']
        })
    ], PrPaymentSummaryComponent);
    return PrPaymentSummaryComponent;
}());
exports.PrPaymentSummaryComponent = PrPaymentSummaryComponent;
