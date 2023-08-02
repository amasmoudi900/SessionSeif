import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { allPlayers } from 'src/app/data/playersData';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {
  players: any = allPlayers;
  playerForm: FormGroup;
  playerId: any;
  title: string = "add player";
  player: any = {};
  constructor(private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.playerId = this.ActivatedRoute.snapshot.paramMap.get("id");
    if (this.playerId) {
      this.title = "edit player";
      this.player = this.players.find(
        (obj:any)=>{return obj.id == this.playerId})
    }
  }
  Player() {
    console.log("this is", this.player);
  }
  }


