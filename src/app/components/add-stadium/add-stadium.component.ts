import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-stadium',
  templateUrl: './add-stadium.component.html',
  styleUrls: ['./add-stadium.component.css']
})
export class AddStadiumComponent implements OnInit {

  stadiumForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.stadiumForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      capacity: ["", [Validators.required]],
      country: ["", [Validators.required]],
    })
  }

  addStadium() {
    console.log("Here stadium", this.stadiumForm.value);
    // get Objects From LS
    let stadiumsTab = JSON.parse(localStorage.getItem("stadiums") || "[]");
    // Affect ID to object
    this.stadiumForm.value.id = this.generateId(stadiumsTab) + 1;
    stadiumsTab.push(this.stadiumForm.value);
    localStorage.setItem("stadiums", JSON.stringify(stadiumsTab));
  }


  generateId(T) {
    let max;
    if (T.length == 0) {
      max = 0;
    } else {
      max = T[0].id;
      for (let i = 1; i < T.length; i++) {
        if (T[i].id > max) {
          max = T[i].id;
        }
      }
    }
    return max;
  }

}
