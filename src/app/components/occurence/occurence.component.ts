import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-occurence',
  templateUrl: './occurence.component.html',
  styleUrls: ['./occurence.component.css']
})
export class OccurenceComponent implements OnInit {

  occForm: FormGroup;
  result: any = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.occForm = this.formBuilder.group({
      ch: ["", Validators.required]
    })
  }

  display() {
    let userInput = this.cleanCh(this.occForm.value.ch);
    for (let i = 0; i < userInput.length; i++) {
      let nb = this.occNbr(this.occForm.value.ch, userInput[i]);
      this.result.push(userInput[i] + ":" + nb);
    }
  }

  // Calculate occ number
  occNbr(chaine: string, c: string): number {
    let nb = 0;
    for (let i = 0; i < chaine.length; i++) {
      if (chaine[i] == c) {
        nb += 1;
      }
    }
    return nb;
  }

  // Delete doubles
  cleanCh(chaine: string): string {
    let result: string = "";
    for (let i = 0; i < chaine.length; i++) {
      if (this.occNbr(result, chaine[i]) == 0) {
        result = result + chaine[i];
      }
    }
    return result;
  }

}
