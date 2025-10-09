import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from './customer.service';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
export class CustomerFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  editMode = false;
  private id: number | null = null;
  private sub = new Subscription();

  constructor(
    private fb: FormBuilder,
    private svc: CustomerService,
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

    this.sub.add(
      this.route.paramMap.subscribe(params => {
        const idParam = params.get('id');
        if (idParam) {
          this.editMode = true;
          this.id = Number(idParam);
          this.loadCustomer(this.id);
        } else {
          this.editMode = false;
          this.id = null;
          this.form.reset();
        }
      })
    );
  }

  private loadCustomer(id: number) {
    this.sub.add(
      this.svc.getById(id).subscribe(c => {
        if (!c) {
          alert('Customer not found');
          this.router.navigate(['/customers']);
          return;
        }
        this.form.patchValue(c);
      })
    );
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value as {
      name: string;
      email?: string;
      phone?: string;
      address?: string;
      notes?: string;
    };

    if (this.editMode && this.id != null) {
      this.sub.add(
        this.svc.update(this.id, payload).subscribe(() => {
          this.showMessage('Customer updated successfully');
          this.router.navigate(['/customers']);
        })
      );
    } else {
      this.sub.add(
        this.svc.create(payload).subscribe(() => {
          this.showMessage('Customer added successfully');
          this.router.navigate(['/customers']);
        })
      );
    }
  }

  cancel() {
    this.router.navigate(['/customers']);
  }

  private showMessage(message: string) {
    this.snack.open(message, 'OK', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}