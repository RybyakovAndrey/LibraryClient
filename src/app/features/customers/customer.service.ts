import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Customer } from './customer.model';

const STORAGE_KEY = 'app_customers_v1';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers$ = new BehaviorSubject<Customer[]>(this.loadFromStorage());

  getAll(): Observable<Customer[]> {
    return this.customers$.asObservable();
  }

  getById(id: number): Observable<Customer | undefined> {
    const current = this.customers$.value;
    const found = current.find(c => c.id === id);
    return of(found).pipe(delay(150));
  }

  create(payload: Omit<Customer, 'id'>): Observable<Customer> {
    const list = [...this.customers$.value];
    const newId = list.length ? Math.max(...list.map(c => c.id)) + 1 : 1;
    const created: Customer = { id: newId, ...payload };
    list.unshift(created);
    this.saveAndNext(list);
    return of(created).pipe(delay(150));
  }

  update(id: number, payload: Omit<Customer, 'id'>): Observable<Customer | undefined> {
    const list = [...this.customers$.value];
    const index = list.findIndex(c => c.id === id);
    if (index === -1) {
      return of(undefined).pipe(delay(100));
    }
    const updated: Customer = { id, ...payload };
    list[index] = updated;
    this.saveAndNext(list);
    return of(updated).pipe(delay(150));
  }

  delete(id: number): Observable<boolean> {
    const list = this.customers$.value.filter(c => c.id !== id);
    this.saveAndNext(list);
    return of(true).pipe(delay(120));
  }

  private saveAndNext(list: Customer[]) {
    this.customers$.next(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  private loadFromStorage(): Customer[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const seed: Customer[] = [
          { id: 1, name: 'Ivan Ivanov', email: 'ivan@example.com', phone: '+7 900 111 22 33', address: 'Moscow' },
          { id: 2, name: 'Anna Petrova', email: 'anna@example.com', phone: '+7 915 444 55 66', address: 'Saint Petersburg' }
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
        return seed;
      }
      return JSON.parse(raw) as Customer[];
    } catch {
      return [];
    }
  }
}