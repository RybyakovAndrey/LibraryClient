import {Component, inject, model} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

export interface DialogData {
  login: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  readonly dialogRef = inject(MatDialogRef<Login>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly login = model(this.data.login);
  readonly password = model(this.data.password);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
