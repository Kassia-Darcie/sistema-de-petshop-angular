import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReagendamentoComponent } from './reagendamento.component';

describe('ReagendamentoComponent', () => {
  let component: ReagendamentoComponent;
  let fixture: ComponentFixture<ReagendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReagendamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReagendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
