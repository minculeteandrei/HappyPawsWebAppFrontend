import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MainNavbarComponent } from './components/main-navbar/main-navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    MainNavbarComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule
  ],
  exports: [
    MainNavbarComponent
  ]
})
export class CommonModulesModule { }
