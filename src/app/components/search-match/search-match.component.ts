import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { allMatches } from 'src/app/data/matchesData';

@Component({
  selector: 'app-search-match',
  templateUrl: './search-match.component.html',
  styleUrls: ['./search-match.component.css']
})
export class SearchMatchComponent implements OnInit {
  title:string="search Match";
  matches:any=allMatches;
  searchForm: FormGroup;
  obj:any={};

  constructor(private router:Router) { }

  ngOnInit() {
  }
  search() {
   // console.log("here is",this.obj);
   localStorage.setItem('teamToFind',JSON.stringify (this.obj) );

   this.router.navigate(['allMatches/search']);
   
  }
}
