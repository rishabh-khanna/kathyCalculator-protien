import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private dataSource = new BehaviorSubject({});
  private pogressDataSource = new BehaviorSubject({
    personalDetails: 'notVisited',
    goals: 'notVisited',
    diet: 'notVisited',
    activity: 'notVisited',
    results: 'notVisited',
  })
  currentData = this.dataSource.asObservable();
  currentPogressData = this.pogressDataSource.asObservable();

  constructor() { }

  changeValue(data: any) {
    // console.log(data);
    this.dataSource.next(data);
    // localStorage.setItem("userSessionData", JSON.stringify(data));

    let localStorageValue = JSON.parse(localStorage.getItem('userSessionData'));
    // console.log(localStorageValue);
    // console.log(data);

    if (localStorageValue) {
      localStorage.setItem("userSessionData", JSON.stringify({ ...localStorageValue, ...data }));
    } else {
      localStorage.setItem("userSessionData", JSON.stringify(data));
    }

    // console.log(JSON.parse(localStorage.getItem('userSessionData')));
  }
  changeStatus(data: any) {
    this.pogressDataSource.next(data);


    let localStorageProgressValue = JSON.parse(localStorage.getItem('userSessionProgressData'));
    if (localStorageProgressValue) {
      localStorage.setItem("userSessionProgressData", JSON.stringify({ ...localStorageProgressValue, ...data }));
    } else {
      localStorage.setItem("userSessionProgressData", JSON.stringify(data));
    }
  }

}