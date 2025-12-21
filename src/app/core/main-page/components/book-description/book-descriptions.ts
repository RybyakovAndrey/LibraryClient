import {Component, inject, input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AuthorsDescription} from '../authors-description/authors-description';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {NgOptimizedImage} from '@angular/common';

export interface BookDescriptions {
  title: string;
  first_publish_date: string;
  authors: Authors[];
  description: string;
  subjects: string[];
  cover_urls: string[];
}

@Component({
  selector: 'app-book-description',
  imports: [
    MatCard,
    MatIcon,
    MatIconButton,
    NgOptimizedImage
  ],
  templateUrl: './book-description.html',
  styleUrl: './book-description.scss'
})
export class BookDescription {
  bookDescriptions = input.required<BookDescriptions>();
  dialog = inject(MatDialog);
  book: BookDescriptions = {
    title: 'Boaty McBoatface',
    first_publish_date: '2016',
    authors: [ { id: 12, name: 'Byron Barton'}, { id: 13, name: 'Mark Twen' } ],
    description: 'boaty good job',
    subjects: ['British', 'Polar bear'],
  } as BookDescriptions;

  bookDescription() {
    this.dialog.open(AuthorsDescription, {
      width: '500px',
      data:  {value: this.bookDescriptions().authors},
    })
  }

  currentIndex = 0;

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.bookDescriptions().cover_urls.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.bookDescriptions().cover_urls.length) % this.bookDescriptions().cover_urls.length;
  }
}
