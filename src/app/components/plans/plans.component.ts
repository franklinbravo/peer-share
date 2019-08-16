import {
  Component,
  OnInit
} from '@angular/core';
import {
  eachDay,
  format
} from 'date-fns';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {Ctrlunidades} from '../../models/ctrlunidades'
type dataUnidades = Array<Ctrlunidades>;
@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
  
})
export class PlansComponent implements OnInit {
  unidades:number;
  
  //domingo
  timeI1 = {hour: 7, minute: 0};
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

  inicioS:any= format(
    'MM/DD/YYYY'
  )
  finalS:any= format(
    'MM/DD/YYYY'
  )
  events: string[] = []; 
  nUni:number=0;
  show:boolean=false;
  form: FormGroup;
  ini: any;
  fini: any;
  btn_on: boolean;
  constructor(private fb: FormBuilder) {
    //this.createForm();
    
  }
  
  ngOnInit() {
    
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
  
  createForm(){
    this.form = this.fb.group({
      nameMateria: [''],
      'Xs': this.fb.array([
        this.initX()
      ])
    });
    //this.form.valueChanges.subscribe(console.log);
  }
  
  
  initX() {
    let aux=this.events.shift();

    return this.fb.group({
      //  ---------------------forms fields on x level ------------------------
      'titulo': [''],
      // ---------------------------------------------------------------------
      'contenido': [''],
      'Ys': this.fb.array([
        this.initY(aux)
      ])
    });
  }

  initY(n) {
    return this.fb.group({
      //  ---------------------forms fields on y level ------------------------
      Y1: ['clase'],
      'Y2': [n],
      'Y3': ['']
      // ---------------------------------------------------------------------
       
    })
  }
  addX() {
    const control = <FormArray>this.form.controls['Xs'];
    control.push(this.initX());
  }


  addY(ix) {
    let aux=this.events.shift();
    let aux2=aux;
    this.result.unshift(aux2);
    const control = (<FormArray>this.form.controls['Xs']).at(ix).get('Ys') as FormArray;
    control.push(this.initY(aux));
  }
  deleteFechas(ix,i) {
    let aux=this.result.shift();
    let aux2=aux;
    console.log(aux)
    this.events.unshift(aux2)
    const control = (<FormArray>this.form.controls['Xs']).at(ix).get('Ys') as FormArray;
    control.removeAt(i);
    console.log(this.events)
  }
  deleteDatos(i) {
    const control = <FormArray>this.form.controls['Xs'];
    console.log(i)
    control.removeAt(i);
  }
  /*
  ngOnInit() {
  }
  createForm() {
    this.myForm = this.fb.group({
      nameMateria: [''],
      datos: this.fb.array([])
    });
  }
  */

  generate(inicio,final) {

    this.result = eachDay(
      new Date(inicio.value),
      new Date(final.value),
    )
     
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
    if(this.nUni>0){
      this.addX();
    }else{
      this.createForm();
      this.nUni++;
      this.show=true;
    }
    //console.log(this.result,);
    console.log(this.events);
  }
  save(){
    console.log(this.form.value);
  }
}
