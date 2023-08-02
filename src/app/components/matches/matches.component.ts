import { MatchService } from './../../services/match.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { allMatches } from "src/app/data/matchesData";

@Component({
  selector: "app-matches",
  templateUrl: "./matches.component.html",
  styleUrls: ["./matches.component.css"],
})
export class MatchesComponent implements OnInit {
  findedmatch: any = [];
  teamToFind: any;
  matches: any = [];
  path: string;
  constructor(
    private router: Router,
    private matchService: MatchService) { }

  ngOnInit() {
    this.matchService.getAllMatches().subscribe(
      (response) => {
        console.log("Here response from BE", response.matches);
        this.matches = response.matches;
      }
    );
  }

  updateMatches(tab: any) {
    this.matches = tab;
  }
}
