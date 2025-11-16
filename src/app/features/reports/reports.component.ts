import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
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
  overdue?: boolean;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  tabIndex = 0;
  activeTab: 'reminders' | 'history' = 'reminders';

  bookSearch = new FormControl('');
  selectedBookTitle: string | null = null;
  selectedBookSubtitle: string | null = null;

  reminders: Reminder[] = [
    { title: 'Modern JS Essentials', customer: 'Alice Brown', issueDate: '2025-10-02', returnUntil: '2025-11-02' },
    { title: 'System Design Basics', customer: 'John Smith', issueDate: '2025-10-05', returnUntil: '2025-11-05' },
    { title: 'Clean Code', customer: 'Emma White', issueDate: '2025-10-08', returnUntil: '2025-11-08' }
  ];

  history: HistoryItem[] = [
    { customer: 'Michael Green', issueDate: '2025-09-15', returnDate: '2025-09-29' },
    { customer: 'Sophia Turner', issueDate: '2025-09-20', returnDate: '2025-10-05', overdue: true }
  ];

  formatDate(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return date;
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    return `${day}.${month}.${year}`;
  }

  searchBook() {
    const query = this.bookSearch.value?.trim();
    if (!query) return;
    // Симуляция поиска по ID
    if (query === 'OL957468W') {
      this.selectedBookTitle = 'Clean Code';
      this.selectedBookSubtitle = 'Robert C. Martin';
    } else {
      this.selectedBookTitle = 'Unknown book';
      this.selectedBookSubtitle = null;
    }
  }

  exportCSV(type: 'reminders' | 'history') {
    const data = type === 'reminders' ? this.reminders : this.history;
    const header = type === 'reminders'
      ? 'Title,Customer,IssueDate,ReturnUntil'
      : 'Customer,IssueDate,ReturnDate,Overdue';
    const rows = data.map((r: any) => Object.values(r).join(',')).join('\n');
    const csv = `${header}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_report.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
}