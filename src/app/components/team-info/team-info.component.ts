import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { allTeams } from 'src/app/data/teamsData';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {
team:any=allTeams;
teamId:any;
findedTeam:any;
  constructor(private ActivatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.teamId=this.ActivatedRoute.snapshot.paramMap.get('id');
    this.findedTeam=this.team.find(
      //obj:variable locale d une methode
      (obj:any)=>{return obj.id == this.teamId}
    )
  }

}
