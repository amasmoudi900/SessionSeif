import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allMatches } from 'src/app/data/matchesData';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.css']
})
export class MatchesTableComponent implements OnInit {
  matches: any = [];
  constructor(
    private router: Router,
    private matchService: MatchService) { }

  ngOnInit() {
    // this.matches = allMatches;
    this.matchService.getAllMatches().subscribe(
      (response) => {
        this.matches = response.matches;
      }
    );
  }
  goToDisplay(x: number) {
    this.router.navigate([`match-info/${x}`]);
  }
  goToEdit(x: number) {
    this.router.navigate([`editMatch/${x}`]);
  }

  deleteMatch(id) {
    this.matchService.deleteMatchById(id).subscribe(
      (response) => {
        console.log("Here response after delete", response.message);
        this.matchService.getAllMatches().subscribe(
          (response) => {
            this.matches = response.matches;
          }
        );
      }
    );
  }
}
