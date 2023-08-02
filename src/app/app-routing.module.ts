import { StadiumInfoComponent } from './components/stadium-info/stadium-info.component';
import { AddStadiumComponent } from './components/add-stadium/add-stadium.component';
import { OccurenceComponent } from './components/occurence/occurence.component';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { PlayerFormComponent } from './components/player-form/player-form.component';
import { MatchFormComponent } from './components/match-form/match-form.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { MatchesComponent } from './components/matches/matches.component';
import { PlayersComponent } from './components/players/players.component';
import { TeamsComponent } from './components/teams/teams.component';
import { AdminComponent } from './components/admin/admin.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';
import { SearchMatchComponent } from './components/search-match/search-match.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';
import { WeatherComponent } from './components/weather/weather.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "playerForm", component: PlayerFormComponent },
  { path: "addMatch", component: MatchFormComponent },
  { path: "editMatch/:id", component: MatchFormComponent },
  { path: "addTeam", component: AddTeamComponent },
  { path: "addPlayer", component: PlayerFormComponent },
  { path: "editTeam", component: EditTeamComponent },
  { path: "editPlayer/:id", component: PlayerFormComponent },
  { path: "allMatches", component: MatchesComponent },
  { path: "allPlayers", component: PlayersComponent },
  { path: "allTeams", component: TeamsComponent },
  { path: "match-info/:id", component: MatchInfoComponent },
  { path: "player-info/:id", component: PlayerInfoComponent },
  { path: "team-info/:id", component: TeamInfoComponent },
  { path: "admin", component: AdminComponent },
  { path: "searchMatch", component: SearchMatchComponent },
  { path: "allMatches/search", component: MatchesComponent },
  { path: "occurence", component: OccurenceComponent },
  { path: "addStadium", component: AddStadiumComponent },
  { path: "stadiumInfo/:id", component: StadiumInfoComponent },
  { path: "weather", component: WeatherComponent },
  { path: "signupAdmin", component: SignupAdminComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
