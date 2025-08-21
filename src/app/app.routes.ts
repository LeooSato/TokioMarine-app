import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',     loadComponent: () => import('./feature/home/home.component').then(m => m.HomeComponent) },
  { path: 'login',    loadComponent: () => import('./feature/auth/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./feature/auth/register.component').then(m => m.RegisterComponent) },
  { path: 'transfers',     loadComponent: () => import('./feature/transfer/list.component').then(m => m.TransfersListComponent) },
  { path: 'transfers/new', loadComponent: () => import('./feature/transfer/form.component').then(m => m.TransferFormComponent) },
  { path: '**', redirectTo: 'home' }
];
