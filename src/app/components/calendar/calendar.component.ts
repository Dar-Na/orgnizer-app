import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import * as moment from "moment";
import {Task, TaskService} from "../../services/task.service";

interface Day {
  value: moment.Moment
  active: boolean
  disabled: boolean
  selected: boolean
  //isTask: boolean
  tasks: Task []
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
            this.taskService.load(value).subscribe( t => {
              if(t.length) {
                t.forEach(tt => {
                  tasks.push({
                    title: tt.title,
                    date: tt.date
                  })})}})

            return {
              value, active, disabled, selected, tasks
            }
          })
      })
    }
    this.calendar = calendar
    // this.tasksUpdate()
  }

  // tasksUpdate() {
  //   this.taskService.getAll().subscribe(data => {
  //     this.calendar.forEach(week => {
  //       for (const day of Object.entries(week)) {
  //         day[1].forEach((isT: any) => {
  //           for (const [_, arr] of Object.entries(data)) {
  //             for (const [_, values] of Object.entries(arr)) {
  //               if (String(isT.value.format('DD-MM-YYYY')) === String(values.date)) {
  //                 isT.isTask = true
  //               }}}})}})})
  // }

  change(day: moment.Moment, isDisabled = false) {
    this.td[0].classList.remove('selected')
    let tmp = document.getElementById(String(day))
    // @ts-ignore
    tmp.classList.add('selected')
    this.td = document.getElementsByClassName("selected");

    this.dateService.changeDate(day, isDisabled)
  }

}
