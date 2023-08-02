import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherURL: string = "http://localhost:3000/api/weather";

  constructor(private http: HttpClient) { }

  search(obj: any) {
    return this.http.post<{ result: any }>(this.weatherURL, obj);
  }

}
