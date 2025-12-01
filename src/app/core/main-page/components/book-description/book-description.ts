import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../../services/books.service';

@Component({
  selector: 'app-book-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-description.html',
  styleUrls: ['./book-description.scss']
})
export class BookDescription {
  @Input() book: Book | null = null;
}