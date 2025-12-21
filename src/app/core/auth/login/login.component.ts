import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {MatDialogRef} from '@angular/material/dialog';

export const API_URL = 'http://localhost:8000/';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  dialogRef = inject(MatDialogRef);
  http = inject(HttpClient);
  username = '';
  password = '';

  login(): void {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', this.username)
      .set('password', this.password)
      .set('scope', '')
      .set('client_id', '')
      .set('client_secret', '');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    this.http.post(
      API_URL + 'auth/login',
      body.toString(),
      { headers }
    ).subscribe((res: any) => {
      localStorage.setItem('token', res.access_token);
    });
    this.dialogRef.close();
  }
}
