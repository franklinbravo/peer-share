import { Component, OnInit ,PipeTransform, Input} from '@angular/core';

import { PeerconnectService } from '../../providers/peerconnect.service';
import { DatapeerService } from '../../providers/datapeer.service';
import { EncrDecrService } from '../../providers/encr-decr.service';
import { ComponentComunicationService } from '../../providers/component-comunication.service'
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
interface contact {
  name: string;
  lastname:string;
  _id:string;
  status: boolean;
}
let users:contact[]=[
  {
    name:'Franklin',
    lastname:'Bravo',
    _id: 'iafiaeufie00',
    status:true
  },
  {
    name:'hiwumhc',
    lastname:'wrfcr',
    _id: 'iafiaeufie00',
    status:true
  },
  {
    name:'cwrijnvpri',
    lastname:'wrfcr',
    _id: 'iafiaeufie00',
    status:true
  },
  {
    name:'cwrijnvpri',
    lastname:'wrfcr',
    _id: 'iafiaeufie00',
    status:true
  },
  {
    name:'cwrijnvpri',
    lastname:'wrfcr',
    _id: 'iafiaeufie00',
    status:true
  },
  {
    name:'cwrijnvpri',
    lastname:'wrfcr',
    _id: 'iafiaeufie00',
    status:true
  },
  {
    name:'cwrijnvpri',
    lastname:'wrfcr',
    _id: 'iafiaeufie00',
    status:true
  },
  {
    name:'cwrijnvpri',
    lastname:'wrfcr',
    _id: 'iafiaeufie00',
    status:true
  },
  {
    name:'cwrijnvpri',
    lastname:'wrfcr',
    _id: 'iafiaeufie00',
    status:true
  },
  {
    name:'cwrijnvpri',
    lastname:'wrfcr',
    _id: 'iafiaeufie00',
    status:true
  },
  {
    name:'ultimo',
    lastname:'wrfcr',
    _id: 'iafiaeufie00',
    status:true
  }
];
function search(text: string, pipe: PipeTransform): contact[] {
  return users.filter(user => {
    const term = text.toLowerCase();
    return user.name.toLowerCase().includes(term)
        || user.lastname.toLowerCase().includes(term)
        //|| pipe.transform(user.lastname).includes(term)
  });
}
type MyArrayType = Array<{quien: string, msgs: string}>;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [DecimalPipe]
})
export class ChatComponent implements OnInit {
  contacts$: Observable<contact[]>;
  filter = new FormControl('');  
  hiddenaux:string='noactivo';
  
  chat: MyArrayType = [];
  
  messageLog: string = "Log:\n\n";
  @Input('_abrirChat') public ch: boolean;
  msg:any; 
  msgid:any;
  idpeer:any;
  constructor(pipe: DecimalPipe,
    public peerconnect: PeerconnectService,
    public datapeer:DatapeerService,
    private crypto:EncrDecrService,
    public compComu:ComponentComunicationService
  ) {
    this.contacts$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(text, pipe))
    );
  }

  ngOnInit() {
    
  }
  ngDoCheck(){
    this.chat=this.peerconnect.chat;
  }

  enviar(){
  this.peerconnect.sendMsg(this.msg);
  this.msg = "";
}
  minimizar(){
    this.compComu.openClose= !this.compComu.openClose;
}
}

 
