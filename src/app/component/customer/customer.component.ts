import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private customerService: CustomerService) { }
  Customers: Customer[] = [];
  ngOnInit(): void {
    this.customerService.getCustomer().subscribe(customers => {
      this.Customers = customers.data;
    })
  }

}
