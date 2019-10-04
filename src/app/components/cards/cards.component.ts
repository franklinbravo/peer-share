import { Component, OnInit } from '@angular/core';
import { DatapeerService } from '../../providers/datapeer.service'
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
  constructor(private dataPeer:DatapeerService) { }

  ngOnInit() {
    /*
    this.dataPeer.getSubject(cb=>{
      this.cards=cb
    })*/
  }

}
