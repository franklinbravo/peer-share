import {Component, OnInit, ViewChild} from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {DataSource} from '@angular/cdk/collections';
import { MatTable } from '@angular/material';
import {MatSort} from '@angular/material/sort';
import { Observable, of as observableOf} from 'rxjs';
import {Sort} from '@angular/material/sort';
let json={
  "nameMateria": "Matematica",
  "unidades": [
      {
          "titulo": "Baldor esta loco",
          "contenido": "Ni se si asi se escribe su nombre pero que as da jejejejejej",
          "fechas": [
              {
                  "tipo": "clase",
                  "fecha": "2019-09-09",
                  "ponderacion": 0
              },
              {
                  "tipo": "taller",
                  "fecha": "2019-09-11",
                  "ponderacion": "5"
              },
              {
                "tipo": "taller",
                "fecha": "2019-09-16",
                "ponderacion": "10"
            },
            {
              "tipo": "taller",
              "fecha": "2019-09-16",
              "ponderacion": "5"
          },{
            "tipo": "parcial",
            "fecha": "2019-09-16",
            "ponderacion": "15"
        }
          ]
      },
      {
          "titulo": "El mundo esta loco",
          "contenido": "Aqui no se enseña ingles",
          "fechas": [
              {
                  "tipo": "taller",
                  "fecha": "2019-09-18",
                  "ponderacion": "10"
              },
              {
                  "tipo": "clase",
                  "fecha": "2019-09-23",
                  "ponderacion": 0
              },
              {
                "tipo": "parcial",
                "fecha": "2019-09-25",
                "ponderacion": "15"
            },{
              "tipo": "parcial",
              "fecha": "2019-09-29",
              "ponderacion": "15"
          },{
            "tipo": "parcial",
            "fecha": "2019-09-21",
            "ponderacion": "10"
        },
        {
          "tipo": "parcial",
          "fecha": "2019-09-29",
          "ponderacion": "10"
      },
      {
        "tipo": "parcial",
        "fecha": "2019-09-20",
        "ponderacion": "10"
    }
          ]
      }
  ],
  "hours": [
      {
          "start": {
              "hour": 7,
              "minute": 0
          },
          "end": {
              "hour": 8,
              "minute": 30
          }
      },
      {
          "start": {
              "hour": 7,
              "minute": 0
          },
          "end": {
              "hour": 20,
              "minute": 30,
              "second": 0
          }
      }
  ]
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  @ViewChild('table',{static:false}) table: MatTable<[]>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
    dataform
    filterNotes=''
    form: FormGroup;
    displayedColumns: string[] = [];
    columnsToDisplay: string[];
    options: any[]=[]
    typeNote:any[]=['Alfabetico','Numerico']
  sortedData
    
  constructor(private fb: FormBuilder){
    
  }
  ngOnInit(): void {
    json.unidades.forEach(e=>{
      e.fechas.forEach(a=>{
        if(a.tipo!='clase'){
          
          let f=a.fecha.substr(5)
          let num=parseInt(a.ponderacion.toString())
          let asd;
          if(num<10){
            asd=`${a.tipo} *0${a.ponderacion}%* ${f}`
          }else{
            asd=`${a.tipo} *${a.ponderacion}%* ${f}`
          }
          this.displayedColumns.push(asd)
        }
      })
    })
    
    this.columnsToDisplay= this.displayedColumns.slice();
    this.columnsToDisplay.unshift('name')
    this.columnsToDisplay.push('star')
    this.createForm()
    this.createOptionsNum()
    //this.dataSource= new FormDataSource(this.form); 
  }
  
  toFormGroup(data:string[],name:string,lastname:string){
    let group: any = {
      name:new FormControl(`${name} ${lastname}`)
    };
    data.forEach(e=>{
      if(e!='name'){
        group[e]= new FormControl('')
      }
      
    })
    return new FormGroup(group); 
  }
  createForm(){
    this.form = this.fb.group({
      notes: this.fb.array([
        this.toFormGroup(this.displayedColumns,'Franklin','Bravo'),
        this.toFormGroup(this.displayedColumns,'Natbeth','hereira'),
        this.toFormGroup(this.displayedColumns,'Vivian','Davila'),
        this.toFormGroup(this.displayedColumns,'Veronica','Bravo'),
        this.toFormGroup(this.displayedColumns,'otro','nose'),
      ])
    });
    console.log(this.form)
    this.form.valueChanges.subscribe(console.log);
  }
  
  get notes(): FormArray{
    return this.form.get('notes') as FormArray;
  }
  deleteStudient(e){
    
    const controlArray = this.form.value['notes'];
    let j=0
    let indice
    controlArray.forEach(obj=>{
      if(obj.name==e.value.name){
        indice=j;
      }
      j++;
    })
    const control = <FormArray>this.form.controls['notes'];
    control.removeAt(indice)
    this.table.renderRows()
    this.filterNotes=''
  }
  async addStudient(){
    const control = await <FormArray>this.form.controls['notes'];
    await control.push(this.toFormGroup(this.displayedColumns,'Adelis','Trocoso'))
    this.table.renderRows()
    this.filterNotes='Adelis'
  }
  createOptionsNum(){
    let op=[]
    for(let i=1; i<=20;i++){
      if(i<10){
        op.push(`0${i}`)
      }else{
        op.push(`${i}`)
      }
      
    }
    op.push('NP')
    this.options=op;
  }
  createOptionsWords(){
    this.options=['A+','A','B+','B','C','D','F']
  }
  changeOptions(e){
    this.form.reset()
    this.createForm()
    if(e.value=='Alfabetico'){
      this.createOptionsWords()
    }
    else if(e.value=='Numerico'){
      this.createOptionsNum()
    }
  }
  save(){
    console.log(this.form.value)
  }

  sortData(sort: Sort) {
    const data = this.form.value['notes']
    if (!sort.active || sort.direction === '') {
      this.form.controls['notes'];
      return;
    }
    
    data.sort((a, b) => {
      const isAsc = sort.direction === 'asc'; 
      if(sort.active){
        const aValue = a[sort.active];
        const bValue = b[sort.active];
        return compare(aValue, bValue, isAsc);
      } 
    });
    this.form.controls['notes'].patchValue(data)
    //this.form.setControl('notes', data);
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
export class FormDataSource extends DataSource<any> {
  constructor(private a){
    super()
  }
  connect(): Observable<any> {

    return observableOf(this.a);  
  }

  disconnect() {}
}
