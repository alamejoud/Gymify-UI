import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseWorkoutComponent } from './browse-workout.component';

describe('BrowseWorkoutComponent', () => {
  let component: BrowseWorkoutComponent;
  let fixture: ComponentFixture<BrowseWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrowseWorkoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowseWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
