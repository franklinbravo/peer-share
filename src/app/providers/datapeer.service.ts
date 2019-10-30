import { Injectable } from '@angular/core';
import Datastore from 'nedb'; 
import * as path from 'path';
import { ElectronService } from './electron.service';
import {PeerconnectService} from './peerconnect.service'
import { User} from '../models/user-data'
import { homedir } from 'os'
@Injectable({
  providedIn: 'root'
})
export class DatapeerService {
  user:any={
    name:'',
    lastname:'',
    user:'',
    id:'',
    contacts:[{
      name:'Franklin',
      lastname:'Bravo',
      key:'123456789'
    }]
  } 
  db:Datastore;
  userDataPath:any;
  dbCache: Datastore;
  dir
  constructor(private _electronService: ElectronService,
  public peerConnect:PeerconnectService  ) {
    this.userDataPath = this._electronService.remote.app.getPath('userData');
    this.db = new Datastore({filename: path.join(this.userDataPath,'db',"userdata.db"),autoload:true})
    this.dbCache=new Datastore({filename: path.join(this.userDataPath,'db',"cache.db"),autoload:true})
    this.dir=path.join(homedir(),'.PeerShare')
    console.log(this.dir)
    if (!this._electronService.fs.existsSync(this.dir)){
      this._electronService.fs.mkdirSync(this.dir);
    }
    
  }//85047928054075
  getSubject(cb){
    this.db.find({_id:this.user.id},(err,doc)=>{
      console.log(doc)
      cb(doc[0].class)
    })
  }
  editSubject(data,name){
    let archiveJSON=this._electronService.fs.readFileSync(path.join(this.dir,`${name}.json`),'utf-8')
    let archive=JSON.parse(archiveJSON)
    archive=data;
  }
  async addSubject(data,name,dir){
    if (!this._electronService.fs.existsSync(dir)){
      await this._electronService.fs.mkdirSync(dir);
    }
    let newData=JSON.stringify(data)
    this._electronService.fs.writeFileSync(path.join(dir,`${name}.json`), newData, 'utf-8')
    console.log(this.user)
    let Rclass={
      id:name,
      nameClass:data.nameMateria,
      numUni:data.unidades.length 
    }
    this.db.update({_id:this.user.id},{$push:{class:Rclass}},{},(err,doc)=>{
      if(err){
        console.log(err) 
      }else{
      console.log(doc,'Clase guardada') 
      }
    })
    /*
    this.dbCache.insert({data},(err,doc)=>{
      console.log(doc)
    })*/
  }
  showSubject(cb){
    this.dbCache.find({},(err,doc)=>{
      cb(doc)
    })
  }
  addContact(contact){
    this.db.update({_id:this.user.id},{$push:{contacts:contact}},{},(err,doc)=>{
      if(err){
        console.log(err) 
      }else{
      console.log(doc,'contacto guardado') 
      }
    })
  }

  createUser(data:User,cb){
    console.log(data)
    this.db.insert(data,(err,docs)=>{
      if(err){
      //console.log(err)
      }else{
        cb('Usuario Guardado')
        console.log('Base de datos creada: ',docs)
    }
  })
}
getChat(username,cb){
  let index
  this.db.findOne({_id:this.user.id},(err,doc:any)=>{
    index=doc.contacts.map(e=>{
      return e.username
    }).indexOf(username)
    cb(doc.contacts[index],index)
  })
}
saveMsg(i,msg){
  let user=`contacts[${i}].chat`
  this.db.update({_id:this.user.id}, {$set : { user :  msg,}}, {},(err,doc)=>{
    console.log(err,doc)
  })
}
/*async findContacts(){
  await this.db.find({_id:this.user.id},(err, doc:Array<User>)=>{
    this.user.contacts=doc[0].contacts;
  })
}*/
async find(username:string,pwd:string,cb){
  await this.db.find({dataLog:{username:username,pwd:pwd}}, async (err, doc:Array<User>)=>{
    await cb(err,doc)
  })
}
deleteData(){ 
  this.db.remove({_id:this.user.id}, { multi: true }, function(err, numDeleted) {  
    console.log('Deleted', numDeleted, 'user(s)');
 });
}
  
}

