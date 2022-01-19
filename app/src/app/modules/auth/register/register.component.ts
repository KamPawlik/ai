import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.formGroup = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.minLength(3), Validators.max(50)],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.min(6), Validators.max(50)],
      ],
      confirmPassword: [
        '',
        [Validators.required, Validators.min(6), Validators.max(50)],
      ],
    });
  }

  ngOnInit(): void {}

  async register(): Promise<void> {
    this.authService
      .register(this.formGroup.value)
      .toPromise()
      .then((res) => console.log('#TODO RES = ', res))
      .catch((err) => console.log('#TODO ERROR = ', err));
  }
}