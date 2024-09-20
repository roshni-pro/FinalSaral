export interface bulkNotification
{
    uploadMobileNo: UploadMobileNo[];
    message: string;
    title: string;
    notify_type:string;
}
export interface UploadMobileNo
{
    mobilenumber: string;
}




