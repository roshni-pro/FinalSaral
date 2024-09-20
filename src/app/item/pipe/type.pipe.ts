import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type'
})
export class TypePipe implements PipeTransform {

  transform(value: any): any {
    console.log("Pipe works ", typeof value);
    return typeof value;
  }
}
