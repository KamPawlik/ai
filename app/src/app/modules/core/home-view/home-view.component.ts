import { Component, OnInit } from '@angular/core';
import { RateService } from 'src/app/core/services/rate.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
})
export class HomeViewComponent implements OnInit {
  constructor(private rateService: RateService) {
    rateService
      .getUserRates()
      .subscribe((res) => console.log('#TODO rates = ', res));
  }

  ngOnInit(): void {}
}
