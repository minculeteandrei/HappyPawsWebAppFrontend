import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { PATHS } from 'src/common-modules/constants/constants';
import { AuthService } from 'src/app/modules/login/services/auth.service';
import { Role } from 'src/common-modules/interfaces/interface';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent {
  public paths = PATHS;
  public loggedIn$ = this.authService.loginSubject$;
  public hasAnyRole = this.authService.hasAnyRole;
  public role = Role;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {}

  onNavigateFromSidenav(path: string) {
    
  }

  onLogOut() {
    this.authService.logOut();
  }

}
