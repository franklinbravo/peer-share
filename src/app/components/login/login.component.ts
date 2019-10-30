import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { FireService } from '../../providers/fire.service'
import {Router} from '@angular/router'
import { PeerconnectService } from '../../providers/peerconnect.service'
import { DatapeerService} from '../../providers/datapeer.service';
import { ComponentComunicationService} from '../../providers/component-comunication.service';
import { ToastrService } from 'ngx-toastr'
import { User } from '../../models/user-data'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  hide:boolean=true;
  blockForm:boolean=false;
  constructor(private fb: FormBuilder, 
    public fireService:FireService,
    private router:Router,
    private dataPeer:DatapeerService,
    public toastr:ToastrService,
    public comComp:ComponentComunicationService,
    public peerConnect:PeerconnectService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      'username': ['',Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'pwd':['',[Validators.required]]
    });
  }
  
  login(){
    this.dataPeer.find(this.myForm.value.username,this.myForm.value.pwd,(err,doc:Array <User>)=>{
      if(doc===[] || doc.length<=0){
        this.toastr.error('Contraseña o correo invalidos','Datos Invalidos')
        console.log('no hay nada')
      }else{
        
        this.dataPeer.user={
          name:doc[0].name,
          lastname:doc[0].lastname,
          user:doc[0].dataLog.username,
          id:doc[0]._id,
          contacts:doc[0].contacts
        } 
        this.peerConnect.getPeerId(doc[0].dataLog.username)
        this.comComp.logged=true;
        this.router.navigate(['/horario'])
        console.log(doc,'doc of find','and',this.dataPeer.user)
      }
    }) 
  }
}
