import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stadiums-table',
  templateUrl: './stadiums-table.component.html',
  styleUrls: ['./stadiums-table.component.css']
})
export class StadiumsTableComponent implements OnInit {

  stadiumsTab: any = [];
  constructor(private router: Router) { }

  ngOnInit() {
    this.stadiumsTab = JSON.parse(localStorage.getItem("stadiums") || "[]");
  }

  deleteStadium(id) {
    for (let i = 0; i < this.stadiumsTab.length; i++) {
      if (this.stadiumsTab[i].id == id) {
        this.stadiumsTab.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("stadiums", JSON.stringify(this.stadiumsTab));
  }

  goToInfo(id) {
    this.router.navigate([`stadiumInfo/${id}`]);
  }

}
