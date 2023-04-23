import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { ContactRoutingModule } from './contact-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    ContactPageComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ]
})
export class ContactModule { }
