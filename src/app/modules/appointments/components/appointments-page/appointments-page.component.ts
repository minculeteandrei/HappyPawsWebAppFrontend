import { Component } from '@angular/core';

@Component({
  selector: 'app-appointments-page',
  templateUrl: './appointments-page.component.html',
  styleUrls: ['./appointments-page.component.scss']
})
export class AppointmentsPageComponent {
  selected: Date | null = null;
}
