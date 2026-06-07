import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent {


  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({


    // Siempre es bueno poner un valor por defecto
    gender: ['M', Validators.required], // Si no queremos un valor inicial => [, Validators.required] (asi es null o explicitamente ponemos null )
    wantNotifications: [true],
    termAndConditions: [false, Validators.requiredTrue]
  });


  onSubmit() {

   this.myForm.markAllAsTouched();
   console.log('Enviando...');

  }


}

