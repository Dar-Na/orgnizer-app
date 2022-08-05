import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import * as moment from "moment";
import {Task, TaskService} from "../../services/task.service";

interface Day {
  value: moment.Moment
  active: boolean
  disabled: boolean
  selected: boolean
  tasks: Task[]
}

interface Week {
  days: Day[]
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendar: Week[]
  td = document.getElementsByClassName("selected");

  constructor(
    private dateService: DataService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.dateService.date.subscribe(this.generate.bind(this))
    //console.log(this.prevTd)
  }

  generate(now: moment.Moment) {
    const startDay = now.clone().startOf('month').startOf('week').add(1, 'day')
    const endDay = now.clone().endOf('month').endOf('week').add(1, 'day')
    const date = startDay.clone().subtract(1, 'day')

    const calendar = []
    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone()
            const active = moment().isSame(value, 'date')
            const disabled = !now.isSame(value, 'month')
            const selected = now.isSame(value, 'date')
            let tasks: Task[] = []
            this.taskService.load(value).subscribe(t => {
              if(t.length) {
                t.forEach(tt => {
                  tasks.push({
                    title: tt.title,
                    date: tt.date
                  })
                })
              }
            })
            return {
              value, active, disabled, selected, tasks
            }
          })
      })
    }
    this.calendar = calendar
  }

  change(day: moment.Moment, isDisabled = false) {
    this.td[0].classList.remove('selected')
    let tmp = document.getElementById(String(day))
    // @ts-ignore
    tmp.classList.add('selected')
    this.td = document.getElementsByClassName("selected");

    this.dateService.changeDate(day, isDisabled)
    // this.calendar.map(w => {
    //   w.days.map(d => {
    //     d.selected = day.isSame(d.value, 'day') && day.isSame(d.value, 'month')
    //   })
    // })
    // console.log('changed!')
  }
}
