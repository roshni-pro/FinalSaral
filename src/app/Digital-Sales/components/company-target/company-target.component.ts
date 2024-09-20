import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubCatTargetBrand } from 'app/shared/interface/CompanyTarget/company-target';
import { SubSubCategoryService } from 'app/shared/services/sub-sub-category.service';


@Component({
  selector: 'app-company-target',
  templateUrl: './company-target.component.html',
  styleUrls: ['./company-target.component.scss']
})
export class CompanyTargetComponent implements OnInit {
  @Input() subCatTargetBrand:SubCatTargetBrand;
  @Input() cityId:any;
  @Input() brandList:any;
  @Output() onBranChange = new EventEmitter<boolean>();
  selectedBrand:any;  
  requiredBrand:any;
  brandValueType:any;
  brandValue:any;
  requiredItem:any;
  ItemValueType:any;
  ItemValue:any;
  FreeItem:any;
  FreeItemSellingSku:any;
  FreeQty:any;
  ItemList:any;
  FreeItemList:any;

  constructor(private brandService: SubSubCategoryService) { }

  ngOnInit() {    
    this.requiredBrand=0;
    this.brandValueType="percent";
    this.brandValue=0;
    this.requiredItem="";
    this.ItemValueType="percent";
    this.ItemValue=0;
    this.FreeItem=0;
    this.FreeItemSellingSku="";
    this.FreeQty=0;
  }

  onChangeBrand(){   
    this.subCatTargetBrand.BrandIds="";
    let strBrandIds='';
    let brandids=[];
    this.selectedBrand.forEach(function (brand) { 
      strBrandIds +=  strBrandIds? ','+ brand.SubsubCategoryid:brand.SubsubCategoryid; 
      brandids.push(brand.SubsubCategoryid);
    });
    this.subCatTargetBrand.BrandIds=strBrandIds;
    this.brandService.GetItemByBrandIds(brandids,this.cityId).subscribe(result => {
      this.ItemList = result;
    })
  }

  onChangeGiftType(SubCatTargetDetail:any,giftType:any){     
    if(giftType!="WalletPoint")
    {  
        let IsFreeItem=false;
        if(giftType=="DreamItem"){
            IsFreeItem=true;
        }
        let brandids=[];
        this.selectedBrand.forEach(function (brand) {     
          brandids.push(brand.SubsubCategoryid);
        });
        this.brandService.GetFreeItemsByBrandIds(brandids,this.cityId,IsFreeItem).subscribe(result => {
          this.FreeItemList = result;
        });
    }
    else
    {
      SubCatTargetDetail.SubCatTargetLevelFreeItems=[];

    }
  }
  
 IsValideSlab(timeRanges, selectedRange)
 {
  var isValid = true;
  timeRanges=timeRanges.sort((a, b) => parseFloat(a.end) - parseFloat(b.end));
  var minStart = timeRanges[0].start;
  var maxEnd = timeRanges[timeRanges.length - 1].end;
  
  if(selectedRange.start < selectedRange.end && selectedRange.start > minStart) {
    for(var i=0; i<timeRanges.length; i++) {
      if((selectedRange.start >= timeRanges[i].start && selectedRange.start <= timeRanges[i].end)
            || (selectedRange.end >= timeRanges[i].start && selectedRange.end <= timeRanges[i].end)) {
                isValid = false;
                break;
            }
    }
  }
  else
  {
    isValid = false;
  }
  return isValid;
 }

  isValidRange(timeRanges, selectedRange) {
    var isValid = true;
    var minStart = timeRanges[0].start;
    var maxEnd = timeRanges[timeRanges.length - 1].end;
    
    if(selectedRange.start < selectedRange.end && selectedRange.start > minStart && selectedRange.end < maxEnd) {
        for(var i=0; i<timeRanges.length; i++) {
            if((selectedRange.start >= timeRanges[i].start && selectedRange.start <= timeRanges[i].end)
            || (selectedRange.end >= timeRanges[i].start && selectedRange.end <= timeRanges[i].end)) {
                isValid = false;
                break;
            }
            else if(i != timeRanges.length - 1) {
                if(selectedRange.start > timeRanges[i].end && selectedRange.start < timeRanges[i+1].start) {
                    if(selectedRange.end < timeRanges[i+1].start) {
                        break;
                    }
                    else {
                        isValid = false;
                        break;
                    }
                }
            }
        }
    }
    else {
        isValid = false;
    }
    return isValid;
    }
  
  onAddLevel()
  {
    if(this.subCatTargetBrand.BrandIds=="")
    { 
      alert("Please select atleast one brand");
      return false;
    }
    if(this.subCatTargetBrand.SubCatTargetDetails.length<5)
    {
     
      let lastndx=this.subCatTargetBrand.SubCatTargetDetails.length;
      let taregetDetail=null;
      let lastUpperLimit=-1;
      if(lastndx!=0)
      {
        lastndx-=1;
        let taregetDetail= this.subCatTargetBrand.SubCatTargetDetails[lastndx];
        lastUpperLimit= taregetDetail.SlabUpperLimit;
        if(taregetDetail.SlabLowerLimit>=taregetDetail.SlabUpperLimit)
        {
        alert("Upper Limit should be greater then Lower Limit.");
        return false;        
        }
        else if(lastndx!=0)
        {
            var timeRanges = [];
            var allSlabRanges = [];
            this.subCatTargetBrand.SubCatTargetDetails.forEach(function (detail,indx) {  
              if(indx!=lastndx)
              {
                  timeRanges.push({
                    start: detail.SlabLowerLimit,
                    end: detail.SlabUpperLimit
                  });
              }
              allSlabRanges.push({
                start: detail.SlabLowerLimit,
                end: detail.SlabUpperLimit
              });
          }); 

          var Selectrangs={
            start: taregetDetail.SlabLowerLimit,
            end: taregetDetail.SlabUpperLimit
          }
          allSlabRanges=allSlabRanges.sort((a, b) => parseFloat(a.end) - parseFloat(b.end));
          lastUpperLimit= allSlabRanges[lastndx].end;
          if(!this.IsValideSlab(timeRanges, Selectrangs)) 
          {
            alert("Please correct slab its overlapping some level slab.");
            return false;
          }
        }

        if(taregetDetail.TargetbyValue==0)
        {
          alert("Please enter target value.");
          return false;  
        }
        else if(taregetDetail.ValueBy=="value" && taregetDetail.SlabUpperLimit > taregetDetail.TargetbyValue) //aarti
        {
          alert("Please enter target value greater than Upper Limit.");
          return false;  
        }
        if(taregetDetail.ValueBy=="percent" && taregetDetail.MinTargetValue==0)
        {
          alert("Please enter min target value.");
          return false; 
        }
        if(taregetDetail.Type=="WalletPoint" && taregetDetail.WalletValue==0)
        {
          alert("Please enter target wallet point.");
          return false; 
        }
        if(taregetDetail.Type!="WalletPoint" && taregetDetail.SubCatTargetLevelFreeItems.length==0)
        {
          alert("Please add target gift item.");
          return false; 
        }
      }
      

        this.subCatTargetBrand.SubCatTargetDetails.push({
          Id:0,
          SlabLowerLimit:lastUpperLimit+1,
          SlabUpperLimit:lastUpperLimit+101,
          ValueBy:"value",
          TargetbyValue:0,
          MinTargetValue:0,
          NoOfLineItem:0,
          Type:"WalletPoint",
          WalletValue:0,
          SubCatTargetLevelBrands:[],
          SubCatTargetLevelItems:[],
          SubCatTargetLevelFreeItems:[]
        });
    }
  }

  OnRemoveLevel(inx:any){
    this.subCatTargetBrand.SubCatTargetDetails.splice(inx, 1);
  }

  onAddRequireItem(SubCatTargetDetail:any,requiredItem:any,ItemValueType:any,ItemValue:any)
  {
    if(!requiredItem)
    {
      alert("Please Select Item");
      return false
    }
    if(ItemValue==0)
    {
      alert("Please Enter item value");
      return false
    }

    SubCatTargetDetail.SubCatTargetLevelItems.push({
      SellingSku:requiredItem.SellingSku,
      ItemName:requiredItem.ItemName,
      ValueType:ItemValueType,
      Value:ItemValue
    });
    this.requiredItem="";
    this.ItemValueType="percent";
    this.ItemValue=0;
  }

  onAddGiftItem(SubCatTargetDetail:any,FreeItem:any,FreeQty:any)
  {
    if(!FreeItem)
    {
      alert("Please Select Item");
      return false
    }
    if(FreeQty==0)
    {
      alert("Please Enter item Quantity");
      return false
    }

    SubCatTargetDetail.SubCatTargetLevelFreeItems.push({
      SellingSku:FreeItem.SellingSku,
      ItemName:FreeItem.ItemName,
      RewardItemId:FreeItem.ItemId,
      Qty:FreeQty
    });
    this.FreeItem=null;    
    this.FreeQty=0;
  }

  onAddRequireBrand(SubCatTargetDetail:any,requiredBrand:any,brandValueType:any,brandValue:any)
  {
    if(requiredBrand==0)
    {
      alert("Please Select brand");
      return false
    }
    if(brandValue==0)
    {
      alert("Please Enter Quantity");
      return false
    }

    SubCatTargetDetail.SubCatTargetLevelBrands.push({
      BrandId:requiredBrand.SubsubCategoryid,
      BrandName:requiredBrand.SubsubcategoryName,
      ValueType:brandValueType,
      Value:brandValue
    });
    this.requiredBrand=0;
    this.brandValueType="percent";
    this.brandValue=0;
  }  

  OnRemoveFreeItem(SubCatTargetLevelFreeItems:any,inx:any){
    SubCatTargetLevelFreeItems.splice(inx, 1);
  }

  OnRemoveItem(SubCatTargetLevelItems:any,inx:any){
    SubCatTargetLevelItems.splice(inx, 1);
  }

  OnRemoveBrand(SubCatTargetLevelItems:any,inx:any){
    SubCatTargetLevelItems.splice(inx, 1);
  }

  onButtonClick(){
    this.onBranChange.emit(false);
  }
}
