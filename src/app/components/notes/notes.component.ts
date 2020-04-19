import {Component, OnInit, ViewChild} from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {DataSource} from '@angular/cdk/collections';
import { MatTable } from '@angular/material';
import {MatSort} from '@angular/material/sort';
import { Observable, of as observableOf} from 'rxjs';
import {Sort} from '@angular/material/sort';
import {DatapeerService} from '../../providers/datapeer.service'
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
let json={
  "nameMateria": "Matematica",
  "unidades": [
      {
          "titulo": "Baldor esta loco",
          "contenido": "Ni se si asi se escribe su nombre pero que as da jejejejejej",
          "fechas": [
              {
                  "tipo": "Clase",
                  "fecha": "2019-09-09",
                  "ponderacion": 0
              },
              {
                  "tipo": "Taller",
                  "fecha": "2019-09-11",
                  "ponderacion": "5"
              },
              {
                "tipo": "Taller",
                "fecha": "2019-09-16",
                "ponderacion": "10"
            },
            {
              "tipo": "Taller",
              "fecha": "2019-09-16",
              "ponderacion": "5"
          },{
            "tipo": "Parcial",
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
                  "tipo": "Taller",
                  "fecha": "2019-09-18",
                  "ponderacion": "10"
              },
              {
                  "tipo": "Clase",
                  "fecha": "2019-09-23",
                  "ponderacion": 0
              },
              {
                "tipo": "Parcial",
                "fecha": "2019-09-25",
                "ponderacion": "15"
            },{
              "tipo": "Parcial",
              "fecha": "2019-09-29",
              "ponderacion": "15"
          },{
            "tipo": "Parcial",
            "fecha": "2019-09-21",
            "ponderacion": "10"
        },
        {
          "tipo": "Parcial",
          "fecha": "2019-09-29",
          "ponderacion": "10"
      },
      {
        "tipo": "Libre",
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
  ],
  notes:[]
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  @ViewChild('table',{static:false}) table: MatTable<[]>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
    myParam: string;
    dataform
    filterNotes=''
    form: FormGroup;
    showForm=false
    displayedColumns: string[] = [];
    columnsToDisplay: string[];
    options: any[]=[];
    sortedData
    modalRef:any
  closeResult: string;
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private dataPeer:DatapeerService,
    private route: ActivatedRoute
    ){
      config.backdrop = 'static';
      config.keyboard = false;
     
  }
  ngOnInit(): void {

    json.unidades.forEach((e:any)=>{
      e.fechas.forEach((a:any)=>{
        if(a.tipo!='Clase' ){
          if(a.tipo!='Libre'){
            let f=a.fecha.toString()
            let num=parseInt(a.ponderacion.toString())
            let asd;
            if(num<10){
              asd=`${a.tipo} *0${a.ponderacion}%* ${f.substr(8,15)}`
            }else{
              asd=`${a.tipo} *${a.ponderacion}%* ${f.substr(8,15)}`
            }
            this.displayedColumns.push(asd)
          }
        }
      })
    })
    this.columnsToDisplay= this.displayedColumns.slice();
    this.columnsToDisplay.unshift('name')
    this.columnsToDisplay.push('star')
    this.createForm()
    this.showForm=true;
    /*
    this.route.params.subscribe((params: any) => {
      this.myParam = params['id'] 
      this.dataPeer.getSubject((data:Array<any>)=>{
        let materia=data.filter(e=> e.id===this.myParam)[0].data;
        console.log(materia)
        if(materia.notes.length===0){
          this.newTable(materia)
        }else{
          this.form =this.fb.group({
            notes: this.fb.array(materia.notes)
          })
        }
      })
      console.log(this.myParam)
    });*/
  }
  async newTable(json:any){
    this.columnsToDisplay= json.metadata.slice();
    this.columnsToDisplay.unshift('name')
    this.columnsToDisplay.push('star')
    this.createForm()
    this.showForm=true;
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
        this.toFormGroup(this.displayedColumns,'Veronica','Bravo')
      ])
    });
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
  openModal(content){
    this.modalRef=this.modalService.open(content);
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
   async addStudent(user:object){ 
    this.modalRef.close()
    const control = await <FormArray>this.form.controls['notes'];
    await control.push(this.toFormGroup(this.displayedColumns,user['name'],user['lastname']))
    this.table.renderRows()
    this.filterNotes=user['name'];
  }
  saveNotes(){
    console.log('Guardar notas jeje',this.form.value)
    let formSave=this.fb.group({
      notes: this.fb.array(this.form.value.notes)
    })
    console.log(formSave)
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
