import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciiRoutingModule } from './servicii-routing.module';
import { ServiciiPageComponent } from './components/servicii-page/servicii-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ServiciiPageComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ServiciiRoutingModule,
    MatButtonModule
  ]
})
export class ServiciiModule { }
