import { Component, OnInit } from '@angular/core';
import { PeerconnectService } from '../../providers/peerconnect.service';
import { DatapeerService } from '../../providers/datapeer.service';
import { EncrDecrService } from '../../providers/encr-decr.service';
import { ComponentComunicationService } from '../../providers/component-comunication.service'
import { Subscription } from "rxjs";
interface contact {
  name: string;
  lastname:string;
  key:string;
}

//let users:contact[]=[];

type MyArrayType = Array<{quien: string, msgs: string}>;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  hiddenaux:string='noactivo';
  users:contact[]=[
    {
      name:'',
      lastname:'',
      key:''
    }
  ]
  chat:any[]=[]
  //.valueChanges.subscribe
  filterUsers='';
  msg:any; 
  msgid:any;
  idpeer:any;
  idDB
  user
  private chat_: Subscription = null;
  constructor(
    public peerconnect: PeerconnectService,
    public datapeer:DatapeerService,
    private crypto:EncrDecrService,
    public compComu:ComponentComunicationService
  ) {
    
  }

  ngOnInit() {
    this.chat_=this.peerconnect.chatObs$.subscribe(data=>{
      let NewUser=this.datapeer.user.contacts.map(e=>{ return e.username}).indexOf(data.from)
      console.log('Contacto:',this.datapeer.user.contacts[NewUser],'index',NewUser)
      if(NewUser>-1){
        this.datapeer.saveMsg(data,this.datapeer.user.contacts[NewUser].id);
        this.chat.push(data);
      }else{
        this.datapeer.saveMsg(data,undefined,data.from);
        this.chat.push(data);
      }
    })
  }
  
  showChat(user,id){
    console.log(id,'id del usuario:',user)
    this.peerconnect.connect(user)
    this.idpeer=user;
    this.idDB=id;
    this.datapeer.getChat(id,(chat)=>{
      this.chat=chat;
      console.log(chat)
    })
  }
  enviar(){
    let msg={
      msgs:this.msg,
      from:this.peerconnect.idpeer,
      quien:'emisor'
    }
    this.peerconnect.sendMsg(msg,this.idpeer,()=>{
      this.datapeer.saveMsg(msg,this.idDB)
      this.chat.push(this.msg)
      this.msg = "";
    });
  }
  minimizar(){
    this.compComu.openClose= !this.compComu.openClose;
}
}

 
