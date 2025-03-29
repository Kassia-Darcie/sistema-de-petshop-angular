import { ComponentFixture, TestBed } from '@angular/core/testing';

import { petListComponent } from '../petList/petList.component';

describe('petListComponent', () => {
  let component: petListComponent;
  let fixture: ComponentFixture<petListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [petListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(petListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
