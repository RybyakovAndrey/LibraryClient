import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';
import { MainPage } from './core/main-page/main-page';
import {CirculationPage} from './core/circulation-page/circulation-page';
import {CustomersPage} from './core/customers-page/customers-page';
import {ReportsPage} from './core/reports-page/reports-page';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: MainPage },
      { path: 'customers', component: CustomersPage },
      { path: 'circulation', component: CirculationPage },
      { path: 'reports', component: ReportsPage }
    ]
  }
];
