import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardetailComponent } from './component/cardetails/cardetail.component';
import { CarsComponent } from './component/cars/cars.component';


const routes: Routes = [
  { path: "", pathMatch: "full", component: CarsComponent },
  { path: "cars", component: CarsComponent },
  { path: "cars/brand/:brandId", component: CarsComponent },
  { path: "cars/color/:colorId", component: CarsComponent },
  { path: "car/detail/:carId", component: CardetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
