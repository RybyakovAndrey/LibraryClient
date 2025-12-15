import {Component, inject, OnInit, signal} from '@angular/core';
import {BooksListPage} from './components/books-list-page/books-list-page';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {HttpClient} from '@angular/common/http';
import {Requests} from '../share/models/request';
import {BookDescription, BookDescriptions} from './components/book-description/book-descriptions';

export const API_URL = 'http://localhost:8000/';

@Component({
  selector: 'app-main-page',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    BookDescription,
    BooksListPage,
    MatButton,
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
  bookDescription = signal<BookDescriptions>({
    title: '',
    publishYear: 0,
    author: [],
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
    this.httpClient.get(API_URL+ 'books', { params: { title_substring: title,author_substring: author,subject_substring: subject } }).subscribe((res: any) => this.dataSourse.set(res as Requests<Books>));
  }
  updateDescription(bookId: number): void {
    this.httpClient.get(API_URL+ 'books/' + bookId).subscribe((res: any) => this.bookDescription.set(res as BookDescriptions));
  }

  rowSelection(e: number): void {
    this.updateDescription(e);
  }
}
