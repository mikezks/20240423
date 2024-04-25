import { Component, DoCheck, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormBuilder, NgControl, ReactiveFormsModule } from '@angular/forms';

export type Address = {
  street: string;
  no: string;
  zip: string;
  city: string;
  country: string;
};

@Component({
  selector: 'app-address-cva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address-cva.component.html',
  styleUrl: './address-cva.component.css',
})
export class AddressCvaComponent implements ControlValueAccessor, DoCheck {
  private fb = inject(FormBuilder);
  private ngControl = inject(NgControl);

  onChangeCallback?: (address: Address) => void;
  onTouchedCallback?: (() => void)
  private untouched = true;

  addressForm = this.fb.nonNullable.group({
    street: [''],
    no: [''],
    zip: [''],
    city: [''],
    country: ['']
  });

  constructor() {
    this.ngControl.valueAccessor = this;
  }

  ngDoCheck(): void {
    if (this.untouched && this.addressForm.touched) {
      this.onTouchedCallback?.();
      this.untouched = false;
    }
  }

  writeValue(address: Address): void {
    this.addressForm.setValue(address);
  }

  registerOnChange(addressCallback: (address: Address) => void): void {
    this.onChangeCallback = addressCallback;
  }

  registerOnTouched(touchedCallback: () => void): void {
    this.onTouchedCallback = touchedCallback;
  }

  setDisabledState(isDisabled: boolean): void {
    console.log(isDisabled);
    Object.values(this.addressForm.controls).forEach((control) =>
      isDisabled ? control.disable() : control.enable()
    );
  }

  updateAddress(): void {
    this.onChangeCallback?.(
      this.addressForm.getRawValue()
    )
  }
}
