import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMaintenanceComponent } from './service-maintenance.component';

describe('ServiceMaintenanceComponent', () => {
  let component: ServiceMaintenanceComponent;
  let fixture: ComponentFixture<ServiceMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceMaintenanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
