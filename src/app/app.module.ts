import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SelectorComponent } from './components/selector/selector.component';
import { CustomDatePipe } from "./services/customdate.pipe";
import { OrganizerComponent } from './components/organizer/organizer.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { UpcomingEventsComponent } from './components/upcoming-events/upcoming-events.component';
import { CalendarPageComponent } from './components/pages/calendar-page/calendar-page.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CalendarComponent,
    SelectorComponent,
    CustomDatePipe,
    OrganizerComponent,
    UpcomingEventsComponent,
    CalendarPageComponent,
    ContactPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
