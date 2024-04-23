import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityPipe } from './pipes/city.pipe';
import { ValidationErrorsComponent } from './validation/validation-errors/validation-errors.component';


@NgModule({
    imports: [
        CommonModule,
        CityPipe,
        ValidationErrorsComponent
    ],
    exports: [
        CityPipe,
        ValidationErrorsComponent
    ]
})
export class SharedModule {}
