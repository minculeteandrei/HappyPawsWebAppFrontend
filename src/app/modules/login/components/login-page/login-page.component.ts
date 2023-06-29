import { Component, ElementRef, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router, RoutesRecognized } from '@angular/router';
import { EMPTY, catchError, filter, finalize, pairwise } from 'rxjs';
import { PATHS } from 'src/common-modules/constants/constants';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginButtonHover = false;
  paths = PATHS;
  submitted = false;
  error: string | undefined = undefined;
  loading = false;
  @ViewChild('loginForm') form: NgForm;

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {}
  onLoginSubmitted() {
    this.submitted = true;
    this.error = undefined;
    
    if (this.form.valid) {
      this.loading = true;
      this.authService.login(this.form.controls['email'].value, this.form.controls['password'].value)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if(error.status === 401 || error.status === 404) 
              this.error = 'Invalid email or password';
            else {
              console.log(error);
              this.snackBar.open('Failed to login', 'Dismiss', { duration: 3000 });
            }

            return EMPTY;
          }),
          finalize(() => {this.loading = false;})
        )
        .subscribe(_ => {
          const prevUrl = sessionStorage.getItem('previous_url');
          if(prevUrl && prevUrl !== PATHS.REGISTER_PAGE)
            this.router.navigateByUrl(prevUrl);
          else 
            this.router.navigateByUrl('');
          });
    }
  }
}
