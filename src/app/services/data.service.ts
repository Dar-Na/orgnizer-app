import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})

export class DataService {
  public date: BehaviorSubject<any> = new BehaviorSubject(moment())

  changeMonth(num: number) {
    const value = this.date.value.add(num, 'month')
    this.date.next(value)
  }

  changeDate(date: moment.Moment) {
    const value = this.date.value.set({
      date: date.date(),
      month: date.month()
    })
    this.date.next(value)
  }
}
