import {Component, inject} from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {ReportsList} from './components/reports-list/reports-list';
import {BookHistory} from './components/book-history/book-history';
import {MatButton} from '@angular/material/button';
import {HttpClient} from '@angular/common/http';

const API_URL = 'http://localhost:8000/reports/';

@Component({
  selector: 'app-reports-page',
  imports: [
    MatTabGroup,
    MatTab,
    ReportsList,
    BookHistory,
    MatButton
  ],
  templateUrl: './reports-page.html',
  styleUrl: './reports-page.scss',
})
export class ReportsPage {
  http = inject(HttpClient)
  selectedTabIndex = 0;
  bookId = '1';

  export(tabIndex: number) {
    if (tabIndex == 0) {
      this.http.get(API_URL + 'reminders/export', {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}, responseType: 'blob'}).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'report.csv';
        a.click();

        window.URL.revokeObjectURL(url);})
    } else {
      this.http.get(API_URL + 'book-history/' + this.bookId + '/export', {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}, responseType: 'blob'}).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'book-history.csv';
        a.click();

        window.URL.revokeObjectURL(url);})
    }
  }

  changeBookId(book: string) {
    this.bookId = book;
  }
}
