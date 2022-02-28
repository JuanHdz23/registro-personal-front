import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, l = 20): string {
    const limit = l;
    const trail = ' [ ... ]';

    if (value) {

      return value.length > limit ? value.substring(0, limit) + trail : value;
    }
    return '';
  }

}
