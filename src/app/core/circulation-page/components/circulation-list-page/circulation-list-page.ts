import {Component, input} from '@angular/core';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-circulation-list-page',
  imports: [MatTableModule],
  templateUrl: './circulation-list-page.html',
  styleUrl: './circulation-list-page.scss'
})
export class CirculationListPage {
  data = input.required<Issue[]>();
  displayedColumns: string[] = ['title', 'date', 'returnDate'];
}
