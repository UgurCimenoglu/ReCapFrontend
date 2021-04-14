import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './component/navi/navi.component';
import { RentaldetailComponent } from './component/rentaldetail/rentaldetail.component';
import { BrandComponent } from './component/brand/brand.component';
import { ColorComponent } from './component/color/color.component';
import { CustomerComponent } from './component/customer/customer.component';
import { CarsComponent } from './component/cars/cars.component';
import { CardetailComponent } from './component/cardetails/cardetail.component';
import { CarFilterPipe } from './pipe/car-filter.pipe';
import { BrandfilterPipe } from './pipe/brandfilter.pipe';
import { ColorfilterPipe } from './pipe/colorfilter.pipe';
import { RentalComponent } from './component/rental/rental.component';
import { PaymentComponent } from './component/payment/payment.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { SidebarComponent } from './component/sidebar/sidebar.component';
import { CartableComponent } from './component/cartable/cartable.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';




@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    CardetailComponent,
    RentaldetailComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    CarsComponent,
    CarFilterPipe,
    BrandfilterPipe,
    ColorfilterPipe,
    RentalComponent,
    PaymentComponent,
    SidebarComponent,
    CartableComponent,
    LoginComponent,
    RegisterComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
