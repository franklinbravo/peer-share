import { Injectable } from '@angular/core';
import {Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class ComponentComunicationService {
openClose:boolean=true;
openNav:boolean=false;
contact:string;
logged:boolean=false;
  constructor(public router:Router) {
    if(this.logged==true){
      this.router.navigate(['/horario'])
    }else{
      this.router.navigate(['/login'])
    }
   }
  
}
