export interface NotificationDTO  {

    to:string       // email address of the recipient
    subject:string   // subject of email
    tempplateId:string   // id of the email template to use
    params:Record<string,any>  // parameters to replace in the template
}
