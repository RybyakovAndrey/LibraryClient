import {Component, computed, signal} from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {LoginComponent} from '../auth/login/login.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  constructor(private router: Router, private dialog: MatDialog) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  /** Открыть диалог логина */
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '350px',
      disableClose: true
    });
  }

  /** Выход */
  logout(): void {
    localStorage.removeItem('token');
    alert('Logged out');
  }

  /** Закрытие приложения (пока просто лог) */
  closeApp(): void {
    console.log('Close app clicked (TODO: реализовать реальное закрытие/выход)');
  }
  token = signal<string | null>(null);
  isAuthorized = computed(() => !!this.token());
  updateToken(): void {
    this.token.set(localStorage.getItem('token'));
    console.log(this.token());
  }
}
