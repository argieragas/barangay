import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ReportData } from 'src/utils/data';
import { ServiceData } from 'src/app/client/servicedata.client';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']

})
export class ReportDialogComponent {
  @ViewChild('involved') _involved: ElementRef;
  title = ''
  reportData: ReportData = {
    id: 0,
    involved: '',
    incident: '',
    location: '',
    latlng: '',
    date: ''
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private serviceData: ServiceData,
    private dialogRef: MatDialogRef<ReportDialogComponent>) {
    // this.reportData.date = formatDate(new Date(), 'yyyy/MM/dd', 'en')
  }

  ngOnInit() {
    this.title = this.data.dataType
    this.reportData.id = this.data.id
    console.log(this.reportData.id)
  }

  submit(){
    if(this.title == 'Add Report'){
      this.serviceData.addReport(this.reportData).subscribe(
        (message)=>{
          this.showAlert('success', message, '')
          this.dialogRef.close()
        },
        (error)=>{
          this.showAlert('warning', error, '')
        }
      )
    }
  }

  private showAlert(icon: SweetAlertOptions['icon'], title?: string, text?: string): void {
    Swal.fire({
      icon,
      title,
      text,
    });
  }

  openMap(type: string){
    const dialogRef = this.dialog.open(MapDialogComponent);
    console.log(`Dialog result: `);
    dialogRef.afterClosed().subscribe(result => {
      this.reportData.location = result
      this._involved.nativeElement.focus()
    });
  }
}
