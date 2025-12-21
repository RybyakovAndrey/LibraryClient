import {Component, inject, OnInit, signal} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import {Customer} from '../../features/customers/models/customer.model';
import {SelectionModel} from '@angular/cdk/collections';
import {HttpClient} from '@angular/common/http';
import {AddCustomer} from '../customers-page/components/add-customer/add-customer';
import {MatDialog} from '@angular/material/dialog';

const API_URL = 'http://localhost:8000/';

@Component({
  selector: 'app-circulation-page',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
  ],
  templateUrl: './circulation-page.html',
  styleUrl: './circulation-page.scss',
})
export class CirculationPage {
  http = inject(HttpClient);
  dialog = inject(MatDialog);
  ELEMENT_DATA = signal<Issue[]>([]);
  displayedColumns: string[] = ['book_title', 'date_of_issue', 'return_until'];

  ELEMENT_DATA_HISTORY = signal<Issue[]>([]);
  displayedColumnsHistory: string[] = ['book_title', 'date_of_issue', 'return_until'];
  customer = signal<Customer[]>([]);

  selection = new SelectionModel<Issue>(false);

  selectRow(row: Issue): void {
    this.selection.select(row);

  }

  selectionHistory = new SelectionModel<Issue>(false);

  selectRowHistory(row: Issue): void {
    this.selectionHistory.select(row);
  }

  getIssues(customerID: string): void {
    this.http.get(API_URL + 'issues/customer/' + customerID, {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},params: {status: 'current'}}).subscribe((res: any) => { this.ELEMENT_DATA.set(res) });
    this.http.get(API_URL + 'issues/customer/' + customerID, {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},params: {status: 'history'}}).subscribe((res: any) => { this.ELEMENT_DATA_HISTORY.set(res) });
    this.http.get(API_URL + 'customers/', {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},params: {customer_id: customerID}}).subscribe((res: any) => {this.customer.set(res.items)});
  }

  editCustomer(): void {
    const dialogRef = this.dialog.open(AddCustomer, {
      width: '500px',
      disableClose: true,
      data: { value: this.customer()[0] }
    });
    dialogRef.afterClosed().subscribe(res => {this.updateData();});
  }

  updateData(): void {

  }

  getBook(bookID: string): void {
    const date = new Date();
    const firstDate = new Date();
    date.setDate(date.getDate() + 14);
    this.http.post(API_URL + 'issues/', {book_id: bookID, customer_id: this.customer()[0].id, date_of_issue: firstDate.toISOString().slice(0, 10), return_until: date.toISOString().slice(0, 10)  }, {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}).subscribe(() => this.updateData());
  }

  returnBook(bookID: string): void {
    const date = new Date();
    this.http.put(API_URL + 'issues/' + bookID + '/return', {return_date: date.toISOString().slice(0, 10)}, {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}).subscribe(() => this.updateData());
  }
}
