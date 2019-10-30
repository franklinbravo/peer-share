import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const result=[];
    for(let user of value){ 
      if(user.name.toLowerCase().indexOf(arg.toLowerCase())>-1 || user.lastname.toLowerCase().indexOf(arg.toLowerCase())>-1){
        result.push(user)
      }
    }
    return result;
  }

}
