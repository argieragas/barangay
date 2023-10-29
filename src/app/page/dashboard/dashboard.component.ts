import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  year: number;
  cases: number;
  killed: number;
  injured: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {year: 2018, cases: 100, killed: 410, injured: 41},
  {year: 2019, cases: 10, killed: 3, injured: 1},
  {year: 2020, cases: 300, killed: 41, injured: 11},
  {year: 2021, cases: 510, killed: 44, injured: 34},
  {year: 2022, cases: 105, killed: 17, injured: 4},
  {year: 2023, cases: 154, killed: 71, injured: 81}
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  displayedColumns: string[] = ['year', 'cases', 'killed', 'injured'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
