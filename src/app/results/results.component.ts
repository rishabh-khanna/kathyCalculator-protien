import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from '../api.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public userData: any;
  public pogressStatus: any;
  public subscription: Subscription;
  public numberofDays: number;
  public currentBodyWeight: number;
  public desirdeBodyWeight: number;
  public currentBMRrate: number;
  public desiredBMRrate: number;
  public userHeight: number;
  public protineRate: number;
  public carbRate: number;
  public fatRate: number;

  constructor(
    protected router: Router,
    private data: DataService,
    private api: ApiService
  ) { }

  bmi: number = null;
  weightTypeCalculated: string = '';
  bodyFatPercent: number = null;
  dailyCalories: number = null;
  dailyCaloriesDesiredWeight: number = null;
  bodyFatMass: number = null;
  leanBodyMass: number = null;

  ngOnInit(): void {

    console.log(JSON.parse(localStorage.getItem('userSessionData')));

    if (JSON.parse(localStorage.getItem('userSessionData'))) {
      this.userData = JSON.parse(localStorage.getItem('userSessionData'));
    } else {
      this.data.currentData.subscribe(userData => this.userData = userData);
    }

    if (JSON.parse(localStorage.getItem('userSessionProgressData'))) {
      this.pogressStatus = JSON.parse(localStorage.getItem('userSessionProgressData'));
    } else {
      this.data.currentPogressData.subscribe(pogressStatus => this.pogressStatus = pogressStatus);
    }

    // this.subscription = this.data.currentData.subscribe(userData => this.userData = userData);
    // this.subscription = this.data.currentPogressData.subscribe(pogressStatus => this.pogressStatus = pogressStatus);

    this.pogressStatus.results = 'active';
    this.data.changeStatus(this.pogressStatus);
    this.numberofDays = Math.round((new Date(this.userData.date).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    this.currentBodyWeight = this.userData.bodyWeight * (this.userData.bodyweightType ? 2.2 : 1);
    this.desirdeBodyWeight = this.userData.weight * (this.userData.weightType ? 2.205 : 1);
    // this.userHeight = this.userData.height * this.userData.heightType ? 12 : .39;
    this.userHeight = this.userData.height * (this.userData.heightType ? (1 / 12) : .39) + (this.userData.heightType ? this.userData.heightInch : 0);
    this.currentBMRrate = this.userData.sex == "Male" ?
      66 + (4.35 * this.currentBodyWeight) + (4.7 * this.userHeight) - (4.7 * this.userData.age) :
      655 + (6.23 * this.currentBodyWeight) + (12.7 * this.userHeight) - (6.8 * this.userData.age);
    this.desiredBMRrate = this.userData.sex == "Male" ?
      66 + (4.35 * this.desirdeBodyWeight) + (4.7 * this.userHeight) - (4.7 * this.userData.age) :
      655 + (6.23 * this.desirdeBodyWeight) + (12.7 * this.userHeight) - (6.8 * this.userData.age);
    // console.log(this.currentBodyWeight, this.desirdeBodyWeight);



    // calculate BMI
    // this.bmi = parseFloat((this.userData.bodyWeight / ((this.userData.height / 3.281) * 2)).toFixed(2));
    // this.bmi = parseFloat((this.userData.bodyWeight / ((this.userHeight / 39.37) * 2)).toFixed(2));
    console.log(this.currentBodyWeight, this.userHeight);
    // * 703
    this.bmi = parseFloat(((this.currentBodyWeight * 703) / (this.userHeight * this.userHeight)).toFixed(2));
    // parseFloat(((this.currentBodyWeight ) / (this.userHeight * this.userHeight)).toFixed(2));

    // calculate body type
    if (this.bmi < 18.5) {
      this.weightTypeCalculated = 'Underweight ';
    } else if (this.bmi >= 18.5 && this.bmi <= 24.9) {
      this.weightTypeCalculated = 'Normal weight ';
    } else if (this.bmi >= 25 && this.bmi <= 29.9) {
      this.weightTypeCalculated = 'Overweight';
    } else {
      this.weightTypeCalculated = 'Obese';
    }

    // calculate body fat percentage

    if (this.userData.sex == 'Male') {
      this.bodyFatPercent = parseFloat(((1.20 * this.bmi) + (0.23 * this.userData.age) - 16.2).toFixed(2));
    } else if (this.userData.sex == 'Female') {
      this.bodyFatPercent = parseFloat(((1.20 * this.bmi) + (0.23 * this.userData.age) - 5.4).toFixed(2));
    }


    // calculate daily calories required at present weight

    switch (this.userData.workoutActivityType) {
      case 'Very Light':
        this.dailyCalories = parseFloat((this.currentBMRrate * 0.5).toFixed(2));
        break;
      case 'Light':
        this.dailyCalories = parseFloat((this.currentBMRrate * 0.6).toFixed(2));
        break;
      case 'Moderate':
        this.dailyCalories = parseFloat((this.currentBMRrate * 0.7).toFixed(2));
        break;
      case 'Intense':
        this.dailyCalories = parseFloat((this.currentBMRrate * 0.8).toFixed(2));
        break;
      case 'Very Intense':
        this.dailyCalories = parseFloat((this.currentBMRrate * 0.9).toFixed(2));
        break;
      default:
        this.dailyCalories = 0;
    }

    // calculate daily calories required

    switch (this.userData.workoutActivityType) {
      case 'Very Light':
        this.dailyCaloriesDesiredWeight = parseFloat((this.desiredBMRrate * 0.5).toFixed(2));
        break;
      case 'Light':
        this.dailyCaloriesDesiredWeight = parseFloat((this.desiredBMRrate * 0.6).toFixed(2));
        break;
      case 'Moderate':
        this.dailyCaloriesDesiredWeight = parseFloat((this.desiredBMRrate * 0.7).toFixed(2));
        break;
      case 'Intense':
        this.dailyCaloriesDesiredWeight = parseFloat((this.desiredBMRrate * 0.8).toFixed(2));
        break;
      case 'Very Intense':
        this.dailyCaloriesDesiredWeight = parseFloat((this.desiredBMRrate * 0.9).toFixed(2));
        break;
      default:
        this.dailyCaloriesDesiredWeight = 0;
    }

    // calculate body fat mass

    if (this.userData.bodyweightType) {
      this.bodyFatMass = parseFloat(((this.bodyFatPercent * (this.userData.bodyWeight * 2.205)) / 100).toFixed(2));
    } else {
      this.bodyFatMass = parseFloat(((this.bodyFatPercent * this.userData.bodyWeight) / 100).toFixed(2));
    }

    // calculate lean body mass
    // if (this.userData.bodyweightType) {
    //   this.leanBodyMass = parseFloat(((this.userData.bodyWeight * 2.205) - this.bodyFatMass).toFixed(2));
    // } else {
    //   this.leanBodyMass = parseFloat((this.userData.bodyWeight - this.bodyFatMass).toFixed(2));
    // }

    this.leanBodyMass = this.currentBodyWeight - ((this.currentBodyWeight * this.bodyFatPercent) / 100);

    // to save the user value in the database
    let param: Object = {};
    param['age'] = this.userData.age;
    param['bodyWeight'] = this.userData.bodyWeight;
    param['bodyweightType'] = this.userData.bodyweightType;
    param['city'] = 'null';
    param['country'] = 'null';
    param['dailyActivityType'] = this.userData.dailyActivityType;
    param['date'] = this.userData.date;
    param['dietType'] = this.userData.dietType;
    param['email'] = this.userData.email;
    param['name'] = this.userData.name;
    param['goalType'] = this.userData.goalType;
    param['height'] = this.userData.height + (this.userData.heightType ? this.userData.heightInch / 12 : 0);
    param['heightType'] = this.userData.heightType;
    param['lastName'] = 'null';
    param['mealWeight'] = this.userData.mealWeight;
    param['phone'] = 'null';
    param['sex'] = this.userData.sex;
    param['state'] = 'null';
    param['weight'] = this.userData.weight;
    param['weightType'] = this.userData.weightType;
    param['workoutActivityType'] = this.userData.workoutActivityType;
    param['zip'] = 'null';

    param['bmi'] = this.bmi;
    param['weightTypeCalculated'] = this.weightTypeCalculated;
    param['bodyFatPercent'] = this.bodyFatPercent;
    param['dailyCalories'] = this.dailyCalories;
    param['dailyCaloriesDesiredWeight'] = this.dailyCaloriesDesiredWeight;
    param['bodyFatMass'] = this.bodyFatMass;
    param['leanBodyMass'] = this.leanBodyMass;
    param['currentBMRrate'] = this.currentBMRrate;
    param['desiredBMRrate'] = this.desiredBMRrate;
    console.log(this.userData.height + (this.userData.heightType ? this.userData.heightInch / 12 : 0));
    this.saveUserData(param);

  }

  saveUserData(param: any) {
    this.api.saveUserData(param).subscribe((res: any) => {
      console.log(res);
    }, (err) => {
      console.log(err)
    })
  }
}
