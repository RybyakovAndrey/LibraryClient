import { Component, inject, OnInit, signal } from '@angular/core';
import { BooksListPage } from './components/books-list-page/books-list-page';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Requests } from '../share/models/request';
import { BookDescription, BookDescriptions } from './components/book-description/book-descriptions';
import { catchError, of } from 'rxjs';

export const API_URL = 'http://localhost:8000/';

@Component({
  selector: 'app-main-page',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    BookDescription,
    BooksListPage,
    MatButtonModule,
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss'
})
export class MainPage implements OnInit {
  httpClient = inject(HttpClient);
  
  dataSourse = signal<Requests<Books>>({
    items: [],
    total: 0,
    page_size: 0,
    page: 0,
  });

  // ИСПРАВЛЕНИЕ ЗДЕСЬ:
  // Мы добавляем "пустого автора" в массив author, чтобы
  // шаблон book-description.html не падал при попытке прочитать author[0].name
  bookDescription = signal<BookDescriptions>({
    title: '',
    publishYear: 0,
    author: [{ id: 0, name: '' }], // <--- Было [], стало [{...}]
    description: '',
    subjects: [],
  })

  ngOnInit() {
    this.updateData();
  }

  updateData(
    title: string = '',
    author: string = '',
    subject: string = ''
  ): void {
    this.httpClient.get(API_URL + 'books', { 
      params: { title_substring: title, author_substring: author, subject_substring: subject } 
    }).pipe(
      catchError(err => {
        console.warn('Backend unavailable, loading empty state', err);
        return of({ items: [], total: 0, page_size: 0, page: 0 });
      })
    ).subscribe((res: any) => this.dataSourse.set(res as Requests<Books>));
  }

  updateDescription(bookId: number): void {
    this.httpClient.get(API_URL + 'books/' + bookId).subscribe((res: any) => 
      this.bookDescription.set(res as BookDescriptions)
    );
  }

  rowSelection(e: number): void {
    this.updateDescription(e);
  }
}