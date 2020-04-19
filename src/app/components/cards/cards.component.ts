import { Component, OnInit } from '@angular/core';
import { DatapeerService } from '../../providers/datapeer.service'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
elevation=true;
cards=[{
  nameClass:"matematica",
  numUni:5,
  id:"efrhweiurhoi"
},
{
  nameClass:"matematica",
  numUni:5,
  id:"yg9g6oi"
},{
  nameClass:"matematica",
  numUni:5,
  id:"tgvytrhoi"
},{
  nameClass:"matematica",
  numUni:5,
  id:"efrhweiurhoi"
}]
  constructor(
    private dataPeer:DatapeerService,
    public toastr:ToastrService,
    private router:Router,) { }

  ngOnInit() {
    this.getSubject()
  }
  getSubject(){
    this.dataPeer.getSubject(data=>{
      this.cards=data;
    })
  }
  copy(id){
    let aux = document.createElement("input");
    aux.setAttribute("value", id);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    this.toastr.success('Copiado','Codigo copiado al portapapeles')
    console.log(id)
  }
  notesEdit(id){
    this.router.navigate(['/notes',id])
  }
  delete(id){
    this.dataPeer.deleteSubject(id)
    this.getSubject()
  }
}
