import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/cardetail';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';

import { ActivatedRoute, Router } from '@angular/router';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  constructor(
    private customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router,
    private rentalService: RentalService
  ) { }

  @Input() car: CarDetail;
  Customers: Customer[];
  customerId: number;
  totalprice: number;
  rentDate: Date;
  returnDate: Date;

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
    this.customerService.getCustomer().subscribe(customers => {
      this.Customers = customers.data;
      console.log(customers.data)
    })
  }

  minRentDate() {
    let d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  }


  minReturnDate() {
    let zamanFarki = Math.abs(new Date(this.rentDate)?.getTime() - new Date().getTime());
    let gunFarki = Math.ceil(zamanFarki / (1000 * 3600 * 24));
    if (gunFarki > 0) {
      let d = new Date();
      d.setDate(d.getDate() + (gunFarki + 1))
      return d.toISOString().slice(0, 10);
    } else {
      return new Date().toISOString().slice(0, 10)
    }
  }

  getTotalPrice() {
    let rentDateTime = this.rentDate ? new Date(this.rentDate).getTime() : 0;
    let returnDateTime = this.returnDate ? new Date(this.returnDate).getTime() : 0;

    if (returnDateTime > rentDateTime) {
      let zamanFarki = Math.abs(returnDateTime - rentDateTime);
      let gunFarki = Math.ceil(zamanFarki / (1000 * 3600 * 24));
      return gunFarki * this.car.dailyPrice
    } else {
      return "Geçerli bir tarih aralığı giriniz!"
    }
  }

  Payment() {
    if (this.returnDate > this.rentDate && this.customerId) {
      let rent: Rental = {
        carId: this.car.id,
        customerId: Number(this.customerId),
        rentDate: this.rentDate,
        returnDate: this.returnDate
      }

      this.rentalService.rentCart = rent;
      this.toastr.info("İşlem Başarılı", "Ödeme Sayfasına Yönlendiriliyorsunuz!")
      this.router.navigate(['/payment']);
    } else {
      this.toastr.warning("Beklenmeyen Bir Hata Oluştu.", "Lütfen Bilgileri Kontrol Ediniz.");
    }
  }
}
