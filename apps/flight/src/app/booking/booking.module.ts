import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingRoutingModule } from './booking-routing.module';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { SharedModule } from '../shared/shared.module';
import { FlightEditComponent } from './flight-edit/flight-edit.component';


@NgModule({
    imports: [
        CommonModule,
        BookingRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        FlightCardComponent,
        FlightEditComponent,
        FlightSearchComponent
    ]
})
export class BookingModule {}
