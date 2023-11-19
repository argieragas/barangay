
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/client/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = ''
  password = ''

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
  }

  public submit() {
    this.authenticationService.login(
      this.username,
      this.password
    )
  }
  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];


  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }
  b = "width: 100px!important"
}
