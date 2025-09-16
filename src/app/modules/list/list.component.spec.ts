import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { listStore } from './list.store';

describe('List', () => {
  let fixture: ComponentFixture<ListComponent>;
  let comp: ListComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [listStore],
    });
    fixture = TestBed.createComponent(ListComponent);
    comp = fixture.componentInstance;
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should show spinner when loading', () => {
    comp.store.loading.set(true);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('mat-progress-spinner')).toBeTruthy();
  });
});