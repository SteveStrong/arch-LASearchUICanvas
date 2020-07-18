import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Short'
})
export class SentencetypePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if ( value === 'Sentence') { return 'Other'; }
    value = value.replace('Sentence', '');
    return value;
  }

}
