import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { CaseDialogComponent } from '../case-dialog/case-dialog.component';

export interface PeriodicElement {
  no: number;
  title: String;
  complainant: String;
  complaint: String;
  schedule: String;
  status: String;
  remarks: String
}

const ELEMENT_DATA: PeriodicElement[] = [
  {no: 10, title: "Threat", complainant: "Pisac, Salem", complaint: "", schedule: "2021-07-20", status: "Unsettled", remarks: "Pending"},
  {no: 10, title: "Threat", complainant: "Pisac, Salem", complaint: "", schedule: "2021-07-20", status: "Unsettled", remarks: "Pending"},
  {no: 10, title: "Threat", complainant: "Pisac, Salem", complaint: "", schedule: "2021-07-20", status: "Unsettled", remarks: "Pending"},
  {no: 10, title: "Threat", complainant: "Pisac, Salem", complaint: "", schedule: "2021-07-20", status: "Unsettled", remarks: "Pending"},
  {no: 10, title: "Threat", complainant: "Pisac, Salem", complaint: "", schedule: "2021-07-20", status: "Unsettled", remarks: "Pending"},
  {no: 10, title: "Threat", complainant: "Pisac, Salem", complaint: "", schedule: "2021-07-20", status: "Unsettled", remarks: "Pending"},
  {no: 10, title: "Threat", complainant: "Pisac, Salem", complaint: "", schedule: "2021-07-20", status: "Unsettled", remarks: "Pending"},
  {no: 10, title: "Threat", complainant: "Pisac, Salem", complaint: "", schedule: "2021-07-20", status: "Unsettled", remarks: "Pending"}
];
@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(CaseDialogComponent);
    console.log(`Dialog result: `);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  displayedColumns: string[] = ['no', 'title', 'complainant', 'complaint', 'schedule', 'status', 'remarks', 'action'];
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
