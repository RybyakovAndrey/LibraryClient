import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';
import { MainPage } from './core/main-page/main-page';

// временные заглушки
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `<h2>Login Page Works!</h2>`
})
export class LoginPage {}

@Component({
  standalone: true,
  template: `<h2>Customers Page Works!</h2>`
})
export class CustomersPage {}

@Component({
  standalone: true,
  template: `<h2>Circulation Page Works!</h2>`
})
export class CirculationPage {}

@Component({
  standalone: true,
  template: `<h2>Reports Page Works!</h2>`
})
export class ReportsPage {}

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: MainPage },
      { path: 'login', component: LoginPage },
      { path: 'customers', component: CustomersPage },
      { path: 'circulation', component: CirculationPage },
      { path: 'reports', component: ReportsPage }
    ]
  }
];

