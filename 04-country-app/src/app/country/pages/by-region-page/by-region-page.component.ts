import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { NgClass } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

export type Region =
  | 'Africa'
  | 'Americas'
  | 'Asia'
  | 'Europe'
  | 'Oceania'
  | 'Antarctic';



@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent, NgClass],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

   public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

countryService =  inject(CountryService);

activatedRoute = inject(ActivatedRoute);

region = signal<Region>(this.activatedRoute.snapshot.queryParams['region'] ?? ''); // valor por defecto == 'Africa'

router = inject(Router);

countryResource = rxResource({

  request: () => ({region: this.region()}),
  loader: ({ request }) => {

    if(!request.region) return of([]);

    this.router.navigate(['/country/by-region'], {
      queryParams: {
        region: request.region
      }

    })

    return this.countryService.searchByRegion(request.region);
  }


})




}
