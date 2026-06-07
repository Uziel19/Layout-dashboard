import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {


    fb = inject(FormBuilder);

    countryService = inject(CountryService);

    regions = signal( this.countryService.regions);

    countriesByRegion = signal<Country[]>([]);
    borders = signal<Country[]>([]);

    myForm = this.fb.group({

      region: ['', Validators.required],
      country: ['', Validators.required],
      border: ['', Validators.required]
    });

    // Se coloca un solo efecto por que solamente estan las 2 subscripciones y en este caso el efecto no es muy complicado, idealmente se busca de que tengamos efectos sencillos y sean faciles de leer.

    onFormChanged = effect((onCleanup) => { // Los effect se disparan inmediatamente despues de que el componente es montado

      const regionSubscription = this.onRegionChanged();
      const countrySubscription = this.onCountryChanged();


      onCleanup(() => {

        regionSubscription.unsubscribe();
        countrySubscription.unsubscribe();

      });

    });


    // Se crea este metodo para centralizar toda la logica que se aplica al observable para que no este directamente en el effect
    onRegionChanged() {

      return this.myForm
        .get('region')!
        .valueChanges.pipe(

          // idealmente queremos colocar taps que solo hagan especificamente un efecto secundario
          tap( () => this.myForm.get('country')!.setValue('')), // control - paises
          tap( () => this.myForm.get('border')!.setValue('')), //  control - fronteras
          tap( () => {

            this.borders.set([]); // señal - fronteras
            this.countriesByRegion.set([]); // señal - paises
           }),

          switchMap((region) =>

            this.countryService.getCountriesByRegion(region ?? '') // Observable para hacer la peticion http de los paises por continente

           )
        ).subscribe( (countries) => {



          this.countriesByRegion.set(countries); //  Se establecen los paises por continente en nuestra señal
        });

    }


    onCountryChanged() {
      return this.myForm
          .get('country')!
          .valueChanges.pipe(
            tap(() => this.myForm.get('border')!.setValue('')),
            filter( (value) => value!.length > 0),// Se coloca esto porque al cambiar la region se pone el valor de vacio al control "country"
            switchMap( (alphaCode) =>
                this.countryService.getCountryByAlphaCode(alphaCode ?? '') // Observable para obtener la informacion del pais
          ),
          switchMap( (country) => // Informacion del pais

          this.countryService.getCountryNamesByCodeArray(country.borders) // Observable para obtener la informacion de las fronteras (paises)

        )
      )
      .subscribe( (borders) => { // Informacion de las fronteras (paises)

       this.borders.set(borders);

      } );
    }





}


