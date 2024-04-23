import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'city',
    standalone: true
})
export class CityPipe implements PipeTransform {
  transform(value: string, format = 'long'): string {
    let short = '';
    let long = '';

    switch (value) {
      case 'Graz':
        short = 'GRZ';
        long = 'Flughafen Graz Thalerhof';
        break;
      case 'Hamburg':
        short = 'HAM';
        long = 'Flughafen Hamburg';
        break;
      default:
        short = value;
        long = value;
    }

    if (format === 'short') {
      return short;
    }

    return long;
  }
}
