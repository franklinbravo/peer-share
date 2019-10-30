import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTable'
})
export class FilterTablePipe implements PipeTransform {
  transform(value: any, arg: any): any {
    let result=[];
    for(let user of value){
        if(arg.toLowerCase()==''){
          return result=value;
        }else{
          Object.keys(user.value).forEach(e=>{
          if(user.value[e].toLowerCase().indexOf(arg.toLowerCase())>-1){
            if(result.length<=0){
              result.push(user) 
            }else{
              let aux=0
              for(let i=0;i<result.length;i++){
                if(user.value.name == result[i].value.name){
                  aux++;
                }
              }
              if(aux<=0){
                result.push(user)
              }
            }
          }
        })
      }
    }
    
    return result;
  }
}
