import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slider'
})
export class SliderPipe implements PipeTransform {

  transform(arr: any[]): any[] | null[] {
    return arr.filter(item => item.size == '16:9').slice(arr[-5], arr[arr.length])
  }

}
