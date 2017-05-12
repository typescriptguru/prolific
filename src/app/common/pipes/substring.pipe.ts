import { Pipe } from '@angular/core';

@Pipe({
  name: 'substring'
})
export class SubstringPipe {
  transform(string: string, length: number = 10) {
    return string.length <= length ? string : string.substring(0, length) + '...';
  }
}
