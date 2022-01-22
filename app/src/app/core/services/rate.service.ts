import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(private http: HttpClient) { }

  public getUserRates () {
    return this.http
      .get<any>('http://localhost:8000/api/rates/');
  }

  public createRate(rate: any) {
    return this.http.post('http://localhost:8000/api/rates/', rate);
  }

  public deleteRate(id: number) {
    return this.http.delete(`http://localhost:8000/api/rates/${id}/`);
  }
}
