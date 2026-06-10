import { AfterViewInit, Component, ElementRef, OnDestroy, signal, viewChild, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import tippy, { Instance } from 'tippy.js';



@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayout implements AfterViewInit, OnDestroy {


  tooltip = viewChild<ElementRef<HTMLInputElement>>('tooltip');
  tooltipInstance?: Instance;


  ngAfterViewInit(): void {


    this.tooltipInstance = tippy(this.tooltip()?.nativeElement!, {
       content: "<strong>Bolded <span class='text-red-600' >content</span></strong>",
      placement: 'bottom',

      theme: 'light',
        allowHTML: true,
    });

    console.log(this.tooltipInstance);
  }


   ngOnDestroy(): void {
    this.tooltipInstance?.destroy();
  }




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
