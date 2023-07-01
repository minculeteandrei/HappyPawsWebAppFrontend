import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.substring(0, 1).toUpperCase() + value.substring(1).toLocaleLowerCase();
  }

}
