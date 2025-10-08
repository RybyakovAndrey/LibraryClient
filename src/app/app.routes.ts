import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';
import { MainPage } from './core/main-page/main-page';

import { LoginComponent } from './core/auth/login/login.component';
import { CustomersComponent } from './features/customers/customers.component';
import { CirculationComponent } from './features/circulation/circulation.component';
import { ReportsComponent } from './features/reports/reports.component';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: MainPage },
      { path: 'login', component: LoginComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'circulation', component: CirculationComponent },
      { path: 'reports', component: ReportsComponent }
    ]
  }
];


