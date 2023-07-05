import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PATHS } from 'src/common-modules/constants/constants';
import { RegisterService } from '../../services/register.service';
import { EMPTY, catchError, finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-page',

  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  registerButtonHover = false;
  paths = PATHS;
  submitted = false;
  loading = false;
  error: string | undefined = '';
  @ViewChild('registerForm') form: NgForm;

  constructor(private registerService: RegisterService, private snackBar: MatSnackBar, private router: Router) {}

  onRegisterSubmitted() {
    this.submitted = true;
    this.error = undefined;
    
    if (this.form.valid) {
      this.loading = true;
      this.registerService.register(
        this.form.controls['name'].value,
        this.form.controls['prenume'].value,
        this.form.controls['phone'].value,
        this.form.controls['email'].value,
        this.form.controls['password'].value,
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) 
            this.error = 'User with entered email already existent';
          else
            this.snackBar.open('A aparut o eroare', 'Dismiss', { duration: 3000 });
          return EMPTY
        }),
        finalize(() => {this.loading = false;})
      ).subscribe(_ => {
        this.snackBar.open('Ai fost inregistrat cu succes', 'Dismiss', { duration: 3000 });
        this.router.navigateByUrl('/login');
      })
    }
  }
}
