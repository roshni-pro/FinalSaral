export interface ChatMessageBodyA7 {
    Id: string;
    SenderCustomerId: number;
    ReceiverCustomerId: number;
    SenderName: string;
    ReceiverName: string;
    Message: string;
    IsReaded: boolean | null;
    SendTime: Date | string;
    ReceivedTime: Date | string | null;
    ReadTime: Date | string | null;
    selectedChat : boolean;

}

export interface GetchatforA7 {
    receiverId: number;
    senderId: number;
}



export interface CustomerContactsListA7 {

    CustomerId: number;
    CustomerName: string;
    UnReadCount: number;
    LastMessageDate: Date | string | null;
    Mobile: string;
    SkCode: string;
    CustomerSupportId: number;
}


export interface ReadMessageResponse {
    ObjectIdList: string;
}

export interface CustomerMessages {
    IsReaded: boolean | null;
    Message: string;
    ReadTime: Date | string | null;
    ReceivedTime: Date | string | null;
    SenderCustomerId: number;
    ReceiverCustomerId: number;
    ReceiverName: string;
    SenderName: string;
    SendTime: Date | string;
}


export interface ChatContactFilters
{
    Skip: number;
    Take: number;
    SearchKeyWords:string;
}
