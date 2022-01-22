import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateEditViewComponent } from './rate-edit-view.component';

describe('RateEditViewComponent', () => {
  let component: RateEditViewComponent;
  let fixture: ComponentFixture<RateEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateEditViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
