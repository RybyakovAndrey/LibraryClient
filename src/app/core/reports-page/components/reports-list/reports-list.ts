import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

interface Reminders {
  title?: string;
  customer?: string;
  date_of_issue?: string;
  return_until?: string;
}

@Component({
  selector: 'app-reports-list',
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './reports-list.html',
  styleUrl: './reports-list.scss',
})
export class ReportsList implements OnInit {
  http = inject(HttpClient);
  ELEMENT_DATA = signal<Reminders[]>([]);
  displayedColumns: string[] = ['title', 'customer', 'date_of_issue', 'return_until'];
  ngOnInit() {
    this.http.get('http://localhost:8000/reports/reminders', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`} }).subscribe((res: any) => {this.ELEMENT_DATA.set(res.items)});
  }

  selection = new SelectionModel<Issue>(false);

  selectRow(row: Issue): void {
    this.selection.select(row);

  }
}
