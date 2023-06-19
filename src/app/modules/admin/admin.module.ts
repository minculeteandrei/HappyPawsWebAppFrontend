import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [
    AdminPageComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule
  ]
})
export class AdminModule { }
