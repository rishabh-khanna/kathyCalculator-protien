import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  public activityType = true;
  public activityTypeSelected = false;
  public tilesOneSelected = false;
  public tilesTwoSelected = false;
  public tilesThreeSelected = false;
  public tilesFourSelected = false;
  public workoutTilesOneSelected = false;
  public workoutTilesTwoSelected = false;
  public workoutTilesThreeSelected = false;
  public workoutTilesFourSelected = false;
  public workoutTilesFiveSelected = false;
  public userData: any;
  public dailyActivityType = {};
  public workoutActivityType = {};
  public pogressStatus: any;
  public subscription: Subscription;

  constructor(
    protected router: Router,
    private data: DataService,
  ) { }
  ngOnInit(): void {
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
    // this.userData = JSON.parse(localStorage.getItem('userSessionData'));
    // this.pogressStatus = JSON.parse(localStorage.getItem('userSessionProgressData'));
    // this.subscription = this.data.currentData.subscribe(userData => this.userData = userData);
    // this.subscription = this.data.currentPogressData.subscribe(pogressStatus => this.pogressStatus = pogressStatus);
    this.pogressStatus.activity = 'active';
    this.tilesOneSelected = this.userData.dailyActivityType == 'Very Light' ? true : false;
    this.tilesTwoSelected = this.userData.dailyActivityType == 'Light' ? true : false;
    this.tilesThreeSelected = this.userData.dailyActivityType == 'Moderate' ? true : false;
    this.tilesFourSelected = this.userData.dailyActivityType == 'Heavy' ? true : false;
    this.workoutTilesOneSelected = this.userData.workoutActivityType == 'Very Light' ? true : false;
    this.workoutTilesTwoSelected = this.userData.workoutActivityType == 'Light' ? true : false;
    this.workoutTilesThreeSelected = this.userData.workoutActivityType == 'Moderate' ? true : false;
    this.workoutTilesFourSelected = this.userData.workoutActivityType == 'Intense' ? true : false;
    this.workoutTilesFiveSelected = this.userData.workoutActivityType == 'Very Intense' ? true : false;
    this.data.changeStatus(this.pogressStatus);
  }
  tilesClicked(selectedType) {
    if (selectedType == 'one') {
      this.tilesOneSelected = !this.tilesOneSelected;
      this.tilesTwoSelected = false;
      this.tilesThreeSelected = false;
      this.tilesFourSelected = false;
      this.dailyActivityType = { dailyActivityType: 'Very Light' }
    }
    else if (selectedType == 'two') {
      this.tilesOneSelected = false;
      this.tilesTwoSelected = !this.tilesTwoSelected;
      this.tilesThreeSelected = false;
      this.tilesFourSelected = false;
      this.dailyActivityType = { dailyActivityType: 'Light' }
    }
    else if (selectedType == 'three') {
      this.tilesOneSelected = false;
      this.tilesTwoSelected = false;
      this.tilesThreeSelected = !this.tilesThreeSelected;
      this.tilesFourSelected = false;
      this.dailyActivityType = { dailyActivityType: 'Moderate' }
    }
    else if (selectedType == 'four') {
      this.tilesOneSelected = false;
      this.tilesTwoSelected = false;
      this.tilesThreeSelected = false;
      this.tilesFourSelected = !this.tilesFourSelected;
      this.dailyActivityType = { dailyActivityType: 'Heavy' }
    }
  }
  workoutTilesClicked(selectedType) {
    if (selectedType == 'one') {
      this.workoutTilesOneSelected = !this.workoutTilesOneSelected;
      this.workoutTilesTwoSelected = false;
      this.workoutTilesThreeSelected = false;
      this.workoutTilesFourSelected = false;
      this.workoutTilesFiveSelected = false;
      this.workoutActivityType = { workoutActivityType: 'Very Light' }
    } else if (selectedType == 'two') {
      this.workoutTilesOneSelected = false;
      this.workoutTilesTwoSelected = !this.workoutTilesTwoSelected;
      this.workoutTilesThreeSelected = false;
      this.workoutTilesFourSelected = false;
      this.workoutTilesFiveSelected = false;
      this.workoutActivityType = { workoutActivityType: 'Light' }
    } else if (selectedType == 'three') {
      this.workoutTilesOneSelected = false;
      this.workoutTilesTwoSelected = false;
      this.workoutTilesThreeSelected = !this.workoutTilesThreeSelected;
      this.workoutTilesFourSelected = false;
      this.workoutTilesFiveSelected = false;
      this.workoutActivityType = { workoutActivityType: 'Moderate' }
    } else if (selectedType == 'four') {
      this.workoutTilesOneSelected = false;
      this.workoutTilesTwoSelected = false;
      this.workoutTilesThreeSelected = false;
      this.workoutTilesFourSelected = !this.workoutTilesFourSelected;
      this.workoutTilesFiveSelected = false;
      this.workoutActivityType = { workoutActivityType: 'Intense' }
    } else if (selectedType == 'five') {
      this.workoutTilesOneSelected = false;
      this.workoutTilesTwoSelected = false;
      this.workoutTilesThreeSelected = false;
      this.workoutTilesFourSelected = false;
      this.workoutTilesFiveSelected = !this.workoutTilesFiveSelected;
      this.workoutActivityType = { workoutActivityType: 'Very Intense' }
    }
  }
  activityTypeSelectedClicked() {
    if (!this.tilesOneSelected && !this.tilesTwoSelected && !this.tilesThreeSelected && !this.tilesFourSelected) {
      Swal.fire({
        title: 'Error!',
        text: "You haven't selected daily activity type",
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    this.activityType = !this.activityType;
    this.activityTypeSelected = !this.activityTypeSelected;
  }
  navigateToDiet() {
    this.router.navigateByUrl('diet');
  }
  navigateToResults() {
    if (!this.workoutTilesOneSelected && !this.workoutTilesTwoSelected && !this.workoutTilesThreeSelected && !this.workoutTilesFourSelected && !this.workoutTilesFiveSelected) {
      Swal.fire({
        title: 'Error!',
        text: "You haven't selected your workout type",
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    this.data.changeValue({ ...this.userData, ...this.dailyActivityType, ...this.workoutActivityType });
    this.pogressStatus.activity = 'completed';
    this.data.changeStatus(this.pogressStatus);
    this.router.navigateByUrl('results')
  }
}
