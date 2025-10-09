import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerService } from './customer.service';
import { Customer } from './customer.model';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit, OnDestroy {
  displayedColumns = ['name', 'email', 'phone', 'actions'];
  customers: Customer[] = [];
  private sub = new Subscription();

  constructor(private svc: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.sub.add(
      this.svc.getAll().subscribe(list => {
        this.customers = list;
      })
    );
  }

  add() {
    this.router.navigate(['/customers/add']);
  }

  edit(id: number) {
    this.router.navigate(['/customers/edit', id]);
  }

  remove(id: number) {
    const ok = confirm('Удалить клиента?');
    if (!ok) return;
    this.sub.add(this.svc.delete(id).subscribe());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}