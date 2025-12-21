import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-circulation-page',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './circulation-page.html',
  styleUrl: './circulation-page.scss',
})
export class CirculationPage {

}
