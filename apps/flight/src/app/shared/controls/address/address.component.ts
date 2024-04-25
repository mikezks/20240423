import { Component, Input, OnInit, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export type AddressForm = FormGroup<{
  street: FormControl<string>;
  no: FormControl<string>;
  zip: FormControl<string>;
  city: FormControl<string>;
  country: FormControl<string>;
}>;

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="addressForm">
      <div class="form-group">
        <label>Street:</label>
        <input formControlName="street" class="form-control">
      </div>
      <div class="form-group">
        <label>No:</label>
        <input formControlName="street" class="form-control">
      </div>
      <div class="form-group">
        <label>ZIP:</label>
        <input formControlName="zip" class="form-control">
      </div>
      <div class="form-group">
        <label>City:</label>
        <input formControlName="city" class="form-control">
      </div>
      <div class="form-group">
        <label>Country:</label>
        <input formControlName="country" class="form-control">
      </div>
    </form>
  `
})
export class AddressComponent implements OnInit {
  @Input() formGroupName = '';

  private fb = inject(FormBuilder);
  private formGroup = inject(FormGroupDirective, { optional: true });

  addressForm!: AddressForm;

  ngOnInit(): void {
    this.addressForm =
      (this.formGroup?.control?.get(this.formGroupName)) as AddressForm
      || this.fb.group({});

    console.log(this.addressForm);

    this.addressForm.addControl(
      'street',
      new FormControl('', { nonNullable: true })
    );
    this.addressForm.addControl(
      'no',
      new FormControl('', { nonNullable: true })
    );
    this.addressForm.addControl(
      'zip',
      new FormControl('', { nonNullable: true })
    );
    this.addressForm.addControl(
      'city',
      new FormControl('', { nonNullable: true })
    );
    this.addressForm.addControl(
      'country',
      new FormControl('', { nonNullable: true })
    );

    this.addressForm.controls.street.addValidators(Validators.required);
  }
}
