import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../app.token';
import { Flight } from '../../model/flight';


@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_URL);

  find(from: string, to: string): Observable<Flight[]> {
    const url = this.baseUrl + '/flight';
    const params = { from, to };

    return this.http.get<Flight[]>(url, { params });
  }

  findById(id: number): Observable<Flight> {
    const url = this.baseUrl + '/flight';
    const params = { id };

    return this.http.get<Flight>(url, { params });
  }

  save(flight: Flight): Observable<Flight> {
    const url = [
      this.baseUrl, 'flight', flight.id
    ].join('/');

    return this.http.put<Flight>(url, flight);
  }
}
