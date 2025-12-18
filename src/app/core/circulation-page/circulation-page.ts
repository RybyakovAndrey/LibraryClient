import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CirculationListPage, IssueData } from './components/circulation-list-page/circulation-list-page';

@Component({
  selector: 'app-circulation-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CirculationListPage
  ],
  templateUrl: './circulation-page.html',
  styleUrl: './circulation-page.scss'
})
export class CirculationPage {
  customerIdInput = '';
  bookIdInput = '';

  customerInfo: { name: string; id: string; address: string; zip: string; city: string } | null = null;

  foundBookTitle: string | null = null;

  currentIssues: IssueData[] = [];
  historyIssues: IssueData[] = [];

  isCustomerLoaded = false;
  canIssue = false;
  canReturn = false;

  constructor(private router: Router) {}

  loadCustomer() {
    if (this.customerIdInput === 'C1028') {
      this.customerInfo = {
        name: 'Grace Bridges',
        id: '(C1028)',
        address: '243-9174 Semper St.',
        zip: '717993',
        city: 'Chaudfontaine'
      };
      
      this.currentIssues = [
        { title: 'Three Men in a Boat (to say nothing of the dog)', dateOfIssue: '2017-05-26', returnDate: '2017-06-16', isOverdue: true },
        { title: 'The Hunger Games', dateOfIssue: '2017-06-03', returnDate: '2017-06-24', isOverdue: false },
        { title: 'The Da Vinci Code', dateOfIssue: '2017-06-03', returnDate: '2017-06-24', isOverdue: false }
      ];

      this.historyIssues = [
        { title: 'Moby Dick or The White Whale', dateOfIssue: '2017-06-03', returnDate: '2017-06-11' },
        { title: 'Les Misérables', dateOfIssue: '2017-04-03', returnDate: '2017-05-05', isOverdue: true },
        { title: 'Harry Potter and the Order of the Phoenix', dateOfIssue: '2017-02-03', returnDate: '2017-02-21' },
        { title: 'The Hobbit', dateOfIssue: '2017-01-13', returnDate: '2017-01-23' }
      ];

      this.isCustomerLoaded = true;
    } else {
      alert('Customer not found (Try C1028)');
      this.isCustomerLoaded = false;
      this.customerInfo = null;
      this.currentIssues = [];
      this.historyIssues = [];
    }
  }

  onBookIdChange() {
    if (this.bookIdInput === 'OL76837W') {
      this.foundBookTitle = 'The Da Vinci Code';
      this.canIssue = false;
      this.canReturn = true; 
    } else if (this.bookIdInput.length > 3) {
      this.foundBookTitle = 'New Book Example';
      this.canIssue = true;
      this.canReturn = false;
    } else {
      this.foundBookTitle = null;
      this.canIssue = false;
      this.canReturn = false;
    }
  }

  editCustomer() {
    if (this.isCustomerLoaded) {
      this.router.navigate(['/customers/edit/1028']); 
    }
  }

  closeWindow() {
    this.router.navigate(['/']);
  }
}