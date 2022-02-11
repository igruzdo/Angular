import { Pipe, PipeTransform } from '@angular/core';
import { items } from 'src/data/product.data';

@Pipe({
  name: 'customFilter'
})
export class CustomFilterPipe implements PipeTransform {

  transform(array: Array<any>, filterFunction?: (value: any, index: number) => boolean): Array<any> | null {

    if(!filterFunction) {
      return array;
    }

   let newArray =  array.filter(filterFunction)
    return newArray;
  }

}
