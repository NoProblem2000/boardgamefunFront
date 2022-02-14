import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameEditingComponent } from './game-editing.component';

describe('GameEditingComponent', () => {
  let component: GameEditingComponent;
  let fixture: ComponentFixture<GameEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameEditingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
