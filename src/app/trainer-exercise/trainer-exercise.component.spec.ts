import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerExerciseComponent } from './trainer-exercise.component';

describe('TrainerExerciseComponent', () => {
  let component: TrainerExerciseComponent;
  let fixture: ComponentFixture<TrainerExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainerExerciseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainerExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
