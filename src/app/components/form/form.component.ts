import { Component, OnInit } from '@angular/core';
import { DatapeerService } from '../../providers/datapeer.service';
import { Ctrlclass } from '../../models/ctrlclass';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import {EncrDecrService }from '../../providers/encr-decr.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  
  myForm: FormGroup;
  hide:boolean=true;  
  datos:Ctrlclass ;
  constructor(public datapeerservice:DatapeerService,
    private fb: FormBuilder, private crypto:EncrDecrService ) { }
  
  ngOnInit() {
    //this.datapeerservice.create();
    this.createForm();
    
    //this.myForm.valueChanges.subscribe(console.log); 
  } 
  createForm() {
    this.myForm = this.fb.group({
      'name': ['',Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'lastname': ['',Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'age': ['',[Validators.required]],
      'semester':['',[Validators.required]],
      'email': ['',Validators.compose([Validators.required, Validators.email])],
      'pwd':['',[Validators.required]],
      'terms':['',[Validators.requiredTrue]]
    });
  } 
async  save(){ 
  //Creacion de llave para encriptar
    let pwd_key= await this.crypto.CreateKey(this.myForm.value.pwd,this.myForm.value.pwd)
    //crifrado de datos
    let name =await this.crypto.Encrypt_AES(this.myForm.value.name,pwd_key);
    let lastname= await this.crypto.Encrypt_AES(this.myForm.value.lastname,pwd_key);
    let age= await this.crypto.Encrypt_AES(this.myForm.value.age,pwd_key);
    let semester= await this.crypto.Encrypt_AES(this.myForm.value.semester,pwd_key);
    let email = await this.crypto.Encrypt_AES(this.myForm.value.email,pwd_key);
    let pwd= await this.crypto.Encrypt_AES(this.myForm.value.pwd,pwd_key);
    let datos;
     datos={
      name: name,
      lastname:lastname,
      age:age,
      semester:semester,
      email:email,
      pwd:pwd,
      terms:this.myForm.value.terms,
      key:pwd_key 
    }
    await console.log(datos); 
    this.datapeerservice.insertar(datos);
  }
  delete(){
    this.datapeerservice.eliminar();
  }
  desencryp(){

  }
}
