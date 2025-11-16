import { Component } from '@angular/core';
import {CirculationListPage} from './components/circulation-list-page/circulation-list-page';
import {MatButton} from '@angular/material/button';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';

const DATA: Issue[] = [
  {title: 'Tree man', date: Date.UTC(2018,12,11), returnDate: Date.UTC(2018,12,11)},
  {title: 'Tree man', date: Date.UTC(2018,12,11), returnDate: Date.UTC(2018,12,11)},
]

@Component({
  selector: 'app-circulation-page',
  imports: [
    CirculationListPage,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './circulation-page.html',
  styleUrl: './circulation-page.scss'
})

export class CirculationPage {
    dataSource = DATA;
}
