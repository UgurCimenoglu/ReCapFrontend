import { Component, OnInit } from '@angular/core';
import { RentalDetail } from 'src/app/models/rentaldetail';
import { RentaldetailService } from 'src/app/services/rentaldetail.service';

@Component({
  selector: 'app-rentaldetail',
  templateUrl: './rentaldetail.component.html',
  styleUrls: ['./rentaldetail.component.css']
})
export class RentaldetailComponent implements OnInit {

  constructor(private RentaldetailService: RentaldetailService) { }
  rentalDetails: RentalDetail[] = [];

  ngOnInit(): void {
    this.RentaldetailService.getRentalDetail().subscribe(rentaldetails => {
      this.rentalDetails = rentaldetails.data;
    })
  }

}
