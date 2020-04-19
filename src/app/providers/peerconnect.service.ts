import { Injectable, OnDestroy } from '@angular/core';
import { isNullOrUndefined } from 'util';
import Peer from 'peerjs';
import { ToastrService } from 'ngx-toastr'
import { Observable, Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';

type MyArrayType = Array<{quien: string, msgs: string}>;
@Injectable({
  providedIn: 'root'
}) 
export class PeerconnectService implements  OnDestroy {
  db:any;
  peer: Peer;
  conn: any;
  chat: MyArrayType = [
    {quien: '',
     msgs: ''}
    ];
  idpeer: string;
  readonly URL ='http://localhost:3000';
  private chatObs = new Subject<any>();
  public chatObs$ = this.chatObs.asObservable();
  

  constructor(
    private toastr: ToastrService,
    private http:HttpClient
    ) {
      
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
    return Observable.create((obs)=>{
      this.peer
      obs.next(this.peer);  
    });
  }
async getPeerId(peerid){
  this.peer=await new Peer(peerid,{host: 'localhost', path: '/api',port:3000,secure:false});
  
    this.peer.on('open',(id)=>{
      this.idpeer=id;
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
      console.log(data,'receptor de datos')
      this.chatM(data,"receptor");
    });
  }

  connect(remoteP){
    let conn = this.peer.connect(remoteP);
    this.setUpConnection(conn)
  }

  sendMsg(msg,peer,cb) {
    if(!isNullOrUndefined(this.conn) && this.conn.peer==peer) {
      this.chatM(msg);
      this.conn.send(msg); 
      cb()
    }
    else {
      //cb('sendToNodes')
      this.toastr.error('Hubo un error, intente nuevamente','Error');
    }
  }

  
  chatM(msgs:any,other?:any){
    if(other=='receptor'){
      let data={ 
        quien: 'receptor', 
        msgs: msgs.msgs,
        from:msgs.form 
      }
      this.chatObs.next(data);
    }else{
      this.chatObs.next(msgs);
      this.chat.push(msgs);
      console.log(this.chat);
    }
  }
  
  //----------------------HTTP-------------------
  getUsersAct(){
    return this.http.get(this.URL+`/users`)
  }
  
}
