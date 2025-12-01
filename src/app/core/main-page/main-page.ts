import {Component, inject, OnInit} from '@angular/core';
import {BookDescription} from './components/book-description/book-description';
import {Book, BooksListPage} from './components/books-list-page/books-list-page';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {HttpClient} from '@angular/common/http';

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

  ngOnInit(): void {
    this.httpClient.get('http://localhost:8000/getBooks').subscribe(res => {})
  }
}
