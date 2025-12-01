import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Book } from '../../../services/books.service';

@Component({
  selector: 'app-books-list-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule, MatTooltipModule],
  templateUrl: './books-list-page.html',
  styleUrls: ['./books-list-page.scss']
})
export class BooksListPage {
  @Input() books: Book[] = [];
  @Output() select = new EventEmitter<Book>();

  displayedColumns: string[] = ['title', 'authors'];

  onRowClick(row: Book) {
    this.select.emit(row);
  }
}
