import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
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
  mode: ProgressBarMode = 'indeterminate';
  loading = false;
  errors: any = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.username = this.fb.control('', Validators.required);
    this.password = this.fb.control('', Validators.required);

    this.formGroup = this.fb.group({
      username: this.username,
      password: this.password,
    });
  }

  ngOnInit(): void {}

  async login(): Promise<void> {
    if (this.formGroup.invalid) {
      this.formGroup.markAsDirty();
      this.formGroup.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.authService
      .login(this.formGroup.value)
      .pipe(finalize(() => (this.loading = false)))
      .toPromise()
      .then((res) => {
        console.log('#TODO res = ', res);
        this.router.navigate(['/']);
      })
      .catch((err) => (this.errors = err));
  }

  getErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }

    return this.username.hasError('email') ? 'Not a valid email' : '';
  }
}
