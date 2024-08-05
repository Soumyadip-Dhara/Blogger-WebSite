import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEntryComponent } from './post-entry.component';

describe('PostEntryComponent', () => {
  let component: PostEntryComponent;
  let fixture: ComponentFixture<PostEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
