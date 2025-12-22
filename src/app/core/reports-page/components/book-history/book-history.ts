import {Component, EventEmitter, inject, output, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SelectionModel} from '@angular/cdk/collections';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import {MatButton} from '@angular/material/button';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {BookDescriptions} from '../../../main-page/components/book-description/book-descriptions';

interface BookHistoryModel {
  issue_id: number;
  customer: string;
  date_of_issue: string;
  return_date: string;
  return_until: string;
}

interface Book {
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-book-history',
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatHeaderCellDef
  ],
  templateUrl: './book-history.html',
  styleUrl: './book-history.scss',
})
export class BookHistory {
  bookId = output<string>()
  http = inject(HttpClient);
  ELEMENT_DATA = signal<BookHistoryModel[]>([]);
  bookData = signal<Book>({title: '', subtitle: ''});
  displayedColumns: string[] = ['customer', 'date_of_issue', 'return_until'];


  selection = new SelectionModel<Issue>(false);

  selectRow(row: Issue): void {
    this.selection.select(row);
  }

  search(book_id: string): void {
    this.bookId.emit(book_id);
    this.http.get('http://localhost:8000/reports/book-history/' + book_id, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`} }).subscribe((res: any) => {this.ELEMENT_DATA.set(res.history); this.bookData.set(res.book);});
  }
}
