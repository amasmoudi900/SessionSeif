import { WeatherService } from './../../services/weather.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherForm: FormGroup;
  weather: any;
  iconURL: string;
  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherForm = this.fb.group({
      city: ["", Validators.required]
    })
  }

  search() {
    console.log("Here city", this.weatherForm.value);
    this.weatherService.search(this.weatherForm.value).subscribe(
      (response) => {
        console.log("Here response from BE", response.result);
        this.weather = response.result;
        this.iconURL = `https://openweathermap.org/img/wn/${response.result.icon}@2x.png`;
      }
    );
  }

}
