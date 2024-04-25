import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, lastValueFrom, tap } from 'rxjs';
import { BASE_URL } from '../../app.token';
import { Flight } from '../../model/flight';


@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_URL);
  flights = signal<Flight[]>([]);

  find(from: string, to: string): Observable<Flight[]> {
    const url = this.baseUrl + '/flight';
    const params = { from, to };

    return this.http.get<Flight[]>(url, { params }).pipe(
      tap(flights => this.flights.set(flights))
    );
  }

  findAsPromise(from: string, to: string): Promise<Flight[]> {
    return lastValueFrom(
      this.find(from, to)
    );
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
