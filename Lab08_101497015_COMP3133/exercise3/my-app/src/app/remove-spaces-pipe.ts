import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpaces',
})
export class RemoveSpacesPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    return value.replace(/-/g, ' ');
  }
}
