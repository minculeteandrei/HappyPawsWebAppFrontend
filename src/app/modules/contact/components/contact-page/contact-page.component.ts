import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject, catchError, finalize, takeUntil, tap } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { User } from 'src/common-modules/interfaces/interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/login/services/auth.service';
import { ContactFormDataType } from '../../interfaces/interfaces';

@Component({
  selector: 'app-contact-page',
  host: {
    class: "flex flex-col grow"
  },
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnDestroy, OnInit {
  destroy$ = new Subject<void>();
  loadingUserData = false;
  loadingSendMessage = false;
  contactForm = new FormGroup({
    numeComplet: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefon: new FormControl('', [Validators.required, Validators.pattern(/[0-9]+/g)]),
    message: new FormControl('', [Validators.required, Validators.maxLength(500)]),
  });

  constructor(
    private contactService: ContactService, 
    private snackBar: MatSnackBar,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if(this.authService.isLoggedIn() && email) {
      this.loadingUserData = true;
      this.disableForm();
      this.contactService.getUserData(email)
        .pipe(
          takeUntil(this.destroy$),
          catchError(_ => {
            console.log(_);
            this.snackBar.open('Nu s-au putut incarca datele de utilizator', 'Dismiss', { duration: 3000 });
            return EMPTY;
          }),
          finalize(() => {
            this.loadingUserData = false;
            this.enableForm();
          })
        ).subscribe((userData) => {
          this.fillUserForm(userData);
        });
    }
  }

  fillUserForm(userData: User) {
    this.contactForm.get('numeComplet')?.setValue(`${userData.nume} ${userData.prenume}`);
    this.contactForm.get('numeComplet')?.disable();

    this.contactForm.get('email')?.setValue(userData.username);
    this.contactForm.get('email')?.disable();

    this.contactForm.get('telefon')?.setValue(userData.telefon);
    this.contactForm.get('telefon')?.disable();
  }

  disableForm() {
    Object.keys(this.contactForm.controls).forEach(_ => {
      this.contactForm.get(_)?.disable();
    });
  }

  enableForm() {
    if(!this.authService.isLoggedIn())
      Object.keys(this.contactForm.controls).forEach(_ => {
        this.contactForm.get(_)?.enable();
      });
    this.contactForm.controls.message.enable();
  }

  resetForm() {
    if(this.authService.isLoggedIn()) {
      this.contactForm.controls.message.reset();
      return;
    }

    this.contactForm.reset();
  }

  validFormValues(value: Partial<{
    numeComplet: string | null;
    email: string | null;
    telefon: string | null;
    message: string | null;
  }>) {
    return value.numeComplet &&
      value.email &&
      value.telefon &&
      value.message;
  }

  onMessageSentClicked() {
    let value = this.contactForm.getRawValue();
    if(this.contactForm.valid && this.validFormValues(value)) {
      this.loadingSendMessage = true;
      this.contactService.portContactEmail(value as ContactFormDataType)
        .pipe(
          takeUntil(this.destroy$),
          catchError(_ => {
            console.log(_);
            this.snackBar.open('Nu s-a putut trimite mesajul', 'Dismiss', { duration: 3000 });
            return EMPTY;
          }),
          finalize(() => {this.loadingSendMessage = false;})
        ).subscribe(_ => {
          this.snackBar.open('Mesajul a fost trimis cu succes', 'Dismiss', { duration: 3000 });
          this.resetForm();
        })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
