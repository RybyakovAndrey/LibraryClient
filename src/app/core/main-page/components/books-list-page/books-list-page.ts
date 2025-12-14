import {Component, input, OnInit, signal} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Requests} from '../../../share/models/request';

export interface Book {
  title: string;
  authors: string;
}

@Component({
  selector: 'app-books-list-page',
  imports: [
    MatTableModule,
    MatPaginator
  ],
  templateUrl: './books-list-page.html',
  styleUrl: './books-list-page.scss'
})
export class BooksListPage {
  ELEMENT_DATA = input.required<Requests<Books>>();
  displayedColumns: string[] = ['title', 'authors'];
}
