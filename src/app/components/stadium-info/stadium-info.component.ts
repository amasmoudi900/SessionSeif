import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stadium-info',
  templateUrl: './stadium-info.component.html',
  styleUrls: ['./stadium-info.component.css']
})
export class StadiumInfoComponent implements OnInit {

  id: any;
  findedStadium: any;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    let stadiumsTab = JSON.parse(localStorage.getItem("stadiums") || "[]");
    this.findedStadium = stadiumsTab.find((elt) => { return elt.id == this.id })
  }

}
