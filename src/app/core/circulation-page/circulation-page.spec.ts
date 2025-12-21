import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirculationPage } from './circulation-page';

describe('CirculationPage', () => {
  let component: CirculationPage;
  let fixture: ComponentFixture<CirculationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CirculationPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CirculationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
