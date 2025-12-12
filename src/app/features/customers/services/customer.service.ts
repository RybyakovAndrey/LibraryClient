import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Customer } from '../models/customer.model';

const STORAGE_KEY = 'app_customers_v2';

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

  create(payload: Omit<Customer, 'id' | 'customerId'>): Observable<Customer> {
    const list = [...this.customers$.value];
    
    const maxId = list.length ? Math.max(...list.map(c => c.id)) : 999;
    const newId = maxId < 1000 ? 1000 : maxId + 1;
    const newCustomerId = `C${newId}`;

    const created: Customer = { 
      id: newId, 
      customerId: newCustomerId,
      ...payload 
    };
    
    list.unshift(created);
    this.saveAndNext(list);
    return of(created).pipe(delay(150));
  }

  update(id: number, payload: Omit<Customer, 'id' | 'customerId'>): Observable<Customer | undefined> {
    const list = [...this.customers$.value];
    const index = list.findIndex(c => c.id === id);
    if (index === -1) {
      return of(undefined).pipe(delay(100));
    }
    
    const oldCustomer = list[index];
    const updated: Customer = { 
      ...oldCustomer,
      ...payload 
    };
    
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
          { id: 1005, customerId: 'C1005', name: 'Kenneth Wright', address: '4070 Viverra. Avenue', zip: '72604', city: 'Lac-Serent', email: 'kenneth@example.com' },
          { id: 1006, customerId: 'C1006', name: 'Kylie Green', address: '4196 Pharetra Straße', zip: '8071', city: 'Northumberland', email: 'kylie@example.com' },
          { id: 1013, customerId: 'C1013', name: 'Shelley Howard', address: '5193 Aliquet Rd.', zip: '05404', city: 'Broxburn' },
          { id: 1017, customerId: 'C1017', name: 'Nash Charles', address: '3549 Nullam Rd.', zip: '487505', city: 'Turrialba' },
          { id: 1021, customerId: 'C1021', name: 'Tad Curry', address: '8702 Dolor. Straße', zip: '52201', city: 'Carbonear' },
          { id: 1025, customerId: 'C1025', name: 'Quon Palmer', address: '7125 Aliquam Straße', zip: '20248', city: 'Quimper' },
          { id: 1027, customerId: 'C1027', name: 'Ulric Stein', address: '2438 Ornare Straße', zip: '9663', city: 'Río Hurtado' },
          { id: 1028, customerId: 'C1028', name: 'Grace Bridges', address: '243-9174 Semper St.', zip: '717993', city: 'Chaudfontaine' },
          { id: 1029, customerId: 'C1029', name: 'Jasper Sweet', address: '564-8483 Cursus Avenue', zip: '21300', city: 'York' },
          { id: 1030, customerId: 'C1030', name: 'Blair Glenn', address: '457-157 Luctus Rd.', zip: '644373', city: 'Vilna' },
          { id: 1031, customerId: 'C1031', name: 'Bianca Mendoza', address: '2001 Sem St.', zip: '151099', city: 'Constitución' }
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