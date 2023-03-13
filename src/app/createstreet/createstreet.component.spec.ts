import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatestreetComponent } from './createstreet.component';

describe('CreatestreetComponent', () => {
  let component: CreatestreetComponent;
  let fixture: ComponentFixture<CreatestreetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatestreetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatestreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
