import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Animal, Appointment } from '../../interfaces/interfaces';
import { AppointmentService } from '../../services/appointment-service.service';
import { EMPTY, Observable, Subject, catchError, finalize, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../../../../common-modules/components/confirmation-dialog/confirmation-dialog.component';
import { DialogAction, Resource } from 'src/common-modules/interfaces/interface';

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
  invalidDateError = false;
  noAvailableHoursError = false;
  destroy$ = new Subject<void>();

  constructor (
    private appointmentService: AppointmentService, 
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
      this.maxDate.setMonth(this.currentDate.getMonth() + 3);
      this.initCurrentTime();
      this.dataSource$ = this.refreshTable();

      this.appointmentService.refreshTableSubject
        .pipe(takeUntil(this.destroy$))
        .subscribe(_ => {this.dataSource$ = this.refreshTable()})
  }

  initCurrentTime() {
    this.currentDate.setHours(0);
    this.currentDate.setMinutes(0);
    this.currentDate.setSeconds(0);
    this.currentDate.setMilliseconds(0);
  }

  refreshTable(): Observable<Appointment[]> {
    this.loadingTable = true;
    return this.appointmentService.getAllAppointments()
      .pipe(
        tap(_ => {
          console.log(typeof _[0].date); 
          _.sort((a, b) => moment(a.date).toDate().getTime() - moment(b.date).toDate().getTime())
        }),
        catchError(_ => {
          console.log(_);
          this.snackBar.open('Nu s-au putut incarca programarile', 'Dismiss', { duration: 3000 });
          return of([] as Appointment[]);
        }),
        finalize(() => {this.loadingTable = false;})
      )
  }

  isFutureDate(element: any) {
    if(element.date)
      return moment(element.date).toDate().getTime() > this.currentDate.getTime(); 
    return true;
  }

  expandContent(element: any , expandedElement: any) {
    if(expandedElement === element) return null;
    if(this.isFutureDate(element)) return element;
    return null;
  }

  isValidDate(date: Date, min: Date, max: Date) {
    return date.getTime() >= min.getTime() && 
      date.getTime() <= max.getTime();
  }

  refreshHours() {
    if(this.selectedDate){
      if(!this.isValidDate(this.selectedDate, this.currentDate, this.maxDate)) {
        console.log(this.selectedDate, this.currentDate);
        this.invalidDateError = true;
        return;
      }
      
      this.loadingHours = true;
      this.invalidDateError = false;
      this.noAvailableHoursError = true;
        
      this.currentAvailableHours$ = this.appointmentService.getAvailableHours(
        this.selectedDate?.getFullYear(),
        this.selectedDate.getMonth() + 1,
        this.selectedDate.getDate()
      ).pipe(
        tap(_ => {
          if(_.length === 0) 
            this.noAvailableHoursError = true;
        }),
        map((_ : number[]) => {
          const tempArray = [..._].sort();
          const tempArray2 = [];
          tempArray2.push(...tempArray.splice(tempArray.indexOf(Math.min(...tempArray)), 1));
          return [...tempArray2, ...tempArray];
        }),
        catchError(_ => {
          this.snackBar.open('Nu s-au putut incarca orele disponibile', 'Dismiss', { duration: 3000 });
          return of([] as number[]);
        }),
        finalize(() => { this.loadingHours = false; })
      )
    }
  }

  openDialog(action: DialogAction, resourceName: string) {
    return this.dialog.open(ConfirmationDialog, {data: {action, resourceName}});
  }

  processData(appointment: Appointment, date: Date, hour: number) {
    const appointmentCopy: Appointment = JSON.parse(JSON.stringify(appointment));
    const rescheduleDate = new Date(date);
    rescheduleDate.setHours(hour);
    appointmentCopy.date = rescheduleDate.toISOString() as unknown as Date;
    
    return appointmentCopy;
  }

  onRescheduleAppointmentClicked(appointment: Appointment) {
      this.openDialog(DialogAction.Reschedule, Resource.Appointment).afterClosed()
        .pipe(
          takeUntil(this.destroy$),
          switchMap(_ => {
            if(this.selectedDate && this.selectedHour && _) {
              const rescheduledAppointment = this.processData(appointment, this.selectedDate, this.selectedHour);
              this.loadingRescheduleOrDelete = true;
              return this.appointmentService.putAppointment(rescheduledAppointment);
            }
            return EMPTY;
          }),
          catchError(_ => {
            this.snackBar.open('Failed to reschedule appointment', 'Dismiss', { duration: 3000 });
            return EMPTY
          }),
          finalize(() => {this.loadingRescheduleOrDelete = false;})
        ).subscribe(_ => {
          this.snackBar.open('Programarea a fost reprogramata cu succes', 'Dismiss', { duration: 3000 });
          this.dataSource$ = this.refreshTable();
        })
  }

  onDeleteAppointmentClicked(appointment: Appointment) {
    this.openDialog(DialogAction.Delete, Resource.Appointment).afterClosed()
    .pipe(
      takeUntil(this.destroy$),
      switchMap(_ => {
        if(_) {
          this.loadingRescheduleOrDelete = true;
          return this.appointmentService.deleteAppointment(appointment.id);
        }
        return EMPTY;
      }),
      catchError(_ => {
        this.snackBar.open('Nu s-a putut sterge programarea', 'Dismiss', { duration: 3000 });
        return EMPTY
      }),
      finalize(() => {this.loadingRescheduleOrDelete = false;})
    ).subscribe(_ => {
      this.snackBar.open('Programarea a fost stearsa cu succes', 'Dismiss', { duration: 3000 });
      this.dataSource$ = this.refreshTable();
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
