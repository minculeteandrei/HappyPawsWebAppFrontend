import { Component } from '@angular/core';
import { PATHS } from 'src/common-modules/constants/constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginButtonHover = false;
  paths = PATHS;
}
