import { Component } from '@angular/core';
import { PATHS } from 'src/common-modules/constants/constants';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  registerButtonHover = false;
  paths = PATHS;
}
