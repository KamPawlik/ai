import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RateService } from 'src/app/core/services/rate.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
})
export class HomeViewComponent implements OnInit, OnDestroy {
  rates$: Observable<any>;
  destroy$: Subject<boolean>;

  constructor(private rateService: RateService) {}

  ngOnInit(): void {
    this.destroy$ = new Subject();
    this.rates$ = this.rateService
      .getUserRates()
      .pipe(takeUntil(this.destroy$));

    this.rates$.subscribe((res) => console.log('#TODO rates = ', res));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
