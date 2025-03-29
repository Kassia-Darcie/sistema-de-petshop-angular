import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDataHoraComponent } from './input-data-hora.component';

describe('InputDataHoraComponent', () => {
  let component: InputDataHoraComponent;
  let fixture: ComponentFixture<InputDataHoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDataHoraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputDataHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
