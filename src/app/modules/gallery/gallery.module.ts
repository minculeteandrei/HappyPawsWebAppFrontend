import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryPageComponent } from './components/gallery-page/gallery-page.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryModule } from  'ng-gallery';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    GalleryPageComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    GalleryModule,
    MatCardModule,
    FlexLayoutModule,

  ]
})
export class GalleryPageModule { }
