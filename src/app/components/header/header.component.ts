import { Component, OnInit } from '@angular/core';
import { DatapeerService } from '../../providers/datapeer.service';
import { ComponentComunicationService } from '../../providers/component-comunication.service'

const path = require('path');
const url = require('url');
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
 
})
export class HeaderComponent implements OnInit {
  

  constructor(
    private datapeer:DatapeerService,
    public compComu:ComponentComunicationService
   ) { 
      
    }
  
  ngOnInit() {
    this.datapeer.peerId();
  }
  //Envio de dato a la base
 cerrarMainNav(){ 
   this.compComu.openNav= !this.compComu.openNav;
   this.compComu.openClose= true;
 }
 abrirChat(){
  this.compComu.openClose= !this.compComu.openClose;
  this.compComu.openNav= false;
 }
}
