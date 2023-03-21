import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [
    HomePageComponent,
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule
  ]
})
export class HomeModule { }