import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionPageComponent } from './nutrition-page.component';

describe('NutritionPageComponent', () => {
  let component: NutritionPageComponent;
  let fixture: ComponentFixture<NutritionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NutritionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NutritionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
