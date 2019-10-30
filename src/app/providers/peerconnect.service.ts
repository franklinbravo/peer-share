import { Injectable, OnDestroy, NgZone } from '@angular/core';
import { isNullOrUndefined } from 'util';
import Peer from 'peerjs';
import { ToastrService } from 'ngx-toastr'
import { EncrDecrService }from './encr-decr.service'
import { Observable, timer } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { retryWhen, delayWhen } from 'rxjs/operators';
import { resolve } from 'path';

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
  readonly URL ='http://localhost:3000';
 
  msg:any; 
  msgid:any;
  peer2: Peer;
  constructor(
    private _ngZone: NgZone, 
    private toastr: ToastrService,
    private crypto:EncrDecrService,
    private http:HttpClient) {
      /*
      setInterval(()=>{
        this.getUsersAct()
          .subscribe(res =>{
            console.log(res)
          })
        this.getPubKey()
          .subscribe(res=>{
            console.log(res)
          })
          let hola={
            id:'ewetwetwetwetdfsdgsd',
            key:'25723657283658237652387562875623647236'
          }
        this.postSaveKey(hola)
          .subscribe(res=>{
            console.log(res)
          })
        this.getPeerKey('ewetwetwetwetdfsdgsd').subscribe(res=>{
          console.log(res, 'getPeerkey')
        })
      },6000)*/
      
    }
    
    //this.peer=new Peer('U2FsdGVkX18w5k',{host: 'peer-server-geekbull.herokuapp.com', path: '/myapp',secure:true});
    
  openPeer(id){
    console.log('openpeer',id)
    return Observable.create(async(obs)=>{
      this.peer
      obs.next(this.peer);  
    });
  }
async getPeerId(peerid){
  this.peer=await new Peer(peerid,{host: 'localhost', path: '/api',port:3000,secure:false});
  
    this.peer.on('open',(id)=>{
      console.log('id peeer',id)
    })
    this.peer.on('connection', (conn) => {
      this.setUpConnection(conn)
    });
    this.peer.on('disconnected',()=>{
      setTimeout(()=>{
        console.log('Reintentando Connexion')
        this.peer.reconnect()
      },5000)
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
    });
    this.conn.on('data', (data) => {
      //Condicionales para identificar que tipo de dato es recibido
      this.chatM(data,"receptor");
    });
  }

  connect(remoteP){
    console.log(remoteP)
    let conn = this.peer.connect(remoteP);
    this.setUpConnection(conn)
    return new Promise((resolve,reject)=>{
      
    })
  }

  sendMsg(msg,cb) {
    if(!isNullOrUndefined(this.conn)) {
      this.chatM(msg,"emisor");
      this.conn.send(msg); 
      cb()
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
  
  //----------------------HTTP-------------------
  getUsersAct(){
    return this.http.get(this.URL+`/users`)
  }
  
}
