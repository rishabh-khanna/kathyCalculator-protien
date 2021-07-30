import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.scss']
})
export class DietComponent implements OnInit {

  public tilesOneSelected = false;
  public tilesTwoSelected = false;
  public tilesThreeSelected = false;
  public tilesFourSelected = false;
  public tilesFiveSelected = false;
  public tilesSixSelected = false;
  public dietType = true;
  public dietTypeSelected = false;
  public loseWeightVisable = false;
  public dietFormSubmited = false;
  public userData: any;
  public pogressStatus: any;
  public subscription: Subscription;
  public selectedDietType = {};
  public weightLossForm = new FormGroup({
    mealWeight: new FormControl('', Validators.required),
    mealWeightType: new FormControl(true),
  });
  // Pie chart creation
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      position: "right",
      labels: {
        fontSize: 14,
        usePointStyle: true
      }
    },
    tooltips: {
      enabled: true,
      callbacks: {
        label: function (tooltipItem, data) {
          let label = data.labels[tooltipItem.index];
          let count = data
            .datasets[tooltipItem.datasetIndex]
            .data[tooltipItem.index];
          return label + " : " + count + "%";
        },
      },
    },
  };

  storePieLable = ['Protine', 'Carb', 'Fat'];
  storePieValue = [45, 20, 35];

  public pieChartLabels: Label[] = this.storePieLable;
  public pieChartData: SingleDataSet = this.storePieValue;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  // End of pie chart creation
  constructor(
    protected router: Router,
    private data: DataService,
  ) {
    // methods loaded to initialize the chart js
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
  get f() { return this.weightLossForm.controls }
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
    this.pogressStatus.diet = 'active';
    this.weightLossForm.patchValue({
      mealWeight: this.userData.mealWeight,
      mealWeightType: this.userData.mealWeightType,
    });
    this.tilesOneSelected = this.userData.dietType == 'Anything' ? true : false;
    this.tilesTwoSelected = this.userData.dietType == 'Mediterranean' ? true : false;
    this.tilesThreeSelected = this.userData.dietType == 'Paleo' ? true : false;
    this.tilesFourSelected = this.userData.dietType == 'Vegetarian' ? true : false;
    this.tilesFiveSelected = this.userData.dietType == 'Ketogenic' ? true : false;
    this.tilesSixSelected = this.userData.dietType == 'Fully Plant-Based' ? true : false;
    this.data.changeStatus(this.pogressStatus);
  }
  tilesClicked(selectedTiles: string) {
    this.storePieLable = ['Protine', 'Carb', 'Fat'];
    if (selectedTiles == 'one') {
      this.tilesOneSelected = !this.tilesOneSelected;
      this.tilesTwoSelected = false;
      this.tilesThreeSelected = false;
      this.tilesFourSelected = false;
      this.tilesFiveSelected = false;
      this.tilesSixSelected = false;
      this.storePieValue = [45, 20, 35];
      this.selectedDietType = { dietType: 'Anything' }
    } else if (selectedTiles == 'two') {
      this.tilesOneSelected = false;
      this.tilesTwoSelected = !this.tilesTwoSelected;
      this.tilesThreeSelected = false;
      this.tilesFourSelected = false;
      this.tilesFiveSelected = false;
      this.tilesSixSelected = false;
      this.storePieValue = [35, 20, 45];
      this.selectedDietType = { dietType: 'Mediterranean' }
    } else if (selectedTiles == 'three') {
      this.tilesOneSelected = false;
      this.tilesTwoSelected = false;
      this.tilesThreeSelected = !this.tilesThreeSelected;
      this.tilesFourSelected = false;
      this.tilesFiveSelected = false;
      this.tilesSixSelected = false;
      this.storePieValue = [55, 20, 25];
      this.selectedDietType = { dietType: 'Paleo' }
    } else if (selectedTiles == 'four') {
      this.tilesOneSelected = false;
      this.tilesTwoSelected = false;
      this.tilesThreeSelected = false;
      this.tilesFourSelected = !this.tilesFourSelected;
      this.tilesFiveSelected = false;
      this.tilesSixSelected = false;
      this.storePieValue = [40, 40, 20];
      this.selectedDietType = { dietType: 'Vegetarian' }
    } else if (selectedTiles == 'five') {
      this.tilesOneSelected = false;
      this.tilesTwoSelected = false;
      this.tilesThreeSelected = false;
      this.tilesFourSelected = false;
      this.tilesFiveSelected = !this.tilesFiveSelected;
      this.tilesSixSelected = false;
      this.storePieValue = [30, 20, 50];
      this.selectedDietType = { dietType: 'Ketogenic' }
    } else if (selectedTiles == 'six') {
      this.tilesOneSelected = false;
      this.tilesTwoSelected = false;
      this.tilesThreeSelected = false;
      this.tilesFourSelected = false;
      this.tilesFiveSelected = false;
      this.tilesSixSelected = !this.tilesSixSelected;
      this.storePieValue = [45, 35, 20];
      this.selectedDietType = { dietType: 'Fully Plant-Based' }
    }
    this.pieChartLabels = this.storePieLable;
    this.pieChartData = this.storePieValue;
  }
  dietTypeSelectedClicked() {
    if (!this.tilesOneSelected && !this.tilesTwoSelected && !this.tilesThreeSelected && !this.tilesFourSelected && !this.tilesFiveSelected && !this.tilesSixSelected) {
      Swal.fire({
        title: 'Error!',
        text: "You haven't selected any diet type",
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    this.dietTypeSelected = !this.dietTypeSelected;
    this.dietType = !this.dietType;
  }
  navigateToGoals() {
    this.router.navigateByUrl('goals');
  }
  loseWeightVisableClicked() {
    this.dietTypeSelected = !this.dietTypeSelected;
    this.loseWeightVisable = !this.loseWeightVisable;
  }
  navigateToActivity() {
    this.dietFormSubmited = true;
    if (this.weightLossForm.invalid)
      return;
    this.data.changeValue({ ...this.userData, ...this.selectedDietType, ...this.weightLossForm.value });
    this.pogressStatus.diet = 'completed';
    this.data.changeStatus(this.pogressStatus);
    this.router.navigateByUrl('activity')
  }

}
