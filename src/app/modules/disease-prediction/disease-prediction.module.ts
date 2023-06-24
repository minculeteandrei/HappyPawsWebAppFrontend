import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiseasePredictionPageComponent } from './components/disease-prediction-page/disease-prediction-page.component';
import { DiseasePredictionRoutingModule } from './disease-prediction-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    DiseasePredictionPageComponent
  ],
  imports: [
    CommonModule,
    DiseasePredictionRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatChipsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    NgxChartsModule
  ]
})
export class DiseasePredictionModule { }
