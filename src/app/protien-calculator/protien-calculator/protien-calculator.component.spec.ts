import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtienCalculatorComponent } from './protien-calculator.component';

describe('ProtienCalculatorComponent', () => {
  let component: ProtienCalculatorComponent;
  let fixture: ComponentFixture<ProtienCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtienCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtienCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
