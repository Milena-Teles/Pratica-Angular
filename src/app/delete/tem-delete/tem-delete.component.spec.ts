import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemDeleteComponent } from './tem-delete.component';

describe('TemDeleteComponent', () => {
  let component: TemDeleteComponent;
  let fixture: ComponentFixture<TemDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
