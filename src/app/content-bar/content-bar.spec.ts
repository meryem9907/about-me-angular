import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentBar } from './content-bar';

describe('ContentBar', () => {
  let component: ContentBar;
  let fixture: ComponentFixture<ContentBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentBar],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
