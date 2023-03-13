import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevVillageAddComponent } from './rev-village-add.component';

describe('RevVillageAddComponent', () => {
  let component: RevVillageAddComponent;
  let fixture: ComponentFixture<RevVillageAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevVillageAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevVillageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
