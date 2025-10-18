import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatCardModule, MatTooltipModule],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.scss'
})
export class CustomersListComponent {
  displayedColumns = ['name', 'email', 'phone', 'actions'];

  customers: Customer[] = [
    { id: 1, name: 'John Smith', email: 'john@example.com', phone: '+1-555-123', address: 'NY', notes: 'VIP' },
    { id: 2, name: 'Anna White', email: 'anna@example.com', phone: '+1-555-789', address: 'LA', notes: '' }
  ];

  constructor(private router: Router) {}

  add() {
    this.router.navigate(['/customers/add']);
  }

  edit(id: number) {
    this.router.navigate(['/customers/edit', id]);
  }

  remove(id: number) {
    if (confirm('Удалить клиента?')) {
      this.customers = this.customers.filter(c => c.id !== id);
    }
  }
}