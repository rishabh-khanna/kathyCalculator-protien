import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PogressBarComponent } from './pogress-bar.component';

describe('PogressBarComponent', () => {
  let component: PogressBarComponent;
  let fixture: ComponentFixture<PogressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PogressBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PogressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
