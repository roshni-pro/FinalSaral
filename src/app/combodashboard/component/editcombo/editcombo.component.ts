import { Component, OnInit ,Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CombodashService } from 'app/shared/services/combodash.service';
import * as moment from 'moment';
import { MessageService, ConfirmationService } from 'primeng/api';
import { environment } from 'environments/environment';
import * as XLSX from 'xlsx';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Combo } from 'app/shared/interface/combo';

@Component({
  selector: 'app-editcombo',
  templateUrl: './editcombo.component.html',
  styleUrls: ['./editcombo.component.scss']
})
export class EditcomboComponent implements OnInit {

  @Input() GroupID: number;


  TotalTaxAmount:0
  group: any;
  peopleList: any;
  isInvalid: boolean;
  @Output() refreshParent = new EventEmitter(); 
  @Output() isdetailsclose = new EventEmitter<boolean>(); 
  // groupList: any;
  warehouses:any;
  LogoUrl:any;
  file:any;
  imgURL: any;  
  isUploaded : boolean;
  public imagePath;
  selecteditem:any[];
  Itemiiii:any[];
  itemList:any;
  itemLists:any[];
  itemcode:any;
  Groupitemlist2:any;
  WarehouseId:any;
  WareHouse:any;
Afterpercentage:any;
Percentage : any;
totalamount:any;
  Combo:Combo;
  ComboItem:any[]=[];
  totalprice:any;
  qty:any;
  Result:any;
  TotalPrice: any;
  TotalResult:any;
  colist : any;
  @Input() ComboName: any;
  @Input() Id: any;
  combolist : any;

  constructor(private combodashService: CombodashService,private route: ActivatedRoute, private router: Router,private messageService : MessageService, private confirmationService: ConfirmationService ) { 
    this.group = {};   
 this.combolist={};
 }

  ngOnInit() {
    this.Result=0;
    this.qty=0;
    this.selecteditem = [];
    this.isInvalid = false;

    if (this.GroupID) {
      console.log(this.GroupID)
     this.group = this.GroupID;       
     
    }

    this.ComboName = String(this.route.snapshot.paramMap.get("ComboName"));
    this.Id = String(this.route.snapshot.paramMap.get("Id"));
    this.combodashService.EditBylist(this.ComboName,this.Id).subscribe(result => {     
      
      this.combolist = result;      
      this.colist = this.combolist.CoItemlist; 
      this.TotalAmount()
    })




    this.combodashService.WarehouseGetByID().subscribe(result => {     
      this.warehouses = result;
    })
    
  }
  getItemList(event,WarehouseId) {   
    if (event.query.length > 2) {
      this.combodashService.getBylist(event.query,WarehouseId)
        .subscribe(result => {
          this.itemList = result;
          this.Percentage=0;    
        });
    } 
   
  }
 
  onmodelChange(itemLists) {
          debugger
    var isexist=false;  
    if(this.colist!=null)
    {
    this.colist.forEach(element => {
      if(element.ItemId==itemLists.ItemId)
      {
         isexist=true;
      }
    });
    }

    if(isexist)
      {
        this.messageService.add({severity:'error', summary: 'Item already exist.', detail:''});
        return false;
      }



    this.colist.push({
      ItemId: itemLists.ItemId,
      ItemImage: itemLists.LogoUrl,
      itemname: itemLists.itemname,
      Qty: parseInt(itemLists.MinOrderQty),
      UnitPrice: parseFloat(itemLists.UnitPrice),
      MinOrderQty: parseInt(itemLists.MinOrderQty),
      Parcentage: 0,
      AfterPercentage: parseInt(itemLists.MinOrderQty) * parseFloat(itemLists.UnitPrice),
      TotalPriceItem: parseInt(itemLists.MinOrderQty) * parseFloat(itemLists.UnitPrice),
      Mrp:itemLists.MRP
    });
    this.TotalAmount();
  }

      save(data)
      { 
         
        console.log("data::",data);
          this.combodashService.updatelist(this.combolist).subscribe(result => {
            
            this.messageService.add({severity:'success', summary: 'Save Successfully!', detail:''});
            this.warehouses = result;
          })
        
           this.router.navigateByUrl('layout/combodashboard/combodashboard');
           this.refreshParent.emit();
      }

      TotalAmount()
      { 
        
         this.TotalResult=0;     
        this.Result=0;
        this.colist.forEach(x=>{
          
          this.Result += x.AfterPercentage;     
          this.TotalResult += x.TotalPriceItem;   
        })      
        this.combolist.TotalComboPrice=this.TotalResult;  
        this.combolist.ComboPrice= this.Result ;
      }


      onItemAmount(selecteditem){
      
       if (selecteditem.Parcentage != null) {
          this.totalamount =parseInt(selecteditem.Qty) * parseFloat(selecteditem.UnitPrice),
          selecteditem.TotalPriceItem =this.totalamount;
          this.totalamount = this.totalamount- (this.totalamount * (parseFloat(selecteditem.Parcentage)/100)) ;
          selecteditem.AfterPercentage=this.totalamount;       
        }
        else
        {
          this.messageService.add({severity:'error', summary: 'Atleast one number is required either 0 or more then 1!', detail:''});
        }
        this.TotalAmount();
      }
  
 
      onCancel(){
        this.router.navigateByUrl('layout/combodashboard/combodashboard');       
       }

  
  


  increment(selecteditem) {  
        if(selecteditem.Qty==null){          
          selecteditem.Qty =  parseInt(selecteditem.MinOrderQty);
        }else{
          selecteditem.Qty = parseInt(selecteditem.Qty);
          selecteditem.Qty += parseInt(selecteditem.MinOrderQty);         
        }
        
    this.onItemAmount(selecteditem);
   
  };


  decrement(selecteditem){    
        if(selecteditem.ItemId==selecteditem.ItemId){
          if(selecteditem.Qty >=0){
            if(selecteditem.Qty == 0){
              return selecteditem.Qty;
            }
            selecteditem.Qty = parseInt(selecteditem.Qty);
            selecteditem.Qty -=  parseInt(selecteditem.MinOrderQty);        
          }else{
            selecteditem.Qty = parseInt(selecteditem.MinOrderQty);
  
          }
        }
        this.onItemAmount(selecteditem);        
    };

    Delete(selecteditem){
      debugger
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          debugger
          console.log("from html",selecteditem);
          console.log("from list", this.combolist.CoItemlist); 
    
          var b = this.combolist.CoItemlist.findIndex(x=> x.ItemId == selecteditem.ItemId);
          
          console.log("bb::",b);
          this.combolist.CoItemlist.splice(b, 1)
      
          console.log("b", b); 
          console.log("from list1", this.combolist.CoItemlist); 
          this.TotalAmount();
          this.messageService.add({severity:'success', summary: 'Deleted Successfully!', detail:''});
        }
       
      });
     
  
    }
}
