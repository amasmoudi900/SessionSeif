import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private matchService: MatchService) { }
  @Input() X: any;
  @Output() matchesToSend: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
  }

  scoreColor(s1, s2) {
    if (s1 > s2) {
      return "green";
    } else if (s1 < s2) {
      return "orange";
    } else {
      return "blue";
    }
  }

  deleteMatch(id) {
    this.matchService.deleteMatchById(id).subscribe(
      (response) => {

        this.matchService.getAllMatches().subscribe(
          (newMatchesTab) => {
            this.matchesToSend.emit(newMatchesTab.matches);
          }
        )
      }
    )
  }

}
