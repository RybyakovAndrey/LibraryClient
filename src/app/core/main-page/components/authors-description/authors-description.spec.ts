import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsDescription } from './authors-description';

describe('AuthorsDescription', () => {
  let component: AuthorsDescription;
  let fixture: ComponentFixture<AuthorsDescription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorsDescription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorsDescription);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
