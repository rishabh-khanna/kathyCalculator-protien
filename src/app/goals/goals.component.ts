import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {

  public tilesOneSelected = false;
  public tilesTwoSelected = false;
  public tilesThreeSelected = false;
  public tilesFourSelected = false;
  public tilesFiveSelected = false;
  public goalType = true;
  public selectedGoalType = {};
  public goalTypeSelected = false;
  public goalsFormSubmited = false;
  public userData: any;
  public pogressStatus: any;
  public subscription: Subscription;
  public minDate: Date = new Date();

  public goalsForm = new FormGroup({
    weight: new FormControl('', Validators.required),
    weightType: new FormControl(true),
    date: new FormControl(new Date(), Validators.required)
  })
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
    // this.subscription = this.data.currentData.subscribe(userData => this.userData = userData);
    // this.pogressStatus = JSON.parse(localStorage.getItem('userSessionProgressData'));
    // for demo purpose
    this.tilesClicked('one');
    console.log(this.userData.date);
    // this.subscription = this.data.currentPogressData.subscribe(pogressStatus => this.pogressStatus = pogressStatus);
    this.pogressStatus.goals = 'active';
    this.goalsForm.patchValue({
      weight: this.userData.weight,
      weightType: this.userData.weightType,
      date: this.userData.date? new Date(this.userData.date) : new Date()
    });
    this.tilesOneSelected = this.userData.goalType == 'weight loss' ? true : false;
    this.data.changeStatus(this.pogressStatus);
  }
  navigateToDiet() {
    this.goalsFormSubmited = true;
    if (this.goalsForm.invalid)
      return;
    this.data.changeValue({ ...this.userData, ...this.selectedGoalType, ...this.goalsForm.value });
    this.pogressStatus.goals = 'completed';
    this.data.changeStatus(this.pogressStatus);
    this.router.navigateByUrl('diet')
  }
  get f() { return this.goalsForm.controls; }
  tilesClicked(selectedTiles: string) {
    if (selectedTiles == 'one') {
      this.tilesOneSelected = !this.tilesOneSelected;
      this.tilesTwoSelected = false;
      this.tilesThreeSelected = false;
      this.tilesFourSelected = false;
      this.tilesFiveSelected = false;
      this.selectedGoalType = { goalType: 'weight loss' };
    } else if (selectedTiles == 'two') {
      this.tilesOneSelected = false;
      this.tilesTwoSelected = !this.tilesTwoSelected;
      this.tilesThreeSelected = false;
      this.tilesFourSelected = false;
      this.tilesFiveSelected = false;
      this.selectedGoalType = { goalType: 'weight loss' };
    } else if (selectedTiles == 'three') {
      this.tilesOneSelected = false;
      this.tilesTwoSelected = false;
      this.tilesThreeSelected = !this.tilesThreeSelected;
      this.tilesFourSelected = false;
      this.tilesFiveSelected = false;
      this.selectedGoalType = { goalType: 'weight loss' };
    } else if (selectedTiles == 'four') {
      this.tilesOneSelected = false;
      this.tilesTwoSelected = false;
      this.tilesThreeSelected = false;
      this.tilesFourSelected = !this.tilesFourSelected;
      this.tilesFiveSelected = false;
      this.selectedGoalType = { goalType: 'weight loss' };
    } else if (selectedTiles == 'five') {
      this.tilesOneSelected = false;
      this.tilesTwoSelected = false;
      this.tilesThreeSelected = false;
      this.tilesFourSelected = false;
      this.tilesFiveSelected = !this.tilesFiveSelected;
      this.selectedGoalType = { goalType: 'weight loss' };
    }
  }
  navigateToPersonlaDetails() {
    this.router.navigateByUrl('personalDetails')
  }
  goalTypeSelectedClicked() {
    // console.log("executing",this.tilesOneSelected);
    if (!this.tilesOneSelected && !this.tilesTwoSelected && !this.tilesThreeSelected && !this.tilesFourSelected) {
      Swal.fire({
        title: 'Error!',
        text: "You haven't selected any goals",
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    this.goalType = !this.goalType;
    this.goalTypeSelected = !this.goalTypeSelected;
  }
}
