import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  currentCustomer: Customer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      phone: [''],
      address: [''],
      notes: ['']
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editMode = true;
      const id = Number(idParam);
      this.loadCustomer(id);
    }
  }

  private loadCustomer(id: number) {
    const fakeData: Customer[] = [
      { id: 1, name: 'John Smith', email: 'john@example.com', phone: '+1-555-123', address: 'NY', notes: 'VIP' },
      { id: 2, name: 'Anna White', email: 'anna@example.com', phone: '+1-555-789', address: 'LA', notes: '' }
    ];
    this.currentCustomer = fakeData.find(customer => customer.id === id) || null;

    if (this.currentCustomer) {
      this.form.patchValue(this.currentCustomer);
    } else {
      this.snack.open('Customer not found', 'OK', { duration: 2500 });
      this.router.navigate(['/customers']);
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value as Customer;
    this.snack.open(
      this.editMode ? 'Customer updated successfully' : 'Customer added successfully',
      'OK',
      { duration: 2500 }
    );
    this.router.navigate(['/customers']);
  }

  cancel() {
    this.router.navigate(['/customers']);
  }
}