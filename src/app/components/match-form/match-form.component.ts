import { MatchService } from './../../services/match.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { allMatches } from "src/app/data/matchesData";

@Component({
  selector: "app-match-form",
  templateUrl: "./match-form.component.html",
  styleUrls: ["./match-form.component.css"],
})
export class MatchFormComponent implements OnInit {
  matches: any = allMatches;
  matchForm: FormGroup;
  matchId: any;
  title: string = "add match";
  match: any = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private matchService: MatchService,
    private router: Router) { }

  ngOnInit() {
    // Get Id from Active URL
    this.matchId = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.matchId) {
      this.title = "edit match";
      this.matchService.getMatchById(this.matchId).subscribe(
        (response) => {
          this.match = response.match;
        }
      )
    }
  }
  addOrEditMatch() {
    console.log("this is", this.match);
    if (this.matchId) {
      this.matchService.editMatch(this.match).subscribe(
        (response) => {
          console.log("Here response after edit", response.message);
        }
      );
    } else {
      this.matchService.addMatch(this.match).subscribe(
        (response) => {
          console.log("Here response after edit", response.msg);
        }
      );
    }
    this.router.navigate(["admin"]);
  }
}
