import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBikesComponent } from './list-bikes.component';

describe('ListBikesComponent', () => {
  let component: ListBikesComponent;
  let fixture: ComponentFixture<ListBikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBikesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListBikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
