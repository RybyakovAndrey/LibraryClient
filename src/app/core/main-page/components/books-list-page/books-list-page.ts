import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

export interface Book {
  title: string;
  authors: string;
}

const ELEMENT_DATA: Book[] = [
  {title: 'книга', authors: 'Hydrogen',},
  {title: 'книга', authors: 'Hydrogen',},
  {title: 'книга', authors: 'Hydrogen',},
  {title: 'книга', authors: 'Hydrogen',},
  {title: 'книга', authors: 'Hydrogen',},
  {title: 'книга', authors: 'Hydrogen',},
  {title: 'книга', authors: 'Hydrogen',},
  {title: 'книга', authors: 'Hydrogen',},
];

@Component({
  selector: 'app-books-list-page',
  imports: [
    MatTableModule
  ],
  templateUrl: './books-list-page.html',
  styleUrl: './books-list-page.scss'
})
export class BooksListPage {
  displayedColumns: string[] = ['title', 'authors'];
  dataSource = ELEMENT_DATA;
}
