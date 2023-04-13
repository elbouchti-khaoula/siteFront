import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceConnectedClientComponent } from './espace-connected-client.component';

describe('EspaceConnectedComponent', () => {
  let component: EspaceConnectedClientComponent;
  let fixture: ComponentFixture<EspaceConnectedClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceConnectedClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceConnectedClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
