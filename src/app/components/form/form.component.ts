import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatapeerService } from '../../providers/datapeer.service';
import { Ctrlclass } from '../../models/ctrlclass';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { FireService } from '../../providers/fire.service'
import {EncrDecrService }from '../../providers/encr-decr.service';
import { User} from '../../models/user-data'
import { ToastrService } from 'ngx-toastr';
import { Router} from '@angular/router'
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    
  }
  
  myForm: FormGroup;
  hide:boolean=true;  
  datos:Ctrlclass ;
  constructor(public datapeerservice:DatapeerService,
    private fb: FormBuilder, private crypto:EncrDecrService,
    private fire:FireService,
    public toastr:ToastrService,
    public router:Router ) { }
  
  ngOnInit() {
    //this.datapeerservice.create();
    this.createForm();
    
    //this.myForm.valueChanges.subscribe(console.log); 
  } 
  createForm() {
    this.myForm = this.fb.group({
      'name': ['',Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'lastname': ['',Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'username': ['',Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'email': ['',Validators.compose([Validators.required, Validators.email])],
      'pwd':['',[Validators.required]],
      'terms':['',[Validators.requiredTrue]]
    });
  } 
async  save(){ 
  let keys=await this.crypto.generateKey()
  let data:User={
    name:this.myForm.value.name,
    lastname:this.myForm.value.lastname,
    dataLog:{
      username:this.myForm.value.username,
      pwd:this.myForm.value.pwd
    },
    terms:this.myForm.value.terms,
    keyPriv:keys.keyPriv,
    keyPub:keys.keyPub,
    contacts:[],
    class:[]
  }
  let verify=await this.fire.verifyUser(data).subscribe(dat=>{
    console.log(dat.payload.data())
    
    if(dat.payload.exists===true){
      verify.unsubscribe()
      this.toastr.error('El usuario ya existe','Error')
    }else{
      this.fire.saveKey(data).then(doc=>{
        this.datapeerservice.createUser(data,(info) =>{
          this.toastr.success('Usuario Registrado','Listo')
          this.toastr.success(info,'Listo')
          this.router.navigate(['/login'])
          verify.unsubscribe()
          this.ngOnDestroy()
        })
      }).catch(err=>{
        console.log(err)
      })
    }
  })
  //Creacion de llave para encriptar
  //this.fire.register(this.myForm.value.email,this.myForm.value.pwd)
  }
  delete(){
    this.datapeerservice.deleteData();
  }
  desencryp(){

  }
}
