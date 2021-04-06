import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private brandService: BrandService, private colorService: ColorService) { }

  Brands: Brand[] = [];
  Colors: Color[] = [];

  currentBrand: Brand;
  currentColor: Color;

  colorFilterText = "";
  brandFilterText = "";

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getBrands() {
    this.brandService.getBrand().subscribe(brands => {
      this.Brands = brands.data;
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(colors => {
      this.Colors = colors.data
    })
  }

  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
  }

  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand) {
      return "list-group-item active"
    } else {
      return "list-group-item";
    }
  }


  setCurrentColor(color: Color) {
    this.currentColor = color;
  }

  getCurrentColorClass(color: Color) {
    if (color == this.currentColor) {
      return "list-group-item active"
    } else {
      return "list-group-item";
    }
  }

  setRouterLink() {
    if (this.currentBrand && this.currentColor) {
      return `cars/result/${this.currentBrand.id}/${this.currentColor.id}`;
    } else if (this.currentBrand && !this.currentColor) {
      return `cars/brand/${this.currentBrand.id}`;
    } else if (this.currentColor && !this.currentBrand) {
      return `cars/color/${this.currentColor.id}`;
    } else {
      return "cars"
    }
  }



}
