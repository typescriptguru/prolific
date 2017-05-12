import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { Subscription } from 'rxjs';

import { AuthService } from './common/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild('loginPopup') public loginPopup: ModalDirective;

  public loginForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });

    this.subscriptions.push(
      this.authService.openLoginPopupSubject.subscribe(() => {
        this.openLoginPopup();
      })
    );

    this.subscriptions.push(
      this.authService.closeLoginPopupSubject.subscribe(() => {
        this.closeLoginPopup();
      })
    );
  }

  private openLoginPopup() {
    this.loginPopup.show();
  }

  closeLoginPopup() {
    this.loginPopup.hide();
    this.authService.login(this.loginForm.value);
    this.loginForm.reset();
  }
}
