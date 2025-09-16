import { TestBed } from '@angular/core/testing';
import { listStore } from './list.store';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

describe('ListStore', () => {
  let store: listStore;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        listStore,                     // ✅ use correct class
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    store = TestBed.inject(listStore);
    http = TestBed.inject(HttpTestingController);
  });

  it('should load items successfully', () => {
    store.loadItems();

    const req = http.expectOne('/api/items');
    req.flush([{ id: 1, name: 'Test', description: 'Desc' }]);

    expect(store.items().length).toBe(1);
    expect(store.error()).toBeNull();   // ✅ items loaded, error cleared
  });

  it('should handle error case', () => {
    store.loadItems();

    const req = http.expectOne('/api/items');
    req.error(new ErrorEvent('Network'));

    expect(store.error()).toBe('Failed to load items'); // ✅ depends on your store code
    expect(store.items().length).toBe(0);
  });
});