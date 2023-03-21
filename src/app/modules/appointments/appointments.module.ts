import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsPageComponent } from './components/appointments-page/appointments-page.component';
import { AppointmentsRoutingModule } from './appointments-routing.module';



@NgModule({
  declarations: [
    AppointmentsPageComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule
  ]
})
export class AppointmentsModule { }
