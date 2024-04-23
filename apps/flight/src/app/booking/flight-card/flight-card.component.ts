import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { initialFlight } from '../../model/flight';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
    <div
      [ngClass]="{ selected }"
      class="card"
    >
      <div class="card-header">
        <h2 class="card-title">
          {{ item.from }} - {{ item.to }}
        </h2>
      </div>

      <div class="card-body">
        <p>Flight No.: {{ item.id }}</p>
        <p>Date: {{ item.date | date:'dd.MM.yyyy HH:mm' }}</p>
        <p>Delayed: {{ item.delayed }}</p>
        <p>
          <button (click)="toggleSelection()" class="btn btn-default">
            {{ selected ? 'Remove' : 'Select' }}
          </button>
          <button
            [routerLink]="['../edit', item.id, { showDetails: true }]"
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
  @Input() item = initialFlight;
  @Input() selected = false;
  @Output() selectedChange = new EventEmitter<boolean>();

  ngOnInit(): void {
    console.log('Flight Card INIT', this.item.id);
  }

  toggleSelection(): void {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }

  ngOnDestroy(): void {
    console.log('Flight Card DESTROY', this.item.id);
  }
}
