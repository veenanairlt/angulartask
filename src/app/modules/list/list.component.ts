import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatTableModule } from '@angular/material/table';

import { listStore } from './list.store';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule   
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [listStore],
})
export class ListComponent implements OnInit {
  store = inject(listStore);
  displayedColumns = ['id', 'name', 'description'];  // needed for mat-table

  ngOnInit() {
    this.store.loadItems();
  }
}