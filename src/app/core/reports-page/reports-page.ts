import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {ReportsList} from './components/reports-list/reports-list';
import {BookHistory} from './components/book-history/book-history';

@Component({
  selector: 'app-reports-page',
  imports: [
    MatTabGroup,
    MatTab,
    ReportsList,
    BookHistory
  ],
  templateUrl: './reports-page.html',
  styleUrl: './reports-page.scss',
})
export class ReportsPage {

}
