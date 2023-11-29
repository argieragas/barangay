import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { CaseDialogComponent } from '../case-dialog/case-dialog.component';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { CaseData } from 'src/utils/data';
import { ServiceData } from 'src/app/client/servicedata.client';

export interface PeriodicElement {
  no: number;
  title: String;
  complainant: String;
  complaint: String;
  schedule: String;
  status: String;
  remarks: String
}

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent {
  caseData: CaseData[] = []
  dataSource: any
  ngOnInit(){
    this.getCase()
  }
  @ViewChild(MatPaginator) paginator: any;

  constructor(public dialog: MatDialog, private serviceData: ServiceData) {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }

  getCase(){
    this.serviceData.getCase().subscribe(
      (data)=>{
        this.caseData = data
        console.log(data)
        this.dataSource = new MatTableDataSource<CaseData>(data)
        this.dataSource.paginator = this.paginator;
      },
      (error)=>{
        console.log(error)
      }
    )
  }


  generatePDF() {
    let docDefinition: any = {
      content: [
        {
          text: 'Reported Cases in Barangay Dahican',
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
        widths: ['5%', '11.875%', '11.875%', '11.875%', '11.875%', '11.875%', '11.875%', '11.875%', '11.875%'],
        headerRows: 2,
        // keepWithHeaderRows: 1,
        body: [
          [
            {
              rowSpan: 2,
              text: 'No.',
              style: 'tableHeader'
            },
            {
              rowSpan: 2,
              text: 'Case Title.',
              style: 'tableHeader'
            },
            {
              text: 'Complainant',
              colSpan: 2,
              style: 'tableHeader'
            }, {},
            {
              text: 'Complainant',
              colSpan: 3,
              style: 'tableHeader'
            }, {},{},
            {
              text: 'Schedule',
              rowSpan: 2,
              style: 'tableHeader'
            },
            {
              text: 'Status',
              rowSpan: 2,
              style: 'tableHeader'
            }
          ],
          ['', '',
            {
              text: 'Name',
              style: 'tableHeader',
            },
            {
              text: 'Address',
              style: 'tableHeader',
            },
            {
              text: 'Name',
              style: 'tableHeader',
            },
            {
              text: 'Address',
              style: 'tableHeader',
            },
            {
              text: 'Complaint',
              style: 'tableHeader',
            },'',''
          ],
          ...this.caseData.map(ed => {
            return [
              ed.id, ed.title,
              ed.complainantlName+' '+ed.complainantfName+' '+ed.complainantmName,
              ed.schedule,
              ed.status,
              ed.remark,
              ed.schedule,
              ed.status
            ]
          })
        ]
      }
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(CaseDialogComponent);
    console.log(`Dialog result: `);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  displayedColumns: string[] = ['no', 'title', 'complainant', 'complaint', 'schedule', 'status', 'remarks', 'action'];


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
