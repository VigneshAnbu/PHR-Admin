import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertUserRegistrationComponent } from './upsert-user-registration.component';

describe('UpsertUserRegistrationComponent', () => {
  let component: UpsertUserRegistrationComponent;
  let fixture: ComponentFixture<UpsertUserRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertUserRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsertUserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
