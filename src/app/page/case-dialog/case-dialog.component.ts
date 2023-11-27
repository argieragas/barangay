import { Component, ViewChild, ElementRef } from '@angular/core';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import {MatDialog} from '@angular/material/dialog';

interface Food {
  value: string;
  viewValue: string;
}

interface Case {
  complaintAddress: string;
  complainantAddress: string;
}

@Component({
  selector: 'app-case-dialog',
  templateUrl: './case-dialog.component.html',
  styleUrls: ['./case-dialog.component.scss']
})
export class CaseDialogComponent {
  @ViewChild('fname') _fname: ElementRef;
  @ViewChild('details') _details: ElementRef;
  constructor(public dialog: MatDialog) {
  }

  case: Case = {
    complaintAddress: "",
    complainantAddress: ""
  }
  foods: Food[] = [
    {value: '', viewValue: '--'},
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  selectedFood = this.foods[0].value

  openMap(type: string){
    const dialogRef = this.dialog.open(MapDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(type == 'complaint'){
        this.case.complaintAddress = result
        this._details.nativeElement.focus()
      }else{
        this.case.complainantAddress = result
        this._fname.nativeElement.focus()
      }
    });
  }
}
