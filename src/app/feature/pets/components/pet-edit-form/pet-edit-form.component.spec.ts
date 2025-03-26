import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetEditFormComponent } from './pet-edit-form.component';

describe('PetEditFormComponent', () => {
  let component: PetEditFormComponent;
  let fixture: ComponentFixture<PetEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
