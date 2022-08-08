import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Task, TaskService} from "../../services/task.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  form: FormGroup
  tasks: Task[] = []

  constructor(
    public dateService: DataService,
    private tasksService: TaskService
  ) { }

  ngOnInit(): void {
    this.dateService.dateOrg.pipe(
      switchMap(value => this.tasksService.load(value))
    ).subscribe(tasks => this.tasks = tasks)

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  submit() {
    const {title} = this.form.value

    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }

    this.tasksService.create(task).subscribe(task => {
      this.tasks.push(task)
      this.form.reset()
    }, error => console.log(error))

    this.dateService.changeDate(this.dateService.dateOrg.value, true)
  }

  remove(task: Task) {
    this.tasksService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    }, error => console.log(error))

    this.dateService.changeDate(this.dateService.dateOrg.value, true)
  }

}
