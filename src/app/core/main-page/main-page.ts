import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDescription } from './components/book-description/book-description';
import { BooksListPage } from './components/books-list-page/books-list-page';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BooksService, Book } from '../services/books.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    BookDescription,
    BooksListPage,
    MatIconModule
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss'
})
export class MainPage {
  private fb = inject(FormBuilder);
  private booksSvc = inject(BooksService);

  form = this.fb.group({
    title: [''],
    author: [''],
    subject: ['']
  });

  books: Book[] = [];
  selected: Book | null = null;

  constructor() {
    // при первом рендере можно загрузить топ-книг
    this.booksSvc.search({}).subscribe(b => this.books = b);
  }

  search() {
    const { title, author, subject } = this.form.value;
    this.booksSvc.search({ title: title || undefined, author: author || undefined, subject: subject || undefined })
      .subscribe(b => {
        this.books = b;
        this.selected = null;
      });
  }

  onSelect(book: Book) {
    this.selected = book;
    // при желании можно дополнительно загрузить данные по id
    if (book.id) {
      this.booksSvc.getById(book.id).subscribe(full => this.selected = full);
    }
  }
}
