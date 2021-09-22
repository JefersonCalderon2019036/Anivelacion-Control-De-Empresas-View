import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDeNavegacionComponent } from './menu-de-navegacion.component';

describe('MenuDeNavegacionComponent', () => {
  let component: MenuDeNavegacionComponent;
  let fixture: ComponentFixture<MenuDeNavegacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDeNavegacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDeNavegacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
