import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("connectedUser"));
    console.log("Here user from LS", this.user);
  }

  logout() {
    localStorage.removeItem("connectedUser");
    this.router.navigate([""]);
  }

}
