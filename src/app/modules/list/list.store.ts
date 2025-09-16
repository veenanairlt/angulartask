import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

export interface Item {
  id: number;
  name: string;
  description: string;
}

@Injectable()
export class listStore {
  constructor(private http: HttpClient) {}

  // Signals to hold state
  items = signal<Item[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Method to load items
   loadItems() {
    this.loading.set(true);
    this.http.get<Item[]>('/api/items').pipe(
      catchError(err => {
        this.error.set('Failed to load items');
        this.loading.set(false);
        return of([]);
      }),
    ).subscribe(data => {
      if (data.length) {
        this.items.set(data);
        this.error.set(null);
      }
      this.loading.set(false);
    });
  }
}