import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];


  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }
  b = "width: 100px!important"
}
