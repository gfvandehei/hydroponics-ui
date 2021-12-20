import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DhtCanvasLineGraphComponent } from './dht-canvas-line-graph.component';

describe('DhtCanvasLineGraphComponent', () => {
  let component: DhtCanvasLineGraphComponent;
  let fixture: ComponentFixture<DhtCanvasLineGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DhtCanvasLineGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DhtCanvasLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
