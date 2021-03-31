import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/cardetail';
import { CardetailService } from 'src/app/services/cardetail.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  Cars: CarDetail[] = [];
  dataLoaded = false;
  carFilterText:string="";

  constructor(private carDetailService: CardetailService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"] && params["colorId"]) {
        this.GetCarDetailsByBrandıdAndColorId(params["brandId"], params["colorId"])
      } else if (params["colorId"] && !params["brandId"]) {
        this.GetCarDetailsByColor(params["colorId"]);
      } else if (params["brandId"] && !params["colorId"]) {
        this.GetCarDetailsByBrand(params["brandId"])
      } else {
        this.GetCarDetails();
      }
    })
  }

  GetCarDetails() {
    this.carDetailService.GetCarDetails().subscribe(cardetails => {
      this.Cars = cardetails.data;
      this.dataLoaded = true;
    })
  }

  GetCarDetailsByBrand(brandId: number) {
    this.carDetailService.GetCarDetailsByBrand(brandId).subscribe(cardetails => {
      this.Cars = cardetails.data;
      console.log(cardetails)
      this.dataLoaded = true;
    })
  }

  GetCarDetailsByColor(colorId: number) {
    this.carDetailService.GetCarDetailByColor(colorId).subscribe(cardetails => {
      this.Cars = cardetails.data;
      this.dataLoaded = true;
    })
  }

  GetCarDetailsByBrandıdAndColorId(brandId: number, colorId: number) {
    this.carDetailService.GetCarDetailByBrandIdAndColorId(brandId, colorId).subscribe(cardetails => {
      this.Cars = cardetails.data;
      this.dataLoaded = true;
    })
  }

  staticFilesUrl = "https://localhost:44372/images/";

  SetImage(Car: CarDetail) {
    if (Car.imagePath.length > 0) {
      return `${this.staticFilesUrl}${Car.imagePath}`;
    } else {
      return `${this.staticFilesUrl}default.jpg`;
    }
  }

}
