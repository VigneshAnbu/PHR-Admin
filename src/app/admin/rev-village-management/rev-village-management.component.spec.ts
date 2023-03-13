import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevVillageManagementComponent } from './rev-village-management.component';

describe('RevVillageManagementComponent', () => {
  let component: RevVillageManagementComponent;
  let fixture: ComponentFixture<RevVillageManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevVillageManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevVillageManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
