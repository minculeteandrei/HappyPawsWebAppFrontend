import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryPageComponent } from './components/gallery-page/gallery-page.component';
import { GalleryRoutingModule } from './gallery-routing.module';



@NgModule({
  declarations: [
    GalleryPageComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule
  ]
})
export class GalleryModule { }
