import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  formGroup: FormGroup;
  username: FormControl;
  password: FormControl;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.username = this.fb.control('', Validators.required);
    this.password = this.fb.control('', Validators.required);

    this.formGroup = this.fb.group({
      username: this.username,
      password: this.password,
    });
  }

  ngOnInit(): void {}

  async login(): Promise<void> {
    this.authService
      .login(this.formGroup.value)
      .toPromise()
      .then((res) => console.log('#TODO res = ', res))
      .catch((err) => console.log('#TODO err = ', err));
  }

  getErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }

    return this.username.hasError('email') ? 'Not a valid email' : '';
  }
}
