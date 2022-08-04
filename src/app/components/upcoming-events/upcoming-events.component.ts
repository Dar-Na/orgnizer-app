import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {now} from "moment";

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit {

  constructor(
    public dateService: DataService,
  ) { }

  ngOnInit(): void {
    console.log(now())
  }

}
