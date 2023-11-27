import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';
import { ServiceData } from 'src/app/client/servicedata.client';
import { ReportData } from 'src/utils/data';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class ReportComponent {
  ELEMENT_DATA: ReportData[] = []
  dataSource: any
  ngOnInit(){
    this.getReport()
  }


  delete(id){
    this.serviceData.deleteReport(id).subscribe(
      ()=>{
        this.getReport()
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  getReport(){
    this.serviceData.getReport().subscribe(
      (data)=>{
        this.ELEMENT_DATA = data
        this.dataSource = new MatTableDataSource<ReportData>(data)
        this.dataSource.paginator = this.paginator
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  displayedColumns: String[] = ['no', 'involved', 'incident', 'location', 'date', 'action']

  @ViewChild(MatPaginator) paginator: any;

  constructor(public dialog: MatDialog, private serviceData: ServiceData) {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(type, id) {
    const dialogRef = this.dialog.open(ReportDialogComponent,{
      data: {dataType: type, id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getReport()
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
          ...this.ELEMENT_DATA.map(ed => {
            return [
              ed.involved,
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
