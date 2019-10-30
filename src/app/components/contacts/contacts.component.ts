import { Component} from '@angular/core';
import { ComponentComunicationService} from '../../providers/component-comunication.service'
import {DatapeerService} from '../../providers/datapeer.service'
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

  constructor(
    public compComu:ComponentComunicationService,
    private dataPeer:DatapeerService
    ) {
    
  }
}