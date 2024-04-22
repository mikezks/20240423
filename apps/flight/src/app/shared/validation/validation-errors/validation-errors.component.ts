import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';


export type Error = Record<string, unknown>;

@Component({
  selector: 'app-validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.css'],
})
export class ValidationErrorsComponent implements OnChanges {
  @Input() errors: ValidationErrors = {};
  @Input() field = '';
  hasErrors = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.hasErrors = Object.keys(changes['errors'].currentValue).length > 0;
  }
}
