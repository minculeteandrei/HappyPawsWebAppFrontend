import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlePipe } from './pipes/title.pipe';



@NgModule({
  declarations: [TitlePipe],
  imports: [
    CommonModule
  ],
  exports: [
    TitlePipe
  ]
})
export class PipesModule { }
