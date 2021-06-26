import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articleFilter'
})
export class ArticleFilterPipe implements PipeTransform {

  transform(arr: any[] | null[], key: string): any[] | null[] {
    return arr.filter(
      item => item.title.toLowerCase().includes(key.toLowerCase()));
  }

}
