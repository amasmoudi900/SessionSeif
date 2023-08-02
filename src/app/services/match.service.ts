import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  // Destination Address
  matchURL: string = "http://localhost:3000/matches";
  // httpClient : Livreur
  constructor(private httpClient: HttpClient) { }

  //Response :  Array of Objects
  getAllMatches() {
    return this.httpClient.get<{ matches: any }>(this.matchURL);
  }

  // Response : One Object
  getMatchById(id: number) {
    return this.httpClient.get<{ match: any }>(this.matchURL + "/" + id);
  }

  // Response : Boolean/ String
  deleteMatchById(id) {
    return this.httpClient.delete<{ message: string }>(this.matchURL + "/" + id);
  }

  // Response : Boolean / String
  addMatch(matchObj) {
    return this.httpClient.post<{ msg: string }>(this.matchURL, matchObj);
  }

  // Response : Object/Boolean/String
  // matchObj : new values + ID
  editMatch(matchObj) {
    return this.httpClient.put<{ message: string }>(this.matchURL, matchObj);
  }
}
