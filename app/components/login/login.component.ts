import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helper/validatorForm';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']  // Use styleUrls with an 's'
})
export class LoginComponent {


  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa fa-eye-slash"
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router){}

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['', Validators.required]
    })
  }

  hideShowPass(){
      this.isText = !this.isText;
      this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
      this.isText ? this.type = "text" : this.type = "password";
  }
  onLogin(){
    if(this.loginForm.valid){
     this.auth.login(this.loginForm.value)
     .subscribe({
      next:(res=>{
        alert(res.message);
        this.loginForm.reset();
        this.auth.storeToken(res.token);
        this.router.navigate(['dashboard'])
      }),
      error:(err=>{
        alert(err?.error.message)
      })
     })
    }
    else{

      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your form is invalid")

    }
  }

}