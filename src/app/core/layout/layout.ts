import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';

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
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '350px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('✅ User logged in successfully');
      } else {
        console.log('❌ Login canceled');
      }
    });
  }

  /** Выход */
  logout(): void {
    console.log('User logged out (TODO: подключить AuthService)');
    this.router.navigate(['/']);
  }

  /** Закрытие приложения (пока просто лог) */
  closeApp(): void {
    console.log('Close app clicked (TODO: реализовать реальное закрытие/выход)');
  }
}