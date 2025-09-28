import { Component } from '@angular/core';
import {BookDescription} from './components/book-description/book-description';
import {BooksListPage} from './components/books-list-page/books-list-page';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';

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
export class MainPage {

}
