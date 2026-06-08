import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  placeholder = input('Buscar');
  debounceTime = input(1000);
  initialValue = input<string>(); // valor inicial

  value = output<string>();

  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');



  debounceEffect = effect( (onCleanup) => { // Se ejecuta despues que el componente se monta


    const value = this.inputValue();

    const timeout = setTimeout( () => {

      this.value.emit(value); // valor inicial
    }, this.debounceTime()); // 300ms


    onCleanup(() => {

      clearTimeout(timeout)

    })

  })




}
