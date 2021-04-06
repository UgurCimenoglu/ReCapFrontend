import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './component/brand/brand.component';
import { CardetailComponent } from './component/cardetails/cardetail.component';
import { CarsComponent } from './component/cars/cars.component';
import { CartableComponent } from './component/cartable/cartable.component';
import { ColorComponent } from './component/color/color.component';
import { PaymentComponent } from './component/payment/payment.component';
import { RentaldetailComponent } from './component/rentaldetail/rentaldetail.component';


const routes: Routes = [
  { path: "", pathMatch: "full", component: CarsComponent },
  { path: "cars", component: CarsComponent },
  { path: "cars/brand/:brandId", component: CarsComponent },
  { path: "cars/color/:colorId", component: CarsComponent },
  { path: "car/detail/:carId", component: CardetailComponent },
  { path: "cars/result/:brandId/:colorId", component: CarsComponent },
  { path: "payment", component: PaymentComponent },
  { path: "rentaldetail", component: RentaldetailComponent },
  { path: "updatecolor", component: ColorComponent },
  { path: "updatebrand", component: BrandComponent },
  { path: "updatecar", component: CartableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
