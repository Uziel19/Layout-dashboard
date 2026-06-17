import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type OctStatus = 'Completada' | 'Pendiente' | 'Reembolsada';

interface RecentUser {
  initials: string;
  name: string;
  email: string;
  role: 'Usuario' | 'Administrador';
  status: 'Activo';
}

interface RecentOct {
  folio: string;
  user: string;
  status: OctStatus;
  amount: string;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
})
export class Inicio {
  period = '1 al 16 de junio';

  usersSummary = {
    total: 128,
    active: 103,
    inactive: 18,
    admins: 7,
  };

  octsSummary = {
    total: 342,
    completed: 210,
    pending: 88,
    cancelled: 23,
    refunded: 44,
  };

  recentUsers: RecentUser[] = [
    {
      initials: 'JC',
      name: 'Juan Carlos Pérez',
      email: 'juan.perez@viveplus.com',
      role: 'Usuario',
      status: 'Activo',
    },
    {
      initials: 'LM',
      name: 'Laura Martínez',
      email: 'laura.martinez@viveplus.com',
      role: 'Usuario',
      status: 'Activo',
    },
    {
      initials: 'AR',
      name: 'Andrés Ramírez',
      email: 'andres.ramirez@viveplus.com',
      role: 'Administrador',
      status: 'Activo',
    },
  ];

  recentOcts: RecentOct[] = [
    {
      folio: 'OCT-000342',
      user: 'Juan Carlos Pérez',
      status: 'Completada',
      amount: '$35.00',
    },
    {
      folio: 'OCT-000341',
      user: 'Laura Martínez',
      status: 'Pendiente',
      amount: '$20.00',
    },
    {
      folio: 'OCT-000340',
      user: 'Andrés Ramírez',
      status: 'Reembolsada',
      amount: '$15.00',
    },
  ];
}
