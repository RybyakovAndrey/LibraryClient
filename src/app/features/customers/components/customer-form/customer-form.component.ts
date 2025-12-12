import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  currentId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      customerId: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      email: [''],
      phone: [''],
      address: [''],
      zip: [''],
      city: [''],
      // Notes нет в макете на стр 13, но было в старой форме. 
      // Если следовать строго макету стр 13, Notes там нет. 
      // Но в БД оно есть. Оставим поле в модели, но в HTML отобразим только то, что на картинке.
      notes: [''] 
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editMode = true;
      this.currentId = Number(idParam);
      this.loadCustomer(this.currentId);
    }
  }

  private loadCustomer(id: number) {
    this.customerService.getById(id).subscribe(customer => {
      if (customer) {
        this.form.patchValue(customer);
      } else {
        this.snack.open('Customer not found', 'OK', { duration: 2500 });
        this.router.navigate(['/customers']);
      }
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();

    if (this.editMode && this.currentId) {
      this.customerService.update(this.currentId, formValue).subscribe(() => {
        this.snack.open('Data saved', 'OK', { duration: 1500 });
        this.router.navigate(['/customers']);
      });
    } else {
      this.customerService.create(formValue).subscribe(() => {
        this.snack.open('Customer added', 'OK', { duration: 1500 });
        this.router.navigate(['/customers']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/customers']);
  }

  closeWindow() {
    this.router.navigate(['/customers']);
  }
}