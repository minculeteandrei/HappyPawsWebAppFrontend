import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CommonModulesModule } from 'src/common-modules/common-modules.module';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MainNavbarComponent } from './components/main-navbar/main-navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    HomePageComponent,
    MainNavbarComponent,
  ],
  imports: [
    CommonModule,
    CommonModulesModule,
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