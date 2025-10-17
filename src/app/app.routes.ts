import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';
import { MainPage } from './core/main-page/main-page';

// временные заглушки
import { Component } from '@angular/core';
import {Login} from './core/login/login';
import {ManageCustomers} from './core/manage-customers/manage-customers';
import {Circulation} from './core/circulation/circulation';
import {Reports} from './core/reports/reports';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: MainPage },
      { path: 'login', component: Login },
      { path: 'manage-customers', component: ManageCustomers },
      { path: 'circulation', component: Circulation },
      { path: 'reports', component: Reports }
    ]
  }
];

