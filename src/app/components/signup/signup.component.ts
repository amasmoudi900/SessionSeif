import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMsg: string;
  imagePreview: string;
  constructor(
    private x: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.signupForm = this.x.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      img: [""]
    })
  }
  signup() {
    console.log("here sign up clicked", this.signupForm.value);
    this.signupForm.value.role = "user";

    this.userService.signup(this.signupForm.value, this.signupForm.value.img).subscribe(
      (response) => {
        console.log("Here response after signup", response.msg);
        if (response.msg) {
          this.router.navigate(["login"]);
        } else {
          this.errorMsg = "Error with signup";
        }
      }
    );
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }


}
