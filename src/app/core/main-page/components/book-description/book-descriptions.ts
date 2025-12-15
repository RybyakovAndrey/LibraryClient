import {Component, inject, input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AuthorsDescription} from '../authors-description/authors-description';

export interface BookDescriptions {
  title: string;
  publishYear: number;
  author: Authors[];
  description: string;
  subjects: string[];
}

@Component({
  selector: 'app-book-description',
  imports: [],
  templateUrl: './book-description.html',
  styleUrl: './book-description.scss'
})
export class BookDescription {
  bookDescriptions = input.required<BookDescriptions>();
  dialog = inject(MatDialog);
  book: BookDescriptions = {
    title: 'Boaty McBoatface',
    publishYear: 2016,
    author: [ { id: 12, name: 'Byron Barton'}, { id: 13, name: 'Mark Twen' } ],
    description: 'boaty good job',
    subjects: ['British', 'Polar bear'],
  } as BookDescriptions;

  bookDescription() {
    this.dialog.open(AuthorsDescription, {
      width: '500px',
      data:  {value: this.book.author},
    })
  }
}
