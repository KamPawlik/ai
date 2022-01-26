import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
export class HomeViewComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  destroy$: Subject<boolean> = new Subject();
  rates$: Observable<Rate[]>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  displayedColumns: string[] = [
    'id',
    'name',
    'year',
    'rooms',
    'floor',
    'sq',
    'price',
  ];

  images: string[] = [
    'apartment-g0be8f0099_1280.jpg',
    'apartment-gd409e2b70_1280.jpg',
    'living-room-g6e71a9e0c_1280.jpg',
  ];

  constructor(private rateService: RateService) {}

  ngOnInit(): void {
    this.rates$ = this.rateService.getUserRates().pipe(
      map((v) => v.sort((a: Rate, b: Rate) => b.id - a.id)),
      map((v) => v.map((v: any, i: any) => ({ ...v, id: i + 1 }))),
      shareReplay(1),
      takeUntil(this.destroy$)
    );

    this.rates$.subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.translatePaginator();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  get image(): string {
    return this.images[Math.floor(Math.random() * this.images.length)];
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  translatePaginator() {
    this.paginator._intl.itemsPerPageLabel = 'Pozycje na stronie';
    this.paginator._intl.nextPageLabel = 'Następna';
    this.paginator._intl.previousPageLabel = 'Poprzednia';
  }
}
