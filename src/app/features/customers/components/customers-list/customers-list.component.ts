import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.scss'
})
export class CustomersListComponent implements OnInit {
  displayedColumns = ['customerId', 'name', 'address', 'zip', 'city'];
  
  allCustomers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  
  selectedCustomer: Customer | null = null;

  searchForm: FormGroup;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private fb: FormBuilder,
    private snack: MatSnackBar
  ) {
    this.searchForm = this.fb.group({
      customerId: [''],
      name: ['']
    });
  }

  ngOnInit(): void {
    this.customerService.getAll().subscribe(data => {
      this.allCustomers = data;
      this.filteredCustomers = data;
    });
  }

  search() {
    const { customerId, name } = this.searchForm.value;
    const idTerm = customerId ? customerId.toString().toLowerCase().trim() : '';
    const nameTerm = name ? name.toString().toLowerCase().trim() : '';

    if (!idTerm && !nameTerm) {
      this.filteredCustomers = this.allCustomers;
      return;
    }

    this.filteredCustomers = this.allCustomers.filter(c => {
      const matchId = idTerm ? c.customerId.toLowerCase().includes(idTerm) : true;
      const matchName = nameTerm ? c.name.toLowerCase().includes(nameTerm) : true;
      return matchId && matchName;
    });

    this.selectedCustomer = null;
  }

  selectCustomer(customer: Customer) {
    this.selectedCustomer = customer;
  }

  add() {
    this.router.navigate(['/customers/add']);
  }

  edit() {
    if (!this.selectedCustomer) {
      alert('Please select a customer first.'); 
      return;
    }
    this.router.navigate(['/customers/edit', this.selectedCustomer.id]);
  }

  closeWindow() {
    this.router.navigate(['/']);
  }
}