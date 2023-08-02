import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { allPlayers } from 'src/app/data/playersData';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {
  players:any=[];
  
    
  constructor(private router:Router) { }
  
  ngOnInit() {
   this.players=allPlayers; 
     
  }
  goToDisplay(x:number){
    this.router.navigate([`player-info/${x}`]);
      }
      goToEdit(x:number){
        this.router.navigate([`editPlayer/${x}`]);
          }
}
