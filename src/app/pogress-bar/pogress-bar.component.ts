import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pogress-bar',
  templateUrl: './pogress-bar.component.html',
  styleUrls: ['./pogress-bar.component.scss']
})
export class PogressBarComponent implements OnInit {
  public userData = {};
  public pogressStatus: any;
  public subscription: Subscription;
  constructor(
    protected router: Router,
    private data: DataService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.data.currentData.subscribe(userData => this.userData = userData);
    this.subscription = this.data.currentPogressData.subscribe(pogressStatus => this.pogressStatus = pogressStatus);
  }
  navigateToGoals(){
    this.router.navigateByUrl('goals');
  }
  navigateToDiet(){
    this.router.navigateByUrl('diet');
  }
  navigateToActivity(){
    this.router.navigateByUrl('activity');
  }
  navigateToResults(){ 
    this.router.navigateByUrl('results');
  }
  navigateToPersonalDetails(){
    this.router.navigateByUrl('personalDetails');
  }
}
