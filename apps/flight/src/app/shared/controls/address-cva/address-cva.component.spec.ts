import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressCvaComponent } from './address-cva.component';

describe('AddressCvaComponent', () => {
  let component: AddressCvaComponent;
  let fixture: ComponentFixture<AddressCvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressCvaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressCvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
