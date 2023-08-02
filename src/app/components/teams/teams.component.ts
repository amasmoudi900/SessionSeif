import { Component, OnInit } from '@angular/core';
import { allTeams } from 'src/app/data/teamsData';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
//déclaration globales
  teams:any=[];
  constructor() { }

  ngOnInit() {
    this.teams=allTeams;
      
      
    
  }

}
