import { Routes } from '@angular/router';
import { AppShellComponent } from './core/layouts/app-shell/app-shell.component';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard-page/dashboard-page.component')
            .then(m => m.DashboardPageComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/users/users-page/users-page.component')
            .then(m => m.UsersPageComponent),
      },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

