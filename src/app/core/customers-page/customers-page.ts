import {Component, inject, OnInit, signal} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
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
import {Customer} from '../../features/customers/models/customer.model';
import {HttpClient} from '@angular/common/http';
import {LoginComponent} from '../auth/login/login.component';
import {MatDialog} from '@angular/material/dialog';
import {AddCustomer} from './components/add-customer/add-customer';

const API_URL = 'http://localhost:8000/';

@Component({
  selector: 'app-customers-page',
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
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
  templateUrl: './customers-page.html',
  styleUrl: './customers-page.scss',
})
export class CustomersPage implements OnInit {
  dialog = inject(MatDialog);
  http = inject(HttpClient);
  ngOnInit() {
    this.http.get(API_URL + 'customers/', {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}).subscribe((res: any) => this.ELEMENT_DATA.set(res.items))
  }

  ELEMENT_DATA = signal<Customer[]>([]);
  displayedColumns: string[] = ['id', 'name', 'address', 'zip', 'city'];

  selection = new SelectionModel<Customer>(false);

  selectRow(row: Customer): void {
    this.selection.select(row);
  }

  updateCustomers(customer_id?: number, name: string = ''): void {
    if (customer_id) {
      this.http.get(API_URL + 'customers/', {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}, params: {customer_id, name}}).subscribe((res: any) => this.ELEMENT_DATA.set(res.items));
    } else {
      this.http.get(API_URL + 'customers/', {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}, params: {name}}).subscribe((res: any) => this.ELEMENT_DATA.set(res.items));
    }
  }

  addCustomer(edit: boolean = false): void {
    if (!edit) {
      const dialogRef = this.dialog.open(AddCustomer, {
        width: '500px',
        disableClose: true,
      });
    } else {
      const dialogRef = this.dialog.open(AddCustomer, {
        width: '500px',
        disableClose: true,
        data: { value: this.selection.selected[0] }
      });
    }

  }

  protected readonly Number = Number;
}
