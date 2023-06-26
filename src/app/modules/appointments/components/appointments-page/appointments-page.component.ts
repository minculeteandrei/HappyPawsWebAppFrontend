import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment-service.service';
import { EMPTY, Subscription, catchError, finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointments-page',
  templateUrl: './appointments-page.component.html',
  styleUrls: ['./appointments-page.component.scss']
})
export class AppointmentsPageComponent implements OnInit, OnDestroy{
  selected: Date | null = null;
  currentDate = new Date();
  maxDate = new Date();
  loadingHours = false;
  fetchHoursSubscription: Subscription;
  
  constructor(private apointmentService: AppointmentService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.maxDate.setMonth(this.currentDate.getMonth() + 3);
    this.selected = this.currentDate;
  }
  
  refreshHours() {
    if(this.selected){
      this.loadingHours = true;

      if(this.fetchHoursSubscription)
        this.fetchHoursSubscription.unsubscribe();
        
      this.fetchHoursSubscription = this.apointmentService.getAvailableHours(
        this.selected?.getFullYear(),
        this.selected.getMonth() + 1,
        this.selected.getDate()
      ).pipe(
        catchError(_ => {
          this.snackBar.open('Failed to fetch hours', 'Dismiss', { duration: 3000 });
          return EMPTY;
        }),
        finalize(() => { this.loadingHours = false; })
      ).subscribe(hours => {
        console.log(hours);
      })
    }
  }

  ngOnDestroy(): void {
    if (this.fetchHoursSubscription)
      this.fetchHoursSubscription.unsubscribe();
  }
}
