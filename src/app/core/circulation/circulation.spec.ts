import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Circulation } from './circulation';

describe('Circulation', () => {
  let component: Circulation;
  let fixture: ComponentFixture<Circulation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Circulation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Circulation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
