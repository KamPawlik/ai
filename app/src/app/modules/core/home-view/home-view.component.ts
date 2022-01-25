import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { RateService } from 'src/app/core/services/rate.service';

export interface Rate {
  id: number;
  name: string;
  description: string;
  floor: number;
  rooms: number;
  sq?: any;
  year: number;
  price?: any;
}

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
})
export class HomeViewComponent implements OnInit, OnDestroy {
  rates$: Observable<Rate[]>;
  destroy$: Subject<boolean>;

  constructor(private rateService: RateService) {}

  ngOnInit(): void {
    this.destroy$ = new Subject();
    this.rates$ = this.rateService.getUserRates().pipe(
      map((v) => v.sort((a: Rate, b: Rate) => b.id - a.id)),
      shareReplay(1),
      takeUntil(this.destroy$)
    );

    this.rates$.subscribe((res) => {
      console.log('#TODO rates = ', res);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
