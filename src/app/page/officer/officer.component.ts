import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

export interface PeriodicElement {
  id: number;
  name: String;
  address: String;
  position: String;
  committee: String;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: "Prodenciano", address: "Purok Kimbal, Dahican Mati City", position: "Security", committee: "Women, Family sealer"},
  {id: 1, name: "Prodenciano", address: "Purok Kimbal, Dahican Mati City", position: "Security", committee: "Women, Family sealer"},
  {id: 1, name: "Prodenciano", address: "Purok Kimbal, Dahican Mati City", position: "Security", committee: "Women, Family sealer"},
  {id: 1, name: "Prodenciano", address: "Purok Kimbal, Dahican Mati City", position: "Security", committee: "Women, Family sealer"},
  {id: 1, name: "Prodenciano", address: "Purok Kimbal, Dahican Mati City", position: "Security", committee: "Women, Family sealer"},
  {id: 1, name: "Prodenciano", address: "Purok Kimbal, Dahican Mati City", position: "Security", committee: "Women, Family sealer"},
  {id: 1, name: "Prodenciano", address: "Purok Kimbal, Dahican Mati City", position: "Security", committee: "Women, Family sealer"}
];

@Component({
  selector: 'app-officer',
  templateUrl: './officer.component.html',
  styleUrls: ['./officer.component.scss']
})
export class OfficerComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'address', 'position', 'committee', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
