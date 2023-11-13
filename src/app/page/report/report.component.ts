import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';


export interface PeriodicElement {
  no: number;
  involve: String,
  incident: String,
  location: String;
  date: String;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {no: 1, involve: "Prodenciano", incident: "Thieft", location: "Purok Kimbal, Dahican Mati City", date: "Nov 13, 2023"},
  {no: 1, involve: "Prodenciano", incident: "Thieft", location: "Purok Kimbal, Dahican Mati City", date: "Nov 13, 2023"},
  {no: 1, involve: "Prodenciano", incident: "Thieft", location: "Purok Kimbal, Dahican Mati City", date: "Nov 13, 2023"},
  {no: 1, involve: "Prodenciano", incident: "Thieft", location: "Purok Kimbal, Dahican Mati City", date: "Nov 13, 2023"},
  {no: 1, involve: "Prodenciano", incident: "Thieft", location: "Purok Kimbal, Dahican Mati City", date: "Nov 13, 2023"},
  {no: 1, involve: "Prodenciano", incident: "Thieft", location: "Purok Kimbal, Dahican Mati City", date: "Nov 13, 2023"}
]
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class ReportComponent implements AfterViewInit {
  displayedColumns: String[] = ['no', 'involved', 'incident', 'location', 'date', 'action']
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA)

  @ViewChild(MatPaginator) paginator: any;

  constructor(public dialog: MatDialog) {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ReportDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  generatePDF(){
    let docDefinition: any = {
      content: [
        {
          text: 'List of Barangay Officers',
          bold: true,
          fontSize: 15,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        this.table()
      ],
      pageOrientation: 'landscape',
      info: {
        title: 'Case Data',
        auhor: 'Brgy. Dahican',
        subject: 'Case',
        keywords: 'Cases report'
      },
      styles:{
        tableHeader: {
          bold: true,
          alignment: 'center'
        },
      }
    }
    pdfMake.createPdf(docDefinition).download();
  }

  table(){
    return {
      table: {
        widths: ['20%', '30%', '30%', '20%'],
        body:[
          [
            {
              text: 'Person Involved',
              style: 'tableHeader'
            },
            {
              text: 'Incident',
              style: 'tableHeader'
            },
            {
              text: 'Location',
              style: 'tableHeader'
            },{
              text: 'Date',
              style: 'tableHeader'
            }
          ],
          ...ELEMENT_DATA.map(ed => {
            return [
              ed.involve,
              ed.incident,
              ed.location,
              ed.date
            ]
          })
        ]
      }
    }

  }
}
