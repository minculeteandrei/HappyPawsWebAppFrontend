import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Animal, Appointment } from '../../interfaces/interfaces';
import { AppointmentService } from '../../services/appointment-service.service';
import { EMPTY, Observable, Subscription, catchError, finalize, map, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointments-table',
  templateUrl: './appointments-table.component.html',
  styleUrls: ['./appointments-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AppointmentsTableComponent implements OnInit, OnDestroy{
  dataSource$: Observable<Appointment[]>;
  currentAvailableHours$: Observable<number[]>;
  tableColumns = ['animal', 'animalName', 'date', 'description'];  
  columnNameMap = {
    'animal': 'Animal',
    'animalName': 'Nume animal',
    'date': 'Data',
    'description': 'Motivul Programarii' 
  }
  expandedElement: Appointment | null;
  columnsToDisplayWithExpand = [...this.tableColumns, 'expand'];
  loadingTable = false;
  loadingRescheduleOrDelete = false;
  animals = Animal;
  loadingHours = false;
  selectedDate: Date | null = null;
  selectedHour: number | null = null;
  currentDate = new Date();
  maxDate = new Date();
  rescheduleSubscription: Subscription;
  deleteSubscription: Subscription;
  refreshTableSubscription: Subscription;
  constructor (private appointmentService: AppointmentService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
      this.maxDate.setMonth(this.currentDate.getMonth() + 3);
      this.dataSource$ = this.refreshTable();

      this.refreshTableSubscription = this.appointmentService.refreshTableSubject
        .subscribe(_ => {this.dataSource$ = this.refreshTable()})
  }

  refreshTable(): Observable<Appointment[]> {
    this.loadingTable = true;
    return this.appointmentService.getAllAppointments()
      .pipe(
        catchError(_ => {
          this.snackBar.open('Failed to fetch appointments', 'Dismiss', { duration: 3000 });
          return of([] as Appointment[]);
        }),
        finalize(() => {this.loadingTable = false;})
      )
  }

  refreshHours() {
    if(this.selectedDate){
      this.loadingHours = true;
        
      this.currentAvailableHours$ = this.appointmentService.getAvailableHours(
        this.selectedDate?.getFullYear(),
        this.selectedDate.getMonth() + 1,
        this.selectedDate.getDate()
      ).pipe(
        map((_ : number[]) => {
          const tempArray = [..._].sort();
          const tempArray2 = [];
          tempArray2.push(...tempArray.splice(tempArray.indexOf(Math.min(...tempArray)), 1));
          return [...tempArray2, ...tempArray];
        }),
        catchError(_ => {
          this.snackBar.open('Failed to fetch hours', 'Dismiss', { duration: 3000 });
          return of([] as number[]);
        }),
        finalize(() => { this.loadingHours = false; })
      )
    }
  }

  onRescheduleAppointmentClicked(appointment: Appointment) {
    if(this.selectedDate && this.selectedHour) {
      const appointmentCopy: Appointment = JSON.parse(JSON.stringify(appointment));
      const rescheduleDate = new Date(this.selectedDate);
      rescheduleDate.setHours(this.selectedHour);
      appointmentCopy.date = rescheduleDate.toISOString() as unknown as Date;

      this.loadingRescheduleOrDelete = true;
      this.rescheduleSubscription = this.appointmentService.putAppointment(appointmentCopy)
        .pipe(
          catchError(_ => {
            this.snackBar.open('Failed to reschedule appointment', 'Dismiss', { duration: 3000 });
            return EMPTY
          }),
          finalize(() => {this.loadingRescheduleOrDelete = false;})
        ).subscribe(_ => {
          this.dataSource$ = this.refreshTable();
        })
    }
  }

  onDeleteAppointmentClicked(appointment: Appointment) {
    this.deleteSubscription = this.appointmentService.deleteAppointment(appointment.id)
    .pipe(
      catchError(_ => {
        this.snackBar.open('Failed to delete appointment', 'Dismiss', { duration: 3000 });
        return EMPTY
      }),
      finalize(() => {this.loadingRescheduleOrDelete = false;})
    ).subscribe(_ => {
      this.dataSource$ = this.refreshTable();
    })
  }

  ngOnDestroy(): void {
    if(this.rescheduleSubscription)
      this.rescheduleSubscription.unsubscribe();

    if(this.deleteSubscription)
      this.deleteSubscription.unsubscribe();

    if(this.refreshTableSubscription)
      this.refreshTableSubscription.unsubscribe();
  }
}
