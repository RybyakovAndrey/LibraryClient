import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  template: `
    <h2 mat-dialog-title>Login</h2>

    <form [formGroup]="form" (ngSubmit)="login()" class="dialog-form">
      <mat-form-field appearance="outline" class="full">
        <mat-label>Username</mat-label>
        <input matInput formControlName="username" autocomplete="off" />
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Password</mat-label>
        <input matInput type="password" formControlName="password" autocomplete="off" />
      </mat-form-field>

      <div class="dialog-actions">
        <button mat-flat-button color="primary" type="submit">Login</button>
        <button mat-button type="button" (click)="close()">Cancel</button>
      </div>
    </form>
  `,
  styles: [`
    :host {
      display: block;
      overflow: hidden;
    }

    h2 {
      margin: 0;
      text-align: center;
      font-weight: 500;
      color: #1a237e;
    }

    .dialog-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 12px 8px;
      max-height: 100%;
      overflow: hidden;
    }

    .full {
      width: 100%;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 10px;
    }

    button[mat-flat-button] {
      border-radius: 24px;
      padding: 6px 24px;
    }
  `]
})
export class LoginDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.form.invalid) {
      this.snack.open('Please fill in all fields', 'OK', { duration: 2500 });
      return;
    }

    this.snack.open('Login successful', 'OK', { duration: 2000 });
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }
}