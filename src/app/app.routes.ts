import { Routes } from '@angular/router';
import { DashboardLayout } from './admin-dashboard/dashboard-layout/dashboard-layout';
import { SearchUserCards } from './admin-dashboard/search-user-cards/search-user-cards';

export const routes: Routes = [


  {
     path: '',
    component: DashboardLayout,
  },

    {
     path: 'table',
    component: SearchUserCards,
  }
];
