import {
  Component,
  OnInit
} from '@angular/core';
import {
  eachDay,
  format
} from 'date-fns';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncrDecrService } from '../../providers/encr-decr.service'
import { DatapeerService } from '../../providers/datapeer.service'
import { FileShareService } from '../../providers/file-share.service'
import * as path from 'path';
import { homedir } from 'os'


@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
  
})

export class PlansComponent implements OnInit {
  //unidades:number;
  
  //domingo
  timeI1 = {hour: 7, minute: 0 };
  timeF1 = {hour: 8, minute: 30};
  meridianI1 = true;
  meridianF1 = true;
  // lunes
  timeI2 = {hour: 7, minute: 0};
  timeF2 = {hour: 8, minute: 30};
  meridianI2 = true;
  meridianF2 = true;
  // martes
  timeI3 = {hour: 7, minute: 0};
  timeF3 = {hour: 8, minute: 30};
  meridianI3 = true;
  meridianF3 = true;
  //miercoles
  timeI4 = {hour: 7, minute: 0};
  timeF4 = {hour: 8, minute: 30};
  meridianI4 = true;
  meridianF4 = true;
  //jueves
  timeI5 = {hour: 7, minute: 0};
  timeF5 = {hour: 8, minute: 30};
  meridianI5 = true;
  meridianF5 = true;
  //viernes 
  timeI6 = {hour: 7, minute: 0};
  timeF6 = {hour: 8, minute: 30};
  meridianI6 = true;
  meridianF6 = true;
  //sabado
  timeI7 = {hour: 7, minute: 0};
  timeF7 = {hour: 8, minute: 30};
  meridianI7 = true;
  meridianF7 = true;
  ///////////////////////
  //
  dom =false;
  lun =false;
  mar =false;
  mie =false;
  jue =false;
  vie =false;
  sab =false;
  /////////////////
  result: any[] = [];

  inicioS:any;
  finalS:any;
  events: string[] = []; 
  nUni:number=0;
  show:boolean=false;
  form: FormGroup;
  ini: any;
  fini: any;
  btn_on: boolean;
  hours:Array <object>=[];
  dateE:Array <Array <any>>=[];
  
  constructor(private fb: FormBuilder, 
    private dataPeer:DatapeerService,
    private crypto:EncrDecrService,
    private share:FileShareService 
    ) {
    
  }
  
  ngOnInit() {
    
  }
  Organizador() {
    let a=0;
    for(let i=0;i<this.dateE.length;i++){
      for(let j=0;j<this.dateE[i].length;j++){
        let aux=this.events[a];
        this.dateE[i][j]=aux;
        a++;
      }
    }
  }
  ngDoCheck(){
    
    if(this.dom==true ||this.lun==true || this.mar==true || this.mie==true || this.jue==true || this.vie==true || this.sab==true){
      if(this.ini){
        if(this.fini){
          this.btn_on=true;
          }else{
            this.btn_on=false;
            }
        }else{
          this.btn_on=false;
          }
    }
  }
  
 async createForm(){
    
    this.form = await this.fb.group({
      nameMateria: ['',Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      'unidades': this.fb.array([
        this.initX()
      ])
    });
    this.Organizador()
    //this.form.valueChanges.subscribe(console.log);
  }
  
  
  initX() {
    this.nUni++;
    this.dateE.push(['']);
    this.Organizador();
    return this.fb.group({
      //  ---------------------forms fields on x level ------------------------
      'titulo': [''],
      // ---------------------------------------------------------------------
      'contenido': [''],
      'fechas': this.fb.array([
        this.initY()
      ])
    });
    
  }

  initY() {
    
    return this.fb.group({
      //  --------------------------------------------------------------------
      'tipo': ['Clase'],
      'fecha': [],
      'ponderacion': [0]
      // ---------------------------------------------------------------------
       
    })
    
  }
  addX() {
    this.Organizador();
    const control = <FormArray>this.form.controls['unidades'];
    control.push(this.initX());
  }


  addY(ix,iy) {
    
    this.dateE[ix].push('');
    const control = (<FormArray>this.form.controls['unidades']).at(ix).get('fechas') as FormArray;
    control.push(this.initY());
    this.Organizador();
  }
  deleteFechas(ix,i) {
    this.dateE[ix].pop();
    this.Organizador();
    const control = (<FormArray>this.form.controls['unidades']).at(ix).get('fechas') as FormArray;
    control.removeAt(i); 
  }
  deleteDatos(i) {
    this.nUni--;
    this.dateE.pop();
    this.Organizador();
    const control = <FormArray>this.form.controls['unidades'];
    control.removeAt(i);
  }
  

  generate(inicio,final) {
    
    if(this.btn_on){
      this.result = eachDay(
        new Date(inicio.value),
        new Date(final.value),
      )
      if(this.nUni>0){
        this.addX();
        this.Organizador();
        console.log(this.dateE)
      }else{
        this.result.forEach(element => {
          let e:string=element.toString();
          let aux=e.substr(0,3);
          if(this.dom){
            if(aux=="Sun"){
            this.events.push(element);
            }
          }
          if(this.lun){
            if(aux=="Mon"){
              this.events.push(element);
            }
          }
          if(this.mar){
            if(aux=="Tue"){
              this.events.push(element);
            }
          }
          if(this.mie){
            if(aux=="Wed"){
              this.events.push(element);
            }
          }
          if(this.jue){
            if(aux=="Thu"){
              this.events.push(element);
            }
          }
          if(this.vie){
            if(aux=="Fri"){
              this.events.push(element);
            }
          }
          if(this.sab){
            if(aux=="Sat"){
              this.events.push(element);
            }
          }
        });
          this.createForm();
          
          this.show=true;
    }
      //console.log(this.events);
    }  
  }
  
  insertHours(start,mStrat,finish,mFinish){
    if(!mStrat){
      start.hour=start.hour+12;
    }
    if(!mFinish){
      finish.hour=finish.hour+12;  
    }
    let date={
      start:start,
      end:finish
    }
    this.hours.push(date)
  }
  async save(){
    this.hours=[];
    if(this.dom){
      this.insertHours(this.timeI1,this.meridianI1,this.timeF1,this.meridianF1)
    }
    if(this.lun){
      this.insertHours(this.timeI2,this.meridianI2,this.timeF2,this.meridianF2)
    }
    if(this.mar){
      this.insertHours(this.timeI3,this.meridianI3,this.timeF3,this.meridianF3)
    }
    if(this.mie){
      this.insertHours(this.timeI4,this.meridianI4,this.timeF4,this.meridianF4)
    }
    if(this.jue){
      this.insertHours(this.timeI5,this.meridianI5,this.timeF5,this.meridianF5)
    }
    if(this.vie){
      this.insertHours(this.timeI6,this.meridianI6,this.timeF6,this.meridianF6)
    }
    if(this.sab){
      this.insertHours(this.timeI7,this.meridianI7,this.timeF7,this.meridianF7)
    }
    let data =this.form.value
    data.hours=this.hours;
    console.log(data,'aqui')
    let date=format(new Date(),'DD/MM/YYYY') 
    let dir=path.join(homedir(),'.PeerShare',this.form.value.nameMateria)
    let datahash=this.crypto.createHash(`${this.form.value.nameMateria}${date}`)
    this.dataPeer.addSubject(data,datahash,dir) 
    this.share.execAction({ type: 'TRY_ADD_DAT', path:dir})
  }
}
