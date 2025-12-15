import {Component, input, OnInit, output, signal} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Requests} from '../../../share/models/request';
import { SelectionModel } from '@angular/cdk/collections';

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
  selectedRow = output<number>()

  selection = new SelectionModel<Books>(false);

  onRowSelect(row: Books): void {
    this.selectedRow.emit(row.id);
  }

  selectRow(row: Books): void {
    this.selection.select(row);
    this.onRowSelect(row);
  }
}
