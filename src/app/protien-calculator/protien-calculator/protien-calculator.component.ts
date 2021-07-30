import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-protien-calculator',
  templateUrl: './protien-calculator.component.html',
  styleUrls: ['./protien-calculator.component.scss']
})
export class ProtienCalculatorComponent implements OnInit {
  
  public static LBS_TO_KG=0.453592;
  constructor() { }
  public basicDetailsSubmited = false;
  public protienIntake =0;
  public protienResult = false;
  public basicDetailsForm = new FormGroup({
    name: new FormControl('', Validators.required),
    // lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    bodyweightType: new FormControl(true),
    weight:new FormControl('', Validators.required),
    gender:new FormControl('', Validators.required),
    goal:new FormControl('', Validators.required)
  });


  ngOnInit(): void {
    this.protienResult= false;  
    this.basicDetailsSubmited = false; 
  }
  get f() { return this.basicDetailsForm.controls; }
 
  changeWeight() {
    console.log("Weight clicked" + this.basicDetailsForm.value.bodyweightType)
  }

  calculateProtienIntake()
  {
    this.basicDetailsSubmited= true;
    if (this.basicDetailsForm.invalid)
      return;
      if(this.basicDetailsForm.value.bodyweightType)
      {
        this.calculateIntakeBasedOnGoals(2.20462);
      }
      else{
        this.calculateIntakeBasedOnGoals(1);
      }
  }
   calculateIntakeBasedOnGoals(lbsVal: number) {
    this.protienResult= false;
    if(this.basicDetailsForm.value.goal == "Sedenatary")
      this.protienIntake = (lbsVal * this.basicDetailsForm.value.weight) * 0.5;   
    else if(this.basicDetailsForm.value.goal == "Light Active")
      this.protienIntake = (lbsVal * this.basicDetailsForm.value.weight) * 0.6;
    else if(this.basicDetailsForm.value.goal == "Moderate")
      this.protienIntake = (lbsVal * this.basicDetailsForm.value.weight) * 0.7;
    else if(this.basicDetailsForm.value.goal == "Active")
      this.protienIntake = (lbsVal * this.basicDetailsForm.value.weight) * 0.8;
    else if(this.basicDetailsForm.value.goal == "Very active")
      this.protienIntake = (lbsVal * this.basicDetailsForm.value.weight) * 0.9;
    else if(this.basicDetailsForm.value.goal == "Athelete")
      this.protienIntake = (lbsVal * this.basicDetailsForm.value.weight) * 1;
    if(this.protienIntake != 0)
    {
      this.protienResult= true;
     // this.basicDetailsForm.reset();
    }
  }
}


