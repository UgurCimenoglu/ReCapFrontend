import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './component/brand/brand.component';
import { CardetailComponent } from './component/cardetails/cardetail.component';
import { CarsComponent } from './component/cars/cars.component';
import { CartableComponent } from './component/cartable/cartable.component';
import { ColorComponent } from './component/color/color.component';
import { LoginComponent } from './component/login/login.component';
import { PaymentComponent } from './component/payment/payment.component';
import { RegisterComponent } from './component/register/register.component';
import { RentaldetailComponent } from './component/rentaldetail/rentaldetail.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  { path: "", pathMatch: "full", component: CarsComponent },
  { path: "cars", component: CarsComponent },
  { path: "cars/brand/:brandId", component: CarsComponent },
  { path: "cars/color/:colorId", component: CarsComponent },
  { path: "car/detail/:carId", component: CardetailComponent },
  { path: "cars/result/:brandId/:colorId", component: CarsComponent },
  { path: "payment", component: PaymentComponent, canActivate: [LoginGuard] },
  { path: "rentaldetail", component: RentaldetailComponent, canActivate: [LoginGuard] },
  { path: "updatecolor", component: ColorComponent, canActivate: [LoginGuard] },
  { path: "updatebrand", component: BrandComponent, canActivate: [LoginGuard] },
  { path: "updatecar", component: CartableComponent, canActivate: [LoginGuard] },
  { path: "login", component: LoginComponent, canActivate: [AuthGuard] },
  { path: "register", component: RegisterComponent, canActivate: [AuthGuard] },
  { path: "user-detail", component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
