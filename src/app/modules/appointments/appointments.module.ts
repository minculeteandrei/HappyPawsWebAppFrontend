import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsPageComponent } from './components/appointments-page/appointments-page.component';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    AppointmentsPageComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule
  ]
})
export class AppointmentsModule { }
