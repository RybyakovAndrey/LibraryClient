import {Component, inject, input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-authors-description',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './authors-description.html',
  styleUrl: './authors-description.scss'
})
export class AuthorsDescription {
  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);
  authors = input<Authors[]>([this.data.value]);
  selectedAuthor: Authors = this.authors()[0];

  closeDialog(): void {
    this.dialogRef.close();
  }
}
