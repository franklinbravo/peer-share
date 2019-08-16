import { Injectable } from '@angular/core';
import Datastore from 'nedb'; 
import * as path from 'path';
import { ElectronService } from './electron.service';
import {PeerconnectService} from './peerconnect.service'
@Injectable({
  providedIn: 'root'
})
export class DatapeerService {
  db:any;

  userDataPath:any;
  all:any;
  peerid:any;
  //private 
  indicador: boolean=false;
  constructor(private _electronService: ElectronService,
  public peerConnect:PeerconnectService  ) {
    this.userDataPath = this._electronService.remote.app.getPath('userData');
    this.db = new Datastore({filename:this.userDataPath+"/userdata.db",autoload:true});
  }
  
create(){
 // if(thi)
  this.db.insert({
    "_id":'peer01',
      "name": "",
      "lastname":"",
      "age":"",
      "semester":"",
      "email":"",
      "pwd":"",
      "terms":false,
      "key":"" 
  },(err,docs)=>{
    if(err){
      //console.log(err)
    }else{
      console.log('Base de datos creada: ',docs)
    }
  })
}
insertar(datosUser){
  this.db.update({_id:"peer01"},{$set:datosUser},{}, function(err, doc) {  
    console.log('Inserted', doc, 'with ID', doc._id);
    if(err) console.log(err);
});
}


eliminar(){
    this.db.remove({}, { multi: true }, function(err, numDeleted) {  
      console.log('Deleted', numDeleted, 'user(s)');
 });
}
async  peerId(){
  //obtener id
  await this.db.findOne({_id:'peer01'}, async (err, doc)=> { 
      if(err){
        console.log(err);
      }
      if(doc && doc.email){
        let aux= await doc.email
        await this.peerConnect.getPeerId(aux);
      }else{
        console.log('no hay datos que mostrar (ID)');
      }
    });
}
  getData(doc){
  this.all=doc;
  console.log('aqui',this.all)
}
}

