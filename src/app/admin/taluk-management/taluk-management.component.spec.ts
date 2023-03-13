import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalukManagementComponent } from './taluk-management.component';

describe('TalukManagementComponent', () => {
  let component: TalukManagementComponent;
  let fixture: ComponentFixture<TalukManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalukManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalukManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
