import { Component } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-case-dialog',
  templateUrl: './case-dialog.component.html',
  styleUrls: ['./case-dialog.component.scss']
})
export class CaseDialogComponent {

  foods: Food[] = [
    {value: '', viewValue: '--'},
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  selectedFood = this.foods[0].value
}
