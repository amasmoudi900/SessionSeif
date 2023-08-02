import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  obj: any = {};
  title: string = "login";
  errorMsg: string;
  constructor(
    private userService: UserService,
    private router: Router) { }
  ngOnInit() {
  }

  login() {
    console.log("here is user", this.obj);
    this.userService.login(this.obj).subscribe(
      (response) => {
        console.log("Here response from BE", response);
        if (response.msg != "2") {
          this.errorMsg = "Please check Email/Pwd";
        } else {
          localStorage.setItem("connectedUser", JSON.stringify(response.connectedUser));
          if (response.connectedUser.role == "admin") {
            this.router.navigate(["admin"]);
          } else {
            this.router.navigate([""]);
          }
        }
      }
    );
  }
}
