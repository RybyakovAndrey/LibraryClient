import {Component, inject} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AuthorsDescription} from '../authors-description/authors-description';

export interface BookDescription {
  title: string;
  publishYear: number;
  author: Authors;
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
  dialog = inject(MatDialog);
  book: BookDescription = {
    title: 'Boaty McBoatface',
    publishYear: 2016,
    author: { id: 12, name: 'Byron Barton'},
    description: 'boaty good job',
    subjects: ['British', 'Polar bear'],
  } as BookDescription;

  bookDescription() {
    this.dialog.open(AuthorsDescription, {
      width: '500px',
    })
  }
}
