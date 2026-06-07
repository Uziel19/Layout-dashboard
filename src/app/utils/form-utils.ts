import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';


async function sleep() {
  return new Promise(resolve => {

    setTimeout(() => {

      resolve(true);

    }, 2500);
  })
}

export class FormUtils {
  // Expresiones regulares

  static namePattern = '^([a-zA-Z]+) ([a-zA-Z]+)$';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors) {



    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;

        case 'min':
          return `Valor mínimo de ${errors['min'].min}`;


        case 'email':
          return `El valor ingresado no es un correo electronico `;

        case 'emailTaken':
          return `El correo electronico ya esta siendo usado por otro usuario`;

        case 'noStrider':
          return 'No se puede usar el username de strider en la app';

        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) { // Si la exReg que da error en "pattern" es la misma expReg de email que esta definida en esta clase.

            return `El valor ingresado no luce como un correo electrónico`;
          }

          return 'Error de patrón contra expresión regular'; // para que nos demos cuenta que debemos manejar el error ya que no esta definido

        default:
          return `Error de validación no controlado ${key}`
      }
    }

    return null;
  }


  // Validacion de Campos
  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  // Validacion de Campos como Arreglos

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  // Validacion: campo uno es igual a campo dos
  static isFieldOneEqualFieldTwo(field1: string, field2: string) { // De forma generica se nombran los parametros ya que podemos el dia de mañana utilizar esta misma validacion con otros campos que sean diferentes.

    return (formGroup: AbstractControl) => {

      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { passwordsNotEqual: true }
    }

  }


  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {

    console.log('Validando contra servidor');

    await sleep(); // 2 segundos y medio

    const formValue = control.value;



    if (formValue === 'hola@mundo.com') {

      return {
        emailTaken: true
      }

    }

    return null;
  }


  static notStrider(control: AbstractControl): ValidationErrors | null {

    const value = control.value;

    return value === 'strider' ? { noStrider: true } : null;

  }


}

// FormUtils.isValidField()
