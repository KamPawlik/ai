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

  images: string[] = [
    'apartment-g0be8f0099_1280.jpg',
    'apartment-gd409e2b70_1280.jpg',
    'living-room-g6e71a9e0c_1280.jpg',
  ];

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

  get image(): string {
    return this.images[Math.floor(Math.random() * this.images.length)];
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
