import { Routes } from '@angular/router';
import {Layout} from './core/layout/layout';
import {MainPage} from './core/main-page/main-page';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: MainPage,
      },
    ]
  },
];
