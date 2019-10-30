import { Component, OnInit } from '@angular/core';
import { PeerconnectService } from '../../providers/peerconnect.service';
import { DatapeerService } from '../../providers/datapeer.service';
import { EncrDecrService } from '../../providers/encr-decr.service';
import { ComponentComunicationService } from '../../providers/component-comunication.service'

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
  chat: MyArrayType = [];
  //.valueChanges.subscribe
  messageLog: string = "Log:\n\n";
  filterUsers='';
  msg:any; 
  msgid:any;
  idpeer:any;
  index
  user
  constructor(
    public peerconnect: PeerconnectService,
    public datapeer:DatapeerService,
    private crypto:EncrDecrService,
    public compComu:ComponentComunicationService
  ) {
    
  }

  ngOnInit() {
  }
  showChat(user){
    this.peerconnect.connect(user).then(e=>{
      this.idpeer=`${user} ${e}`
    })
    .catch(e=>{
      console.log(e)
      this.idpeer=`${user} ${e}` 
    })
    this.datapeer.getChat(user,(data,i)=>{
      this.index=i
      try{
        this.chat=data.chat
      }catch{
        this.chat
      }
    })
  }
  enviar(){
  this.peerconnect.sendMsg(this.msg,()=>{
    this.datapeer.saveMsg(this.index,this.msg)
    this.msg = ""; 
  });
  
}
  minimizar(){
    this.compComu.openClose= !this.compComu.openClose;
}
}

 
