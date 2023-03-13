import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageAddComponent } from './village-add.component';

describe('VillageAddComponent', () => {
  let component: VillageAddComponent;
  let fixture: ComponentFixture<VillageAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VillageAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VillageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
