import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/cardetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CardetailService } from 'src/app/services/cardetail.service';
import { ColorService } from 'src/app/services/color.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-cartable',
  templateUrl: './cartable.component.html',
  styleUrls: ['./cartable.component.css']
})
export class CartableComponent implements OnInit {

  Cars: Car[];
  Colors: Color[];
  Brands: Brand[];
  Car: Car;
  selectedUptCar: Car;
  CarAddForm: FormGroup;
  CarUpdateForm: FormGroup;


  constructor(
    private cardetailService: CardetailService,
    private brandService: BrandService,
    private colorServce: ColorService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.GetCars();
    this.GetColors();
    this.GetBrands();
    this.CarAddFormControl();
    this.CarUpdateFormControl();
  }

  CarUpdateFormControl() {
    this.CarUpdateForm = this.formBuilder.group({
      id: ["", Validators.required],
      carName: ["", [Validators.required, Validators.minLength(2)]],
      brandId: ["", [Validators.required, Validators.min(1)]],
      colorId: ["", [Validators.required, Validators.min(1)]],
      modelYear: ["", [Validators.required, Validators.min(1000)]],
      dailyPrice: ["", [Validators.required, Validators.min(10)]],
      description: ["", [Validators.required, Validators.minLength(1)]]
    })
  }

  CarAddFormControl() {
    this.CarAddForm = this.formBuilder.group({
      carName: ["", [Validators.required, Validators.minLength(2)]],
      brandId: ["", [Validators.required, Validators.min(1)]],
      colorId: ["", [Validators.required, Validators.min(1)]],
      modelYear: ["", [Validators.required, Validators.min(1000)]],
      dailyPrice: ["", [Validators.required, Validators.min(10)]],
      description: ["", [Validators.required, Validators.minLength(1)]]
    })
  }


  GetCars() {
    this.cardetailService.getCars().subscribe(cars => {
      this.Cars = cars.data;
    })
  }

  GetColors() {
    this.colorServce.getColors().subscribe(response => {
      this.Colors = response.data;
    })
  }

  GetBrands() {
    this.brandService.getBrand().subscribe(response => {
      this.Brands = response.data
    })
  }

  //Add
  addCar() {
    console.log(this.CarAddForm.value);
    if (this.CarAddForm.valid) {
      let car = Object.assign({}, this.CarAddForm.value);
      this.cardetailService.AddCar(car).subscribe(response => {
        if (response.success) {
          this.toastr.success(response.message, "Başarılı");
        } else {
          this.toastr.error(response.message, "Hata");
        }
      })
    }
  }
  //AddEnd


  //Update
  SetCar(carId: number) {
    this.cardetailService.getCarById(carId).subscribe(car => {
      this.Car = car.data[0];
      this.CarUpdateForm.setValue({
        id: this.Car?.id,
        brandId: this.Car?.brandId,
        colorId: this.Car?.colorId,
        dailyPrice: this.Car?.dailyPrice,
        carName: this.Car?.carName,
        modelYear: this.Car?.modelYear,
        description: this.Car?.description,
      })
    })

  }

  updateCar() {
    console.log(this.CarUpdateForm.value)
    if (this.CarUpdateForm.valid) {
      let car = Object.assign({}, this.CarUpdateForm.value);
      this.cardetailService.updateCar(car).subscribe(response => {
        if (response.success) {
          this.toastr.success(response.message, "Başarılı")
        } else {
          this.toastr.error(response.message, "Hata");
        }
      })
    }
    else {
      this.toastr.error("Form Bilgilerini Kontrol Ediniz!", "Hata")
    }
  }
  //UpdateCarEnd


  //DeleteCar
  deleteCar() {
    this.cardetailService.deleteCar(this.Car).subscribe(response => {
      if (response.success) {
        this.toastr.success(response.message, "Başarılı")
      } else {
        this.toastr.error(response.message, "Hata")
      }
    }, error => {
      this.toastr.error("Hata", "Bir şeyler ters gitti!")
    })
  }

}