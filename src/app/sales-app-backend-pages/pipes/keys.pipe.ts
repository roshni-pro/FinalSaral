import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value: any): any {
    console.log("Pipe works ", typeof value);
    return typeof value;
  }

}

