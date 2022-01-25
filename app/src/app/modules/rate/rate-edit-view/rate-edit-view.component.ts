import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { RateService } from 'src/app/core/services/rate.service';

@Component({
  selector: 'app-rate-edit-view',
  templateUrl: './rate-edit-view.component.html',
  styleUrls: ['./rate-edit-view.component.scss'],
})
export class RateEditViewComponent implements OnInit {
  hide = true;
  mode: ProgressBarMode = 'indeterminate';
  loading = false;
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rateService: RateService,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(3), Validators.max(50)],
      ],
      description: ['', [Validators.max(200)]],
      floor: [''],
      rooms: [''],
      sq: [''],
      year: [''],
    });
  }

  ngOnInit(): void {}

  save() {
    if (this.formGroup.invalid) {
      this.formGroup.markAsDirty();
      this.formGroup.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.rateService
      .createRate(this.formGroup.value)
      .pipe(finalize(() => (this.loading = false)))
      .toPromise()
      .then((res) => {
        this.formGroup.reset();
        this.router.navigate(['/']);
      })
      .catch((err) => console.log('#TODO ERROR = ', err));
  }
}
