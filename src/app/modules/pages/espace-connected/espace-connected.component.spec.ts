import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceConnectedComponent } from './espace-connected.component';

describe('EspaceConnectedComponent', () => {
  let component: EspaceConnectedComponent;
  let fixture: ComponentFixture<EspaceConnectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceConnectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
