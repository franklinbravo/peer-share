import { Component, PipeTransform } from '@angular/core';
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
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  providers: [DecimalPipe]
})
export class ContactsComponent {

contacts$: Observable<contact[]>;
filter = new FormControl('');

constructor(pipe: DecimalPipe) {
  this.contacts$ = this.filter.valueChanges.pipe(
    startWith(''),
    map(text => search(text, pipe))
  );
}

  ngOnInit() {
  }
 
}
