export class Message {
    msg:string;
    metadata:{
        userRemit:string;
        userDesti:string;
        peerSupport: Array<string>;
    }
}