import { DatePipe, NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit, input, model } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Flight } from '../../model/flight';


@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [
    NgClass, DatePipe,
    RouterLink
  ],
  template: `
    <div
      [ngClass]="{ selected: selected() }"
      class="card"
    >
      <div class="card-header">
        <h2 class="card-title">
          {{ item().from }} - {{ item().to }}
        </h2>
      </div>

      <div class="card-body">
        <p>Flight No.: {{ item().id }}</p>
        <p>Date: {{ item().date | date:'dd.MM.yyyy HH:mm' }}</p>
        <p>Delayed: {{ item().delayed }}</p>
        <p>
          <button (click)="toggleSelection()" class="btn btn-default">
            {{ selected() ? 'Remove' : 'Select' }}
          </button>
          <button
            [routerLink]="['../edit', item().id, { showDetails: true }]"
            class="btn btn-default"
          >
            Edit
          </button>
        </p>
      </div>
    </div>
  `
})
export class FlightCardComponent implements OnInit, OnDestroy {
  item = input.required<Flight>();
  selected = model(false);

  ngOnInit(): void {
    console.log('Flight Card INIT', this.item().id);
  }

  toggleSelection(): void {
    this.selected.update(selected => !selected);
  }

  ngOnDestroy(): void {
    console.log('Flight Card DESTROY', this.item().id);
  }
}
