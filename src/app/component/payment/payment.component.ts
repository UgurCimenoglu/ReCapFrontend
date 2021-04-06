import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { CardetailService } from 'src/app/services/cardetail.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RentalService } from 'src/app/services/rental.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(
    private carDetailService: CardetailService,
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private toastr: ToastrService,
    private router: Router) { }

  rental: Rental;
  Amount: number;
  formCard: FormGroup;

  ngOnInit(): void {
    this.getRentCart();
    this.getCarDetail();
    if (!this.rental) {
      this.router.navigateByUrl("/");
    }

    this.formCard = this.formBuilder.group({
      name: ["", [Validators.required]],
      cardNumber: ["", [Validators.required, Validators.minLength(16), Validators.pattern("^[0-9]*$")]],
      expDate: ["", [Validators.required, Validators.pattern(/^(?:0?[1-9]|1[0-2]) *\/ *[1-9][0-9]$/)]],
      cvv: ["", [Validators.required, Validators.minLength(3), Validators.pattern("^[0-9]*$")]],
    })
  }

  getRentCart() {
    this.rental = this.rentalService.rentCart;
  }

  getCarDetail() {
    this.carDetailService.GetCarDetailByCarId(this.rental?.carId).subscribe(car => {
      car.data.forEach(car => {
        this.getTotalPrice(car.dailyPrice);
      });
    })
  }

  getTotalPrice(carDailyPrice: number) {
    let rentDateTime = this.rental.rentDate ? new Date(this.rental.rentDate).getTime() : 0;
    let returnDateTime = this.rental.returnDate ? new Date(this.rental.returnDate).getTime() : 0;

    if (returnDateTime > rentDateTime) {
      let zamanFarki = Math.abs(returnDateTime - rentDateTime);
      let gunFarki = Math.ceil(zamanFarki / (1000 * 3600 * 24));
      this.Amount = gunFarki * carDailyPrice;
    }
  }


  onSubmit(data: object) {
    if (this.formCard.invalid) {
      this.toastr.error("Hata", "Bilgilerinizi kontrol edin!")
      this.router.navigateByUrl("")
    }
    else {
      this.rentalService.RentACar(this.rental).subscribe(response => {
        if (response.success) {
          this.toastr.success(response.message, "Success");
          this.router.navigateByUrl("rentaldetail")
        }
      }, error => {
        this.toastr.error(error.error.message, "Error")
        
      })
    }
  }
}
