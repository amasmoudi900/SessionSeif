import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { allPlayers } from 'src/app/data/playersData';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {
players:any=allPlayers;
playerId:any;
findedPlayer:any;
  constructor(private ActivatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.playerId=this.ActivatedRoute.snapshot.paramMap.get('id');
    this.findedPlayer=this.players.find(
      //obj:variable locale d une methode
      (obj:any)=>{return obj.id == this.playerId}
    )

  }

}
