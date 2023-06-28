import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment-service.service';
import { EMPTY, Observable, Subscription, catchError, finalize, map, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Animal, Appointment } from '../../interfaces/interfaces';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointments-page',
  templateUrl: './appointments-page.component.html',
  styleUrls: ['./appointments-page.component.scss'],
})
export class AppointmentsPageComponent implements OnInit, OnDestroy{
  selected: Date | null = null;
  currentDate = new Date();
  maxDate = new Date();
  loadingHours = false;
  loadingCreateAppointment = false;
  currentAvailableHours$: Observable<number[]>;
  animals = Animal;
  createApppointmentSubscription: Subscription;
  createAppointmentForm = new FormGroup({
    animalName: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    animal: new FormControl('', Validators.required),
    date: new FormControl(this.datePipe.transform(this.currentDate, 'd/M/yy') ,Validators.required),
    hour: new FormControl(
      {value: null, disabled: this.loadingHours}, 
      Validators.required
    ) as FormControl<number | null> 
  });
  Object = Object;

  constructor(
    private appointmentService: AppointmentService, 
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.maxDate.setMonth(this.currentDate.getMonth() + 3);
    this.selected = this.currentDate;
    this.refreshHours();
  }
  
  refreshHours() {
    if(this.selected){
      this.createAppointmentForm.get('date')
        ?.setValue(this.datePipe.transform(this.selected, 'd/M/yy'));
      this.loadingHours = true;
        
      this.currentAvailableHours$ = this.appointmentService.getAvailableHours(
        this.selected?.getFullYear(),
        this.selected.getMonth() + 1,
        this.selected.getDate()
      ).pipe(
        map((_ : number[]) => {
          const tempArray = [..._].sort();
          const tempArray2 = [];
          tempArray2.push(...tempArray.splice(tempArray.indexOf(Math.min(...tempArray)), 1));
          return [...tempArray2, ...tempArray];
        }),
        tap(_ => {
          this.createAppointmentForm.get('hour')?.setValue(null);
        }),
        catchError(_ => {
          this.snackBar.open('Failed to fetch hours', 'Dismiss', { duration: 3000 });
          return of([] as number[]);
        }),
        finalize(() => { this.loadingHours = false; })
      )
    }
  }

  onCreateAppointmentClicked() {
      const newAppointment = this.processFormData() as unknown as Appointment;
      if (newAppointment) {
        this.loadingCreateAppointment = true;
        this.createApppointmentSubscription = this.appointmentService.postAppointment(newAppointment)
          .pipe(
            catchError(_ => {
              this.snackBar.open('Failed to create new appointment', 'Dismiss', { duration: 3000 });
              return EMPTY;
            }),
            finalize(() => {this.loadingCreateAppointment = false;})
          ).subscribe(_ => {
            this.snackBar.open('Appointment created successfully', 'Dismiss', { duration: 3000 });
            this.appointmentService.refreshTableSubject.next();
            this.refreshHours();
          });
      }      
  }

  processFormData() {
    if(this.selected && this.createAppointmentForm.valid) {
      const newAppointment = JSON.parse(JSON.stringify(this.createAppointmentForm.value));
      const selectedDateCopy = new Date(this.selected);
      
      if(newAppointment.hour)
      selectedDateCopy.setHours(newAppointment.hour);
      selectedDateCopy.setMinutes(0);
      newAppointment.date = selectedDateCopy.toISOString();
      delete newAppointment.hour;

      return newAppointment
    }
    return null;
  }

  ngOnDestroy(): void {
  }
}
