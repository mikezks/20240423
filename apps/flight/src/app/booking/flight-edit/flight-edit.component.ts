import { Component, booleanAttribute, effect, inject, input, numberAttribute, untracked } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { validateCity, validateCityWithParams } from '../../shared/validation/city-validator';
import { FlightService } from '../services/flight.service';
import { JsonPipe } from '@angular/common';
import { Flight } from '../../model/flight';


@Component({
    selector: 'app-flight-edit',
    templateUrl: './flight-edit.component.html',
    styleUrl: './flight-edit.component.scss',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, JsonPipe]
})
export class FlightEditComponent {
  private fb = inject(FormBuilder);
  private flightService = inject(FlightService);

  protected id = input(0, {
    transform: numberAttribute
  });
  protected showDetails = input(false, {
    transform: booleanAttribute
  });
  protected flight = input.required<Flight>();

  editForm = this.fb.nonNullable.group({
    id: [0],
    from: ['', [
      Validators.required,
      Validators.minLength(3),
      validateCity
    ]],
    to: ['', [
      Validators.required,
      Validators.minLength(3),
      validateCityWithParams([
        'Graz', 'Hamburg', 'Madrid'
      ])
    ]],
    date: [new Date().toISOString()],
    delayed: [false],
  });

  constructor() {
    // effect(() => this.load(this.id()));
    effect(
      () => this.editForm.patchValue(this.flight())
    );
  }

  protected save(): void {
    console.log('value', this.editForm.value);
    console.log('valid', this.editForm.valid);
    console.log('dirty', this.editForm.dirty);
    console.log('touched', this.editForm.touched);

    if (this.editForm.valid) {
      this.flightService.save(
        this.editForm.getRawValue()
      ).subscribe({
        next: flight => this.editForm.patchValue(flight),
        error: err => console.error(
          'Error on saving a flight',
          err
        )
      });
    }
  }

  protected load(id: number): void {
    this.flightService.findById(id).subscribe(
      flight => this.editForm.patchValue(flight)
    );
  }
}
