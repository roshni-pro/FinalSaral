import { Component, OnInit } from '@angular/core';
import { DeliverycancellationreportService } from 'app/shared/services/deliverycancellationreport/deliverycancellationreport.service';
import { DepartmentService } from 'app/shared/services/department.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-delivery-cancellation-report',
  templateUrl: './delivery-cancellation-report.component.html',
  styleUrls: ['./delivery-cancellation-report.component.scss']
})
export class DeliveryCancellationReportComponent implements OnInit {
report : any;
deptartment  :any;
DepName : any;
DepId : any;
exportreport: any[];
charges : any;
chargesPur : any;
chargesOps : any;
sales : boolean;
pur : boolean;
ops : boolean;
All : boolean;
blocked : boolean;

  constructor(private deliverycancellationreportService : DeliverycancellationreportService, private departmentService : DepartmentService,private exportService: ExportServiceService,) { }

  ngOnInit() {
    this.DepId = "";
    this.departmentService.GetAllDepartment().subscribe(dept=>
      {
        this.deptartment = dept;
        console.log('result of dept :',dept);
      })  
      
      this.departments();

  }

  departments()
  {
    // this.blocked = true;
    this.deliverycancellationreportService.getreportdeliverycancellation().subscribe(result=>
      {
        
        // this.blocked= false;
        for(var i in result)         
        {
          for(var j in this.deptartment)
          {
              if(result[i].DepId == this.deptartment[j].DepId)
              {
                result[i].DepId = this.deptartment[j].DepName;
                  console.log('result of this.DepName :',result.DepId);
              }
          }
        }
        this.charges = 0;
        this.chargesPur = 0;
        this.chargesOps = 0;
        for(var i in result)         
        {
        if(result[i].DepId == "Sales")
        {
          this.charges = this.charges + result[i].ChargePoint;
          console.log('result of charges :',this.charges);
        }
        if(result[i].DepId == "HQ Operation")
        {
          this.chargesPur = this.chargesPur + result[i].ChargePoint;
          console.log('result of charges :',this.chargesPur);
        }
        if(result[i].DepId == "HQ Purchase")
        {
          this.chargesOps = this.chargesOps + result[i].ChargePoint;
          console.log('result of charges :',this.chargesOps);
        }
        //on behalf of id
        if(result[i].DepId == 6)
        {
          this.charges = this.charges + result[i].ChargePoint;
          this.sales = false;

          console.log('result of charges :',this.charges);
        }
        if(result[i].DepId == 29)
        {
          this.chargesPur = this.chargesPur + result[i].ChargePoint;
          console.log('result of charges :',this.chargesPur);
          this.pur = false;
        }
        if(result[i].DepId == 33)
        {
          this.chargesOps = this.chargesOps + result[i].ChargePoint;
          console.log('result of charges :',this.chargesOps);
          this.ops = false;
        }
      }
        this.report = result;
        this.exportreport =  this.report;
        console.log('result of delivery cancellation :',result);
      });

  }

  search(DepId)
  {
    if(DepId == 6)
    {
      this.sales = true;
      this.pur = false;
      this.ops = false;
      this.All = false;
    }
    if(DepId == 29)
    {
      this.pur = true;
      this.sales = false;
      this.ops = false;
      this.All = false;
    }
    if(DepId == 33)
    {
      this.ops = true;
      this.sales = false;
      this.pur = false;
      this.All = false;
    }
    if(DepId == 0)
    {
      this.All = true;
      this.sales = false;
      this.pur = false;
      this.ops = false;
    }
    if(DepId == "")
    {
      this.All = false;
      this.sales = false;
      this.pur = false;
      this.ops = false;
    }
    this.blocked= true;
    this.deliverycancellationreportService.SearchCancellationReport(DepId).subscribe(x=>
      {
        // this.report = x;
        for(var i in x)         
        {
          for(var j in this.deptartment)
          {
              if(x[i].DepId == this.deptartment[j].DepId)
              {
                x[i].DepId = this.deptartment[j].DepName;
                  console.log('result of this.DepName :',x.DepId);
              }
          }
        }
        this.blocked= false;
        this.report = x;
      
        this.exportreport =  this.report;
        console.log('x:',x);
      })
  }

  ExportReport(){
    this.exportService.exportAsExcelFile(this.exportreport, 'exportreport');
  }

}
