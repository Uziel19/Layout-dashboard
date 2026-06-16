import { Routes } from '@angular/router';
import { DashboardLayout } from './admin-dashboard/dashboard-layout/dashboard-layout';
import { SearchUserCards } from './admin-dashboard/search-user-cards/search-user-cards';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';

export const routes: Routes = [


  {
     path: '',
    component: DashboardLayout,
  },

    {
     path: 'table',
    component: SearchUserCards,
  },
  {
    path: 'admin',
    component: AdminDashboard
  }
];
