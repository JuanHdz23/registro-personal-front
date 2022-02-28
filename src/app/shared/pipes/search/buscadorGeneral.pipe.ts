import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';

@Pipe({ name: 'BuscadorGeneralSearchPipe', pure: false })
export class BuscadorGeneralSearchPipe implements PipeTransform {

  public removeAccents(str): string {
    // console.log('str :>> ', str);
    if (str) {
      return str.normalize('NFD')
        .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
        .normalize();
    }

  }

  transform(registros: any, searchTerm: string, defaultFilter: boolean): Array<any> {
    //console.log('registros :>> ', registros);
    if (!searchTerm) {
      return registros;
    }

    if (!Array.isArray(registros)) {
      return registros;
    }

    if (searchTerm && Array.isArray(registros)) {
      let filterKeys = Object.keys(searchTerm);

      if (defaultFilter) {
        return registros.filter(item =>
          filterKeys.reduce((x, keyName) =>
            (x && new RegExp(this.removeAccents(searchTerm[keyName]), 'gi').test(this.removeAccents(item[keyName]))) || searchTerm[keyName] == "", true));
      }
      else {
        return registros.filter(it => {
          return filterKeys.some((key) => {
            return new RegExp(this.removeAccents(searchTerm[key]), 'gi').test(this.removeAccents(it[key])) || searchTerm[key] == "";
          });
        });
      }
    }
  }

}

@Pipe({ name: 'ElementoSearchPipe', pure: false })
export class ElementoSearchPipe implements PipeTransform {

  public removeAccents(str): string {

    return str.normalize('NFD')
      .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
      .normalize();

  }

  transform(value, args?): Array<any> {
    let searchText = new RegExp(this.removeAccents(args), 'ig');
    if (value) {
      return value.filter(registros => {
        if (registros.Expediente) {
          return this.removeAccents(registros.Expediente).search(searchText) !== -1;
        }
        else {
          return registros.Expediente.search(searchText) !== -1;
        }
      });
    }
  }

}

