import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() registerSuccess = new EventEmitter<void>();

  formGroup: FormGroup;
  mode: ProgressBarMode = 'indeterminate';
  loading = false;
  hidePassword = true;
  hideConfirmPassword = true;
  errors: any = null;

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
    if (this.formGroup.invalid) {
      this.formGroup.markAsDirty();
      this.formGroup.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.authService
      .register(this.formGroup.value)
      .pipe(finalize(() => (this.loading = false)))
      .toPromise()
      .then((res) => {
        this.formGroup.reset();
        this.registerSuccess.emit();
        console.log('#TODO RES = ', res);
      })
      .catch((err) => (this.errors = err));
  }
}
