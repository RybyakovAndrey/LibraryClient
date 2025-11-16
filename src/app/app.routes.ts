import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';
import { MainPage } from './core/main-page/main-page';
import { CustomersListComponent } from './features/customers/components/customers-list/customers-list.component';
import { CustomerFormComponent } from './features/customers/components/customer-form/customer-form.component';
import { ReportsComponent } from './features/reports/reports.component';
import {CirculationPage} from './core/circulation-page/circulation-page';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: MainPage },
      { path: 'customers', component: CustomersListComponent },
      { path: 'customers/add', component: CustomerFormComponent },
      { path: 'customers/edit/:id', component: CustomerFormComponent },
      { path: 'circulation', component: CirculationPage },
      { path: 'reports', component: ReportsComponent }
    ]
  }
];
