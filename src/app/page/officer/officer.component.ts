import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { OfficerDialogComponent } from '../officer-dialog/officer-dialog.component';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

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
    const dialogRef = this.dialog.open(OfficerDialogComponent);
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
        widths: ['25%', '40%', '10%', '25%'],
        body:[
          [
            {
              text: 'Name',
              style: 'tableHeader'
            },
            {
              text: 'Address',
              style: 'tableHeader'
            },
            {
              text: 'Position',
              style: 'tableHeader'
            },{
              text: 'Committee',
              style: 'tableHeader'
            }
          ],
          ...ELEMENT_DATA.map(ed => {
            return [
              ed.name,
              ed.address,
              ed.position,
              ed.committee
            ]
          })
        ]
      }
    }

  }
}
