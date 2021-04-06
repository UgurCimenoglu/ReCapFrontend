import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  constructor(private brandService: BrandService, private toastr: ToastrService, private formBuilder: FormBuilder) { }

  Brands: Brand[];
  currentBrand: Brand;
  addBrandForm: FormGroup;
  updateBrandForm: FormGroup;

  ngOnInit(): void {
    this.getAllrands();
    this.addBrandFormControl();
    this.updateBrandFormControl();
  }

  addBrandFormControl() {
    this.addBrandForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(1)]]
    })
  }

  updateBrandFormControl() {
    this.updateBrandForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(1)]]
    })
  }


  getAllrands() {
    this.brandService.getBrand().subscribe(brands => {
      this.Brands = brands.data;
    })
  }

  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
  }

  addBrand() {
    if (this.addBrandForm.valid) {
      let brand = Object.assign({}, this.addBrandForm.value)
      this.brandService.addBrand(brand).subscribe(response => {
        if (response.success) {
          this.toastr.success(response.message, "Başarılı");
        } else {
          this.toastr.error(response.message, "Hata")
        }
      }, error => {
        console.log(error);
        for (let i = 0; i < error.error.Errors.length; i++) {
          this.toastr.error(error.error.Errors[i].ErrorMessage)
        }
      })
    } else {
      this.toastr.error("Girdiğiniz Bilgleri Kontrol Ediniz.", "Hata");
    }
  }

  updateBrand() {
    if (this.updateBrandForm.valid) {
      let brand = Object.assign({ id: this.currentBrand.id }, this.updateBrandForm.value);
      this.brandService.updateBrand(brand).subscribe(response => {
        if (response.success) {
          this.toastr.success(response.message, "Başarılı");
        } else {
          this.toastr.error(response.message, "Hata")
        }
      }, error => {
        console.log(error);
        for (let i = 0; i < error.error.Errors.length; i++) {
          this.toastr.error(error.error.Errors[i].ErrorMessage)
        }
      })
    } else {
      this.toastr.error("Girdiğiniz Bilgilerini Kontrol Ediniz.", "Hata");
    }
  }

  deleteBrand() {
    this.brandService.deleteBrand(this.currentBrand).subscribe(response => {
      if (response.success) {
        this.toastr.success(response.message, "Başarılı");
      } else {
        this.toastr.error(response.message, "Hata")
      }
    }, error => {
      console.log(error);
      for (let i = 0; i < error.error.Errors.length; i++) {
        this.toastr.error(error.error.Errors[i].ErrorMessage)
      }
    })
  }

}
