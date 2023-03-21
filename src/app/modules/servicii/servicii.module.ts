import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciiRoutingModule } from './servicii-routing.module';
import { ServiciiPageComponent } from './components/servicii-page/servicii-page.component';



@NgModule({
  declarations: [
    ServiciiPageComponent
  ],
  imports: [
    CommonModule,
    ServiciiRoutingModule
  ]
})
export class ServiciiModule { }
