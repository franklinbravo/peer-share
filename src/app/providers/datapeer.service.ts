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
    }],
    chat:[{}]
  } 
  db:Datastore;
  userDataPath:any;
  dbCache: Datastore;
  dbChat: Datastore;
  dir
  constructor(private _electronService: ElectronService,
  public peerConnect:PeerconnectService  ) {
    this.userDataPath = this._electronService.remote.app.getPath('userData');
    this.db = new Datastore({filename: path.join(this.userDataPath,'db',"userdata.db"),autoload:true})
    this.dbChat= new Datastore({filename: path.join(this.userDataPath,'db',"messages.db"),autoload:true})
    this.dbCache=new Datastore({filename: path.join(this.userDataPath,'db',"cache.db"),autoload:true})
    this.dir=path.join(homedir(),'.PeerShare')
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
  async addSubject(data,id,cb){
    /*
    if (!this._electronService.fs.existsSync(dir)){
      await this._electronService.fs.mkdirSync(dir);
    }
    let newData=JSON.stringify(data)
    this._electronService.fs.writeFileSync(path.join(dir,`${name}.json`), newData, 'utf-8')
    console.log(this.user)*/
    let Rclass={
      id,
      nameClass:data.nameMateria,
      numUni:data.unidades.length,
      data
    }
    this.db.update({_id:this.user.id},{$push:{class:Rclass}},{},(err,doc)=>{
      if(err){
        console.log(err) 
        cb('Hubo un error al intentar guardar esta clase','Error')
      }else{
        cb('Clase Guardada','Exito')
      console.log(doc,'Clase guardada') 
      }
    })
  }
  showSubject(cb){
    this.dbCache.find({},(err,doc)=>{
      cb(doc)
    })
  }
  deleteSubject(id){
    this.db.update({_id:this.user.id }, { $pull: { class: {id} } }, {}, ()=> {
      // Now the fruits array is ['orange', 'pear']
    });
  }
  addContact(contact,cb?){
    this.createChat(this.user.dataLog,contact,id=>{
      contact['id']=id;
      this.db.update({_id:this.user.id},{$push:{contacts:contact}},{},(err,doc)=>{
        if(err) throw err;
        console.log(doc,'contacto guardado')
        cb(id)
      })
    })
    
  }

  createUser(data:User,cb){
    console.log(data)
    this.db.insert(data,(err,docs)=>{
      if(err) throw err
      
      cb('Usuario Guardado')
      console.log('Base de datos creada: ',docs)
  })
}
  createChat(dataLog,user,cb){
    let data={
      dataLog,
      user,
      chat:[]
    }
    this.dbChat.insert(data,(err,doc:any)=>{
      cb(doc._id)
      console.log(doc)
    })
  }
  getChat(id,cb){
    this.dbChat.findOne({_id:id},(err,doc:any)=>{
      if(err) throw err;
      console.log(doc)
      console.log(doc.chat)
      // let UserIndex=doc.map(e=>{ return e.user.username}).indexOf(user)
      //cb(doc[UserIndex].chat)
      cb(doc.chat)
    })
  }
  saveMsg(msg,id,user?){
    if(id){
      this.dbChat.update({_id:id}, {$push:{chat:msg}}, {},(err,doc)=>{
        if(err) throw err
        console.log(doc)
      })
    }else{
      this.addContact(user,id=>{
        this.saveMsg(msg,id)
      })
      
    }
    
  }
/*async findContacts(){
  await this.db.find({_id:this.user.id},(err, doc:Array<User>)=>{
    this.user.contacts=doc[0].contacts;
  })
}*/
  find(username:string,pwd:string,cb){
    this.db.find({dataLog:{username:username,pwd:pwd}}, (err, doc:Array<User>)=>{
      cb(err,doc)
    })
}
deleteData(){ 
  this.db.remove({_id:this.user.id}, { multi: true }, function(err, numDeleted) {  
    console.log('Deleted', numDeleted, 'user(s)');
 });
}
  
}

