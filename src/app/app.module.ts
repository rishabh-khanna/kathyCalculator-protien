import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PogressBarComponent } from './pogress-bar/pogress-bar.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { GoalsComponent } from './goals/goals.component';
import { DietComponent } from './diet/diet.component';
import { ActivityComponent } from './activity/activity.component';
import { ResultsComponent } from './results/results.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from './data.service';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AdsenseModule } from 'ng2-adsense';
import { ProtienCalculatorComponent } from './protien-calculator/protien-calculator/protien-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PogressBarComponent,
    PersonalDetailsComponent,
    GoalsComponent,
    DietComponent,
    ActivityComponent,
    ResultsComponent,
    ProtienCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    AdsenseModule.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
