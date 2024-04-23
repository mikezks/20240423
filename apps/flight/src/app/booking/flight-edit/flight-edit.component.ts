import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { validateCity, validateCityWithParams } from '../../shared/validation/city-validator';
import { FlightService } from '../services/flight.service';
import { NgIf, JsonPipe } from '@angular/common';


@Component({
    selector: 'app-flight-edit',
    templateUrl: './flight-edit.component.html',
    styleUrl: './flight-edit.component.scss',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgIf, JsonPipe]
})
export class FlightEditComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private flightService = inject(FlightService);

  protected id = 0;
  protected showDetails = false;

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
    this.route.paramMap.subscribe(params => {
      this.id = +(params.get('id') || 0);
      this.showDetails = params.get('showDetails') === 'true';

      this.load(this.id);
    });
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
