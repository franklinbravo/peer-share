import { Injectable, OnDestroy, NgZone } from '@angular/core';
import { isNullOrUndefined } from 'util';
import Peer from 'peerjs';
import { ToastrService } from 'ngx-toastr'
import { EncrDecrService }from './encr-decr.service'
import { Observable } from 'rxjs';
type MyArrayType = Array<{quien: string, msgs: string}>;
@Injectable({
  providedIn: 'root'
}) 
export class PeerconnectService implements  OnDestroy {
  db:any;
  peer: Peer;
  conn: any;
  
  userDataPath:any;
  chat: MyArrayType = [];
  remotePeerId: string;
  myPeerId: string;
  peerid:any;
  idpeer: string;
  messageLog: string = "Log:\n\n";
  
 
  msg:any; 
  msgid:any;
  peer2: Peer;
  constructor(
    private _ngZone: NgZone, 
    private toastr: ToastrService,
    private crypto:EncrDecrService) {}

  openPeer(id){
    console.log('openpeer',id)
    return Observable.create((obs)=>{
      this.peer=new Peer('U2FsdGVkX18w5k',{host: 'peer-server-geekbull.herokuapp.com', path: '/myapp',secure:true});
      obs.next(this.peer);  
    });
  }
getPeerId(peerid){
  this.openPeer(peerid).subscribe((peer)=>{
    console.log(peer);
    peer.on('open', (id) => {
      console.log('My peer ID is: ' + id);
      this.myPeerId =id;
    });
    peer.on('connection', (conn) => {
      this.setUpConnection(conn);
    }); 
   })
}
  ngOnDestroy() {
    if(!isNullOrUndefined(this.peer)) {
      this.peer.destroy();
    }
  }
  
  setUpConnection(conn: any) {
    this.conn = conn;
    this.conn.on('open', () => {
      this.toastr.success(`Conectado a: ${this.conn.peer}`,'Conexion Exitosa');
    });

    this.conn.on('close', () => {
      this.toastr.success('La conexion se ha cerrado','Coneccion Cerrada');
      
    });
    this.conn.on('error', (err) => {
      this.toastr.error(`${err}`,'Error')
      console.log(err);
    });
    this.conn.on('data', (data) => {
      //Condicionales para identificar que tipo de dato es recibido
      this.chatM(data,"receptor");
    });
  }

  connect(remoteP){
    let conn = this.peer.connect(remoteP);
    this.setUpConnection(conn);
  }

  sendMsg(msg) {
    if(!isNullOrUndefined(this.conn)) {
      this.chatM(msg,"emisor");
      this.conn.send(msg); 
    }
    else {
      this.toastr.error('Todavia no se ha conectado en la red','Error');
    }
  }

  
  chatM(msg:any,other:any){
    
    this.chat.push({ quien: other , msgs: msg })
    console.log(this.chat)
    return this.chat;
  }
  
 
          
}
