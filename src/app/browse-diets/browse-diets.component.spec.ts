import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseDietsComponent } from './browse-diets.component';

describe('BrowseDietsComponent', () => {
  let component: BrowseDietsComponent;
  let fixture: ComponentFixture<BrowseDietsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrowseDietsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowseDietsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
