import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Subscription, filter, pairwise } from 'rxjs';
import { AuthService } from './modules/login/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'vet_app_frontend';
  urlSubscription: Subscription;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.authService.loginSubject$.next(true);
    }

    this.urlSubscription = this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        sessionStorage.setItem('previous_url', events[0].urlAfterRedirects);
        sessionStorage.setItem('current_url', events[1].urlAfterRedirects);
      });
  }

  ngOnDestroy(): void {
    if(this.urlSubscription)
      this.urlSubscription.unsubscribe();
  }

}
