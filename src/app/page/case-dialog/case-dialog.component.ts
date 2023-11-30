
import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CaseData, LocationData } from 'src/utils/data';
import { ServiceData } from 'src/app/client/servicedata.client';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';

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
  title = ''
  @ViewChild('fname') _fname: ElementRef
  @ViewChild('details') _details: ElementRef
  cases: Case[] = [
    {value: '', viewValue: '--'},
    {value: 'ABANDONING A MINOR (CHILD UNDER 7 YEARS OLD)', viewValue: 'ABANDONING A MINOR (CHILD UNDER 7 YEARS OLD)'},
    {value: 'ABANDONMENT OF A MINOR BY PERONS ENTRUSTED WITH HIS/HER CUSTODY', viewValue: 'ABANDONMENT OF A MINOR BY PERONS ENTRUSTED WITH HIS/HER CUSTODY'},
    {value: `ABANDONMENT OF A PERSON IN DANGER AND ABANDONMENT OF ONE’S VICTIM `, viewValue: `ABANDONMENT OF A PERSON IN DANGER AND ABANDONMENT OF ONE’S VICTIM `},
    {value: `ACTS OF LASCIVIOUSNESS WITH THE CONSENT OF THE OFFENDED PARTY `, viewValue: 'ACTS OF LASCIVIOUSNESS WITH THE CONSENT OF THE OFFENDED PARTY '},
    {value: 'ALARMS AND SCANDALS', viewValue: 'ALARMS AND SCANDALS '},
    {value: 'ALTERING BOUNDARIES OR LANDMARKS', viewValue: 'ALTERING BOUNDARIES OR LANDMARKS'},
    {value: 'DISCOVERING SECRETS THROUGH SEIZURE AND CORRESPONDENCE', viewValue: 'DISCOVERING SECRETS THROUGH SEIZURE AND CORRESPONDENCE'},
    {value: 'FENCING OF STOLEN PROPERTIES IF THE PROPERTY INVOLVED IS NOT MORE THAN P50.00 ', viewValue: 'FENCING OF STOLEN PROPERTIES IF THE PROPERTY INVOLVED IS NOT MORE THAN P50.00 '},
    {value: 'FORMATION, MAINTENANCE AND PROHIBITION OF COMBINATION OF CAPITAL OR LABOR THROUGH VIOLENCE OR THREATS ', viewValue: 'FORMATION, MAINTENANCE AND PROHIBITION OF COMBINATION OF CAPITAL OR LABOR THROUGH VIOLENCE OR THREATS '},
    {value: 'GIVING ASSISTANCE TO CONSUMMATED SUICIDE', viewValue: 'GIVING ASSISTANCE TO CONSUMMATED SUICIDE'},
    {value: 'GRAVE COERCION', viewValue: 'GRAVE COERCION'},
    {value: 'ILLEGAL USE OF UNIFORMS AND INSIGNIAS', viewValue: 'ILLEGAL USE OF UNIFORMS AND INSIGNIAS'},
    {value: 'INCRIMINATING INNOCENT PERSONS', viewValue: 'INCRIMINATING INNOCENT PERSONS'},
    {value: 'INDUCING A MINOR TO ABANDON HIS/HER HOME', viewValue: 'INDUCING A MINOR TO ABANDON HIS/HER HOME'},
    {value: 'INTRIGUING AGAINST HONOR', viewValue: 'INTRIGUING AGAINST HONOR'},
    {value: 'ISSUING CHECKS WITHOUT SUFFICIENT FUNDS', viewValue: 'ISSUING CHECKS WITHOUT SUFFICIENT FUNDS'},
    {value: 'LESS SERIOUS PHYSICAL INJURIES', viewValue: 'LESS SERIOUS PHYSICAL INJURIES'},
    {value: 'LIGHT COERCION', viewValue: 'LIGHT COERCION'},
    {value: 'LIGHT THREATS', viewValue: 'LIGHT THREATS'},
    {value: 'OCCUPATION OF REAL PROPERTY OR USURPATION OF REAL', viewValue: 'OCCUPATION OF REAL PROPERTY OR USURPATION OF REAL'},
    {value: 'OTHER DECEITS', viewValue: 'OTHER DECEITS'},
    {value: 'OTHER FORMS OF SWINDLING', viewValue: 'OTHER FORMS OF SWINDLING'},
    {value: 'OTHER FORMS OF TRESPASS', viewValue: 'OTHER FORMS OF TRESPASS'},
    {value: 'OTHER LIGHT THREATS', viewValue: 'OTHER LIGHT THREATS'},
    {value: 'OTHER MISCHIEFS (DAMAGED PROPERTY DOES NOT EXCEED P1,000.00)', viewValue: 'OTHER MISCHIEFS (DAMAGED PROPERTY DOES NOT EXCEED P1,000.00)'},
    {value: 'OTHER SIMILAR COERCIONS (COMPULSORY PURCHASE OF MERCHANDISE AND PAYMENT OF WAGES USING TOKENS)', viewValue: 'OTHER SIMILAR COERCIONS (COMPULSORY PURCHASE OF MERCHANDISE AND PAYMENT OF WAGES USING TOKENS)'},
    {value: 'PHYSICAL INJURIES INFLICTED IN A TUMULTUOUS AFFRAY', viewValue: 'PHYSICAL INJURIES INFLICTED IN A TUMULTUOUS AFFRAY'},
    {value: 'PROHIBITING PUBLICATION OF ACTS REFERRED TO IN THE COURSE OF OFFICIAL PROCEEDINGS', viewValue: 'PROHIBITING PUBLICATION OF ACTS REFERRED TO IN THE COURSE OF OFFICIAL PROCEEDINGS'},
    {value: 'QUALIFIED THEFT (IF THE AMOUNT DOES NOT EXCEED P500)', viewValue: 'QUALIFIED THEFT (IF THE AMOUNT DOES NOT EXCEED P500)'},
    {value: 'QUALIFIED TRESPASS TO DWELLING (WITHOUT USE OF VIOLENCE)', viewValue: 'QUALIFIED TRESPASS TO DWELLING (WITHOUT USE OF VIOLENCE)'},
    {value: 'REMOVAL, SALE OR PLEDGE OF MORTGAGED PROPERTY', viewValue: 'REMOVAL, SALE OR PLEDGE OF MORTGAGED PROPERTY'},
    {value: 'RESPONSIBILITY OF PARTICIPANTS IN A DUEL IF ONLY PHYSICAL INJURIES ARE INFLICTED OR NO PHYSICAL INJURIES HAVE BEEN INFLICTED', viewValue: 'RESPONSIBILITY OF PARTICIPANTS IN A DUEL IF ONLY PHYSICAL INJURIES ARE INFLICTED OR NO PHYSICAL INJURIES HAVE BEEN INFLICTED'},
    {value: 'REVEALING SECRETS WITH ABUSE OF AUTHORITY', viewValue: 'REVEALING SECRETS WITH ABUSE OF AUTHORITY'},
    {value: 'RIGHTS IN PROPERTY', viewValue: 'RIGHTS IN PROPERTY'},
    {value: 'SIMPLE SEDUCTION', viewValue: 'SIMPLE SEDUCTION'},
    {value: 'SLIGHT PHYSICAL INJURIES AND MALTREATMENT', viewValue: 'SLIGHT PHYSICAL INJURIES AND MALTREATMENT'},
    {value: 'SPECIAL CASES OF MALICIOUS MISCHIEF (DAMAGED PROPERTY DOES NOT EXCEED P1,000.00)', viewValue: 'SPECIAL CASES OF MALICIOUS MISCHIEF (DAMAGED PROPERTY DOES NOT EXCEED P1,000.00)'},
    {value: 'SWINDLING A MINOR', viewValue: 'SWINDLING A MINOR'},
    {value: 'SWINDLING OR ESTAFA (AMOUNT DOES NOT EXCEED P200.00)', viewValue: 'SWINDLING OR ESTAFA (AMOUNT DOES NOT EXCEED P200.00)'},
    {value: 'THEFT (PROPERTY STOLEN DOES NOT EXCEED P50.00).', viewValue: 'THEFT (PROPERTY STOLEN DOES NOT EXCEED P50.00).'},
    {value: 'THREATENING TO PUBLISH AND OFFER TO PREVENT SUCH PUBLICATION FOR COMPENSATION', viewValue: 'THREATENING TO PUBLISH AND OFFER TO PREVENT SUCH PUBLICATION FOR COMPENSATION'},
    {value: 'UNLAWFUL ARREST', viewValue: 'UNLAWFUL ARREST'},
    {value: 'UNLAWFUL USE OF MEANS OF PUBLICATION AND UNLAWFUL', viewValue: 'UNLAWFUL USE OF MEANS OF PUBLICATION AND UNLAWFUL'},
    {value: 'USING FALSE CERTIFICATES ', viewValue: 'USING FALSE CERTIFICATES '},
    {value: 'USING FICTITIOUS NAMES AND CONCEALING TRUE NAMES', viewValue: 'USING FICTITIOUS NAMES AND CONCEALING TRUE NAMES'},
    {value: 'UTTERANCES', viewValue: 'UTTERANCES'}
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<CaseDialogComponent>,
    private serviceData: ServiceData) {}
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
    status: 'Pending',
    remark: 'on Settle',
    location: '',
    locationLatLng: '',
    details: ''
  }
  selectedFood = this.cases[0].value

  ngOnInit() {
    this.title = this.data.dataType
    if(this.data.dataType == 'Update Case'){
      this.caseData = this.data.id
    }else{
      this.caseData.id = this.data.id
    }
  }

  submit(){
    if(this.title == 'Add Case'){
      this.serviceData.addCase(this.caseData).subscribe(
        (response)=>{
          this.showAlert('success', response.title, response.message)
          this.dialogRef.close()
        },
        (error)=>{
          this.showAlert('error', 'You most need to complete the text field', '')
        }
      )
    }else{
      this.serviceData.updateCase(this.caseData).subscribe(
        (response)=>{
          this.showAlert('success', response.title, response.message)
          this.dialogRef.close()
        },
        (error)=>{
          this.showAlert('error', 'You most need to complete the text field', '')
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
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:`, type, result)
      if(type == 'complaint'){
        console.log('if')
        this.caseData.complaintAddress = result.location
        this.caseData.complaintLatLng = result.latlng
        this._details.nativeElement.focus()
      }else if(type == 'complainant'){
        this.caseData.complainantAddress = result.location
        this.caseData.complainantLatLng = result.latlng
        this._fname.nativeElement.focus()
      }else{
        this.caseData.location = result.location
        this.caseData.locationLatLng = result.latlng
        console.log(result.latlng, this.caseData.locationLatLng)
        this._fname.nativeElement.focus()
      }
    });
  }
}
