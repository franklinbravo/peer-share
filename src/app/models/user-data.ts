import { Contacts } from './contacts'
export interface User{
    _id?:string;
    name:string;
    lastname:string;
    dataLog:{
        username:string;
        pwd:string;
    }
    keyPriv:string;
    keyPub:string;
    terms:boolean;
    contacts:Array <Contacts>;
    class:Array<any>
}
