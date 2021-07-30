import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  public basicDetailsVisable = true;
  public basicDetailsSubmited = false;
  public ageVisable = false;
  public sexVisable = false;
  public heightVisable = false;
  public weightVisable = false;
  public ageSubmited = false;
  public sexSubmited = false;
  public heightSubmited = false;
  public weightSubmited = false;
  public userData: any;
  public pogressStatus: any;
  public subscription: Subscription;
  public basicDetailsForm = new FormGroup({
    name: new FormControl('', Validators.required),
    // lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    // phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    // city: new FormControl('', Validators.required),
    // state: new FormControl('', Validators.required),
    // country: new FormControl('', Validators.required),
    // zip: new FormControl('', Validators.required),
  });
  public personalDetailsForm = new FormGroup({
    age: new FormControl('', Validators.required),
    sex: new FormControl('', Validators.required),
    height: new FormControl('', Validators.required),
    heightInch: new FormControl(''),
    heightType: new FormControl(true),
    bodyWeight: new FormControl('', Validators.required),
    bodyweightType: new FormControl(true)
  });
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
    // console.log(this.userData);
    // this.pogressStatus = JSON.parse(localStorage.getItem('userSessionProgressData'));
    // this.subscription = this.data.currentData.subscribe(userData => this.userData = userData);
    // this.subscription = this.data.currentPogressData.subscribe(pogressStatus => this.pogressStatus = pogressStatus);
    this.pogressStatus.personalDetails = 'active';
    this.basicDetailsForm.patchValue({
      name: this.userData.name,
      // lastName: this.userData.lastName,
      email: this.userData.email,
      // phone: this.userData.phone,
      // city: this.userData.city,
      // state: this.userData.state,
      // country: this.userData.country,
      // zip: this.userData.zip,
    })
    this.personalDetailsForm.patchValue({
      age: this.userData.age,
      sex: this.userData.sex,
      height: this.userData.height,
      heightInch: this.userData.heightType ? this.userData.heightInch : 0,
      heightType: this.userData.heightType,
      bodyWeight: this.userData.bodyWeight,
      bodyweightType: this.userData.bodyweightType
    })
    this.data.changeStatus(this.pogressStatus);
  }
  get f() { return this.basicDetailsForm.controls; }

  getStartedClicked() {
    this.basicDetailsSubmited = true;
    console.log(this.basicDetailsForm.value);
    if (this.basicDetailsForm.invalid)
      return;
    this.basicDetailsVisable = false;
    this.ageVisable = true;
    this.data.changeValue({ ...this.basicDetailsForm.value });
  }
  ageNextClicked() {
    this.ageSubmited = true;
    if (this.personalDetailsForm.get('age').value == '' || this.personalDetailsForm.get('age').value == null)
      return;
    this.ageVisable = false;
    this.sexVisable = true;
  }
  ageBackClicked() {
    this.ageVisable = false;
    this.basicDetailsVisable = true;
  }
  sexNextClicked() {
    this.sexSubmited = true;
    if (this.personalDetailsForm.get('sex').value == '' || this.personalDetailsForm.get('sex').value == null)
      return;
    this.sexVisable = false;
    this.heightVisable = true;
  }
  sexBackClicked() {
    this.ageVisable = true;
    this.sexVisable = false;
  }

  heightBackClicked() {
    this.sexVisable = true;
    this.heightVisable = false;
  }
  heightNextClicked() {
    this.heightSubmited = true;
    if (this.personalDetailsForm.get('height').value == '' || this.personalDetailsForm.get('height').value == null)
      return;
    this.heightVisable = !this.heightVisable;
    this.weightVisable = !this.weightVisable;
  }
  weightNextClicked() {
    this.weightSubmited = true;
    if (this.personalDetailsForm.get('bodyWeight').value == '' || this.personalDetailsForm.get('bodyWeight').value == null)
      return;
    this.navigateToGoals()
  }
  navigateToGoals() {
    this.data.changeValue({ ...this.basicDetailsForm.value, ...this.personalDetailsForm.value });
    this.pogressStatus.personalDetails = 'completed';
    this.data.changeStatus(this.pogressStatus);
    this.router.navigateByUrl('goals');
  }

}
