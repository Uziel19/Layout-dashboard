import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import type { Country } from '../interfaces/country.interface';

@Injectable({ providedIn: 'root' })
export class CountryService {

  private baseUrl = 'https://restcountries.com/v3.1';
  private http = inject(HttpClient);

  private _regions = [

    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'

  ]; // "_" para indicar que es una propiedad privada


  get regions(): string[] {

    return [...this._regions]; // para evitar que alguien modifique el arreglo original (_regions)

  }

  getCountriesByRegion(region: string): Observable<Country[]> {

    if (!region) return of([]); // En el caso de que la region sea vacia

    console.log({ region });

    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;

    return this.http.get<Country[]>(url);

  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country> {


    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;

    return this.http.get<Country>(url);


  }


  getCountryNamesByCodeArray(countryCodes: string[]): Observable<Country[]> {
    if(!countryCodes || countryCodes.length === 0 ) return of([]); // Yo creo que se pone esto por que la API puede regresar un "[]" o "null / undefined" (por el tema de uso de interfaces)

    const countriesRequests: Observable<Country>[]= [];

    countryCodes.forEach( (code) => {
      const request = this.getCountryByAlphaCode(code); // Observable para obtener la informacion de la frontera (pais)
      countriesRequests.push(request);
    });

   return combineLatest(countriesRequests);
  }




}
