import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

interface Reminder {
  title: string;
  customer: string;
  issueDate: string;
  returnUntil: string;
}

interface HistoryItem {
  customer: string;
  issueDate: string;
  returnDate: string;
  isOverdue: boolean;
}

interface BookInfo {
  id: string;
  title: string;
  subtitle: string | null;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements AfterViewInit {
  tabIndex = 0;
  activeTab: 'reminders' | 'history' = 'reminders';

  bookSearch = new FormControl('');
  selectedBookTitle: string | null = null;
  selectedBookSubtitle: string | null = null;

  dataSourceReminders = new MatTableDataSource<Reminder>([]);
  dataSourceHistory = new MatTableDataSource<HistoryItem>([]);

  @ViewChild('sortReminders') set sortReminders(sort: MatSort) {
    this.dataSourceReminders.sort = sort;
  }
  @ViewChild('sortHistory') set sortHistory(sort: MatSort) {
    this.dataSourceHistory.sort = sort;
  }

  private allReminders: Reminder[] = [
    { title: 'The Da Vinci Code', customer: 'Bianca Mendoza', issueDate: '2017-05-25', returnUntil: '2017-06-15' },
    { title: 'Three Men in a Boat', customer: 'Grace Bridges', issueDate: '2017-05-26', returnUntil: '2017-06-16' },
    { title: 'Moby Dick', customer: 'Jasper Sweet', issueDate: '2017-05-24', returnUntil: '2017-06-14' },
    { title: 'Clean Code', customer: 'John Doe', issueDate: '2017-05-01', returnUntil: '2017-05-22' }
  ];

  private booksDb: BookInfo[] = [
    { id: 'OL957468W', title: 'Clean Code', subtitle: 'A Handbook of Agile Software Craftsmanship' },
    { id: 'OL123456X', title: 'The Hobbit', subtitle: 'There and Back Again' },
    { id: 'OL76837W', title: 'The Da Vinci Code', subtitle: null }
  ];

  private historyDb: Record<string, HistoryItem[]> = {
    'Clean Code': [
      { customer: 'Jasper Sweet', issueDate: '2017-02-06', returnDate: '2017-02-20', isOverdue: false },
      { customer: 'Nash Charles', issueDate: '2017-03-01', returnDate: '2017-03-12', isOverdue: false },
      { customer: 'Bianca Mendoza', issueDate: '2017-03-25', returnDate: '2017-04-09', isOverdue: true }
    ],
    'The Da Vinci Code': [
       { customer: 'Grace Bridges', issueDate: '2017-05-26', returnDate: '2017-06-16', isOverdue: false }
    ]
  };

  constructor(private router: Router) {
    this.dataSourceReminders.data = this.allReminders;
  }

  ngAfterViewInit() {
    if (this.dataSourceReminders.sort) {
      this.dataSourceReminders.sort.sort({ id: 'returnUntil', start: 'asc', disableClear: false });
    }
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    return `${day}.${month}.${year}`;
  }

  onTabChange(index: number) {
    this.activeTab = index === 0 ? 'reminders' : 'history';
    this.tabIndex = index;
  }

  searchBook() {
    const query = this.bookSearch.value?.trim().toLowerCase();

    this.selectedBookTitle = null;
    this.selectedBookSubtitle = null;
    this.dataSourceHistory.data = [];

    if (!query) return;

    const foundBook = this.booksDb.find(b => 
      b.id.toLowerCase() === query || b.title.toLowerCase().includes(query)
    );

    if (foundBook) {
      this.selectedBookTitle = foundBook.title;
      this.selectedBookSubtitle = foundBook.subtitle;

      const history = this.historyDb[foundBook.title] || [];
      this.dataSourceHistory.data = history;

      setTimeout(() => {
        if (this.dataSourceHistory.sort) {
          this.dataSourceHistory.sort.sort({ id: 'issueDate', start: 'desc', disableClear: false });
        }
      });
    }
  }

  exportCSV(type: 'reminders' | 'history') {
    let data: any[] = [];
    let headers: string[] = [];
    let dataSource: MatTableDataSource<any>;

    if (type === 'reminders') {
      dataSource = this.dataSourceReminders;
      headers = ['Title', 'Customer', 'Date of issue', 'Return until'];
    } else {
      dataSource = this.dataSourceHistory;
      headers = ['Customer', 'Date of issue', 'Return date'];
    }

    data = dataSource.sortData(dataSource.filteredData, dataSource.sort!);

    const csvRows = [];
    csvRows.push(headers.join(','));

    for (const row of data) {
      let values: string[] = [];
      if (type === 'reminders') {
        values = [
          `"${row.title}"`,
          `"${row.customer}"`,
          this.formatDate(row.issueDate),
          this.formatDate(row.returnUntil)
        ];
      } else {
        values = [
          `"${row.customer}"`,
          this.formatDate(row.issueDate),
          this.formatDate(row.returnDate)
        ];
      }
      csvRows.push(values.join(','));
    }

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Bookmaster_${type}_report.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  closeWindow() {
    this.router.navigate(['/']);
  }
}