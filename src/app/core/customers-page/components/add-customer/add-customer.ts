import {AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {HttpClient} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

const API_URL = 'http://localhost:8000/';

@Component({
  selector: 'app-add-customer',
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './add-customer.html',
  styleUrl: './add-customer.scss',
})
export class AddCustomer implements AfterViewInit {
  @ViewChild('id') id!: ElementRef<HTMLInputElement>;
  @ViewChild('name') name!: ElementRef<HTMLInputElement>;
  @ViewChild('address') address!: ElementRef<HTMLInputElement>;
  @ViewChild('zip') zip!: ElementRef<HTMLInputElement>;
  @ViewChild('city') city!: ElementRef<HTMLInputElement>;
  @ViewChild('phone') phone!: ElementRef<HTMLInputElement>;
  @ViewChild('email') email!: ElementRef<HTMLInputElement>;

  http = inject(HttpClient);
  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);
  customerID = 1;

  ngAfterViewInit(): void {
    if (!this.data?.value) return;

    const customer = this.data.value;
    this.customerID = customer.id;
    console.log(customer);
    this.id.nativeElement.value = customer.id ?? '';
    this.name.nativeElement.value = customer.name ?? '';
    this.address.nativeElement.value = customer.address ?? '';
    this.zip.nativeElement.value = customer.zip_code ?? '';
    this.city.nativeElement.value = customer.city ?? '';
    this.phone.nativeElement.value = customer.phone ?? '';
    this.email.nativeElement.value = customer.email ?? '';
  }

  save(
    name: string,
    address: string,
    zip_code: string,
    city: string,
    phone: string,
    email: string
  ): void {
    if (!this.data?.value) {
      this.http.post(API_URL + 'customers/', {
        name, address, zip_code, city, phone, email
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).subscribe(res => this.dialogRef.close());
    } else {
      this.http.put(API_URL + 'customers/' + this.customerID, {
        name, address, zip_code, city, phone, email
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).subscribe(res => this.dialogRef.close());
    }

  }

  cancel(): void {
    this.dialogRef.close();
  }
}
