import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { DISEASE_SYMPTOMS } from '../../constants/symptoms';
import { FormControl } from '@angular/forms';
import { DiseasePredictionService } from '../../services/disease-prediction.service';
import { EMPTY, Subscription, catchError, finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Color, LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-disease-prediction-page',
  templateUrl: './disease-prediction-page.component.html',
  styleUrls: ['./disease-prediction-page.component.scss']
})
export class DiseasePredictionPageComponent implements OnDestroy{
  diseaseSymptoms = DISEASE_SYMPTOMS;
  symptoms = new FormControl('');
  selectedSymptoms = this.symptoms.value;
  loading = false;
  Object = Object;
  predictionSubscription: Subscription;
  predicted = false;
  chartOptions = {
    colorScheme: {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#32a852']
    } as Color,
    view: [700, 400] as [number, number],
    data: [] as any[],
    legendPosition: "right" as LegendPosition,

  }

  constructor(private dpService: DiseasePredictionService, private snackBar: MatSnackBar) {}
  

  isOptionDisabled(symptom: string) {
    if (this.symptoms.value)
      return this.symptoms.value?.length >= 10 && !(this.symptoms.value as any).find((_: string) => _ === symptom);

    return false;
  }

  removeSymptom(symptom: string) {
    const selectedSymptomsCopy = JSON.parse(JSON.stringify(this.symptoms.value));
    const removedIndex = selectedSymptomsCopy.indexOf(symptom);
    selectedSymptomsCopy.splice(removedIndex, 1);
    this.symptoms.setValue(selectedSymptomsCopy);
  }

  onSubmitPredictionClicked() {
    this.loading = true;
    this.predictionSubscription = this.dpService.getDiseasePrediction(this.symptoms.value as unknown as string[])
      .pipe(
        catchError(_ => {
          this.snackBar.open('Failed to predict disease', 'Dismiss', { duration: 3000 });
          return EMPTY;
        }),
        finalize(() => {this.loading = false;})
      )
      .subscribe((response: any) => {
        let diseaseData: any[] = [];
        Object.keys(response).forEach(_ => {diseaseData.push({name: _, value: response[_]})});
        console.log(diseaseData);
        this.chartOptions.data = diseaseData;
        this.predicted = true;
      });
  }

  formatTooltipText(data: any) {
    return `${data.data.label}: ${data.data.value}%`;
  }

  ngOnDestroy(): void {
    if (this.predictionSubscription)
      this.predictionSubscription.unsubscribe();
  }
}
