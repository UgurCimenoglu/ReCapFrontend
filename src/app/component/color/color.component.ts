import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {


  Colors: Color[] = []
  currentColor: Color;
  colorUpdateForm: FormGroup;
  colorAddForm: FormGroup;

  constructor(private colorService: ColorService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetColors();
    this.ColorUpdateFormControl();
    this.ColorAddFormControl();
  }

  ColorUpdateFormControl() {
    this.colorUpdateForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]]
    })
  }

  ColorAddFormControl() {
    this.colorAddForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(1)]]
    })
  }

  GetColors() {
    this.colorService.getColors().subscribe(colors => {
      this.Colors = colors.data;
    })
  }

  setCurrentColor(color: Color) {
    this.currentColor = color;
  }

  addColor() {
    if (this.colorAddForm.valid) {
      let color = Object.assign({}, this.colorAddForm.value);
      this.colorService.addColor(color).subscribe(response => {
        if (response.success) {
          this.toastr.success(response.message, "Başarılı");
        }
      }, error => {
        for (let i = 0; i < error.error.Errors.length; i++) {
          this.toastr.error(error.error.Errors[i].ErrorMessage, "Hata");
        }
      })
    }
    else {
      this.toastr.error("Girdiğiniz bilgileri kontrol edin!", "Hata");
    }
  }

  updateColor() {
    if (this.colorUpdateForm.valid) {
      let color = Object.assign({ id: this.currentColor.id }, this.colorUpdateForm.value);
      this.colorService.updateColor(color).subscribe(response => {
        console.log(response);
        this.toastr.success(response.message, "Başarılı");
      }, error => {
        console.log(error)
        for (let i = 0; i < error.error.Errors.length; i++) {
          this.toastr.error(error.error.Errors[i].ErrorMessage)
        }
      })
    } else {
      this.toastr.error("Girdiğiniz bilgileri kontrol edin!", "Hata");
    }
  }

  deleteColor() {
    this.colorService.deleteColor(this.currentColor).subscribe(response => {
      if (response.success) {
        this.toastr.success(response.message, "Başarılı")
      } else {
        this.toastr.error(response.message, "Hata")
      }
    })
  }

}
