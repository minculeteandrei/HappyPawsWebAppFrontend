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
import { RouterModule } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { PipesModule } from './pipes/pipes.module';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    MainNavbarComponent,
    CarouselComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    PipesModule
  ],
  exports: [
    MainNavbarComponent,
    FooterComponent
  ]
})
export class CommonModulesModule { }
