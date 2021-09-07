import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arr: any[] | null, key: string): any[] | null {
    return arr.filter(item =>
      item.name.toLowerCase().includes(key.toLowerCase())
      || item.type.toLowerCase().includes(key.toLowerCase()));
  }

}
