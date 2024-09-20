
export interface GetGullak 
{
      Skip : number;
      Take : number;
     // warehouseid : number;
      DateFrom : Date | null;
      DateTo : Date | null;
      SKcode : string;
}

export interface GetGullakTransaction
{
     Skip : number;
     Take : number;
     GullakId : number;
     CustomerId : number;
}

export interface AddGullakPayment
    {
         id : number;
         CustomerId : number;
         Amount : number;
         GatewayRequest : string;// bank name // online payment Details 
         GatewayTransId : number; // cheque number // online trX Number 
         PaymentFrom : string; // online // cash //cheque
         comment : string;  // comment 
         GullakImage:string;
    }

    export interface GullakPendingDc
    {
       id : number;
      CustomerId : number;
      GullakId : number;
      GatewayTransId : number;
      status : string
      Amount : number;
      GatewayRequest : string;  // bank name // online payment Details        
      PaymentFrom :  string;// online // cash //cheque
      comment :  string; // comment 
      GullakImage : string;

    }



