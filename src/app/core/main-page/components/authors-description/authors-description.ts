import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authors-description',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './authors-description.html',
  styleUrl: './authors-description.scss'
})
export class AuthorsDescription {
  constructor(private dialogRef: MatDialogRef<AuthorsDescription>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}