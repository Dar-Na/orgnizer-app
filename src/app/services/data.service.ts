import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})

export class DataService {
  public date: BehaviorSubject<any> = new BehaviorSubject(moment())
  public dateOrg: BehaviorSubject<any> = new BehaviorSubject(moment())

  changeMonth(num: number) {
    const value = this.date.value.add(num, 'month')
    this.date.next(value)
    this.dateOrg.next(value)
  }

  changeDate(date: moment.Moment, isDisabled: boolean) {
    const value = this.dateOrg.value.set({
      date: date.date(),
      month: date.month()
    })
    if (isDisabled) {
      this.date.next(value)
    }
    this.dateOrg.next(value)
  }
}
