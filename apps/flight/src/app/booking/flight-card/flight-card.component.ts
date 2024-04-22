import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { initialFlight } from '../../model/flight';


@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html'
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
