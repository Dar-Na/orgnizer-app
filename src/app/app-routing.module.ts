import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalendarPageComponent} from "./components/pages/calendar-page/calendar-page.component";
import {ContactPageComponent} from "./components/pages/contact-page/contact-page.component";


const routes: Routes = [
  {path: '', component: CalendarPageComponent},
  {path: 'contact', component: ContactPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
