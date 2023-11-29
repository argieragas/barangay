import { Component, ViewChild, ElementRef } from '@angular/core';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { CaseData, LocationData } from 'src/utils/data';
import { ServiceData } from 'src/app/client/servicedata.client';

interface Case {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-case-dialog',
  templateUrl: './case-dialog.component.html',
  styleUrls: ['./case-dialog.component.scss']
})
export class CaseDialogComponent {
  @ViewChild('fname') _fname: ElementRef;
  @ViewChild('details') _details: ElementRef;
  cases: Case[] = [
    {value: '', viewValue: '--'},
    {value: 'Abandoning a minor (Child under 7 years old)', viewValue: 'Abandoning a minor (Child under 7 years old)'},
    {value: 'Abandonment of minor by persons entrusted with his/her custody', viewValue: 'Abandonment of minor by persons entrusted with his/her custody'},
    {value: `Abandonment of a person in danger and abandonment on one's victim`, viewValue: `Abandonment of a person in danger and abandonment on one's victim`},
  ];
  constructor(public dialog: MatDialog, private serviceData: ServiceData) {}
  caseData: CaseData = {
    id: 0,
    title: '',
    type: '',
    complainantfName: '',
    complainantmName: '',
    complainantlName: '',
    complainantAddress: '',
    complainantLatLng: '',
    complaintfName: '',
    complaintmName: '',
    complaintlName: '',
    complaintAddress: '',
    complaintLatLng: '',
    schedule: '',
    status: 'Penging',
    remark: '',
    location: '',
    details: ''
  }
  selectedFood = this.cases[0].value

  submit(){
    
  }

  openMap(type: string){
    const dialogRef = this.dialog.open(MapDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(type == 'complaint'){
        this.caseData.complaintAddress = result.location
        this.caseData.complaintLatLng = result.latlng
        this._details.nativeElement.focus()
      }else{
        this.caseData.complainantAddress = result.Location
        this.caseData.complainantLatLng = result.latlng
        this._fname.nativeElement.focus()
      }
    });
  }
}
