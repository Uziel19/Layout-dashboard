import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-conten-register',
  imports: [],
  templateUrl: './conten-register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContenRegister {



copiedField = signal<'email' | 'password' | 'link' | 'all' | null>(null);
  showSuccessModal = signal(false);
  showPassword = signal(false);

  registeredUser = signal({
    email: '',
    password: '',
    accessLink: '',
  });

  registerUser() {
    // Aquí normalmente consumirías tu API.
    // Este ejemplo simula la respuesta después de registrar.

    const response = {
      email: 'juan.medina@example.com',
      password: 'Abc123!xyz',
      accessLink: 'https://app.miempresa.com/login',
    };

    this.registeredUser.set(response);
    this.showSuccessModal.set(true);
  }

  closeModal() {
    this.showSuccessModal.set(false);
  }

  togglePassword() {
    this.showPassword.update(value => !value);
  }

copyText(value: string, field: 'email' | 'password' | 'link') {
  navigator.clipboard.writeText(value);

  this.copiedField.set(field);

  setTimeout(() => {
    this.copiedField.set(null);
  }, 1800);
}

copyAllData() {
  const user = this.registeredUser();

  const text = `
Correo electrónico: ${user.email}
Contraseña: ${user.password}
Enlace de acceso: ${user.accessLink}
  `.trim();

  navigator.clipboard.writeText(text);

  this.copiedField.set('all');

  setTimeout(() => {
    this.copiedField.set(null);
  }, 1800);
}




}
