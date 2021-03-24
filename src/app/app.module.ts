import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './component/navi/navi.component';
import { RentaldetailComponent } from './component/rentaldetail/rentaldetail.component';
import { HttpClientModule } from '@angular/common/http';
import { BrandComponent } from './component/brand/brand.component';
import { ColorComponent } from './component/color/color.component';
import { CustomerComponent } from './component/customer/customer.component';
import { CarsComponent } from './component/cars/cars.component';
import { CardetailComponent } from './component/cardetails/cardetail.component';


@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    CardetailComponent,
    RentaldetailComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    CarsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
