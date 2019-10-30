import { Component, OnInit } from '@angular/core';
import { DatapeerService } from '../../providers/datapeer.service';
import { ComponentComunicationService } from '../../providers/component-comunication.service'
import { PeerconnectService } from '../../providers/peerconnect.service'
import { FireService } from '../../providers/fire.service'
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
 
})
export class HeaderComponent implements OnInit {
  constructor(
    private datapeer:DatapeerService,
    public peerConnect:PeerconnectService,
    public fire:FireService,
    public compComu:ComponentComunicationService,
    private modalService: NgbModal,
    public toastr:ToastrService,
    config: NgbModalConfig
   ) { 
    config.backdrop = 'static';
    config.keyboard = false;
    }
  
  ngOnInit() {
  }
  //Envio de dato a la base
 cerrarMainNav(){ 
   this.compComu.openNav= !this.compComu.openNav;
   this.compComu.openClose= true;
 }
 abrirChat(){
  this.compComu.openClose= !this.compComu.openClose;
  this.compComu.openNav= false;
  //this.datapeer.findContacts()
 }
 open(content) {
  this.modalService.open(content);
}
saveContact(){
  this.fire.getKey(this.compComu.contact).subscribe(async contact=>{
    let data=contact.payload.data()
  console.log(contact.payload.data())
  if(data==null){
    this.toastr.error('El usuario no existe','Error')
  }else{
    await this.datapeer.addContact(data)
    this.datapeer.user.contacts.push(data) 
    this.modalService.dismissAll('Save click')
  }
  })
}

}
