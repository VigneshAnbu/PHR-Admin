import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HudAddComponent } from './hud-add.component';

describe('HudAddComponent', () => {
  let component: HudAddComponent;
  let fixture: ComponentFixture<HudAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HudAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HudAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
