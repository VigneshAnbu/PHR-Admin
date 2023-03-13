import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HudManagementComponent } from './hud-management.component';

describe('HudManagementComponent', () => {
  let component: HudManagementComponent;
  let fixture: ComponentFixture<HudManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HudManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HudManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
