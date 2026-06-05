import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayout {
  sidebarOpen = signal(false);
  profileMenuOpen = signal(false);
  openedMenu = signal<string | null>('sales');

  user = {
    initials: 'JP',
    name: 'Juan Pérez',
    role: 'Administrador',
    email: 'juan.perez@email.com',
  };

  toggleSidebar() {
    this.sidebarOpen.update(value => !value);
  }

  closeSidebar() {
    this.sidebarOpen.set(false);
  }

  toggleProfileMenu() {
    this.profileMenuOpen.update(value => !value);
  }

  closeProfileMenu() {
    this.profileMenuOpen.set(false);
  }

  toggleMenu(menu: string) {
    this.openedMenu.update(current => current === menu ? null : menu);
  }

  logout() {
    console.log('Cerrar sesión');
  }
}
