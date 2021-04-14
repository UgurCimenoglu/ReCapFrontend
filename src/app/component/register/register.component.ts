import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;


  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.registerFormControl();
  }

  registerFormControl() {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      firstName: ["", [Validators.required, Validators.minLength(2)]],
      lastName: ["", [Validators.required, Validators.minLength(2)]]
    })
  }

  register(){
    if (this.registerForm.valid) {
      let register = Object.assign({},this.registerForm.value);
      this.auth.register(register).subscribe(response=>{
        if(response.success){
          this.toastr.success("Kayıt başarılı...","Başarılı");
        }else{
          this.toastr.error(response.message);
        }
      },error=>{
        this.toastr.error(error.error.message);
      })
    }
    else{
      console.log("Form Bilgilerini Kontrol Ediniz...")
    }
  }
}
